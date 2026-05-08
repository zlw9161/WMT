# WMT 子域名挂载到 1311 运行手册

目标：将本地 WMT 服务 http://192.168.1.8:3000 通过反向代理发布为 https://wmt.mls-home.com:1311

适用日期：2026-04-22

## 0. 前置结论

- 方案可行。
- 推荐使用独立子域名，不改主站路径。
- 先在网关层按 Host 分流，再由本机 Nginx 反向代理到 192.168.1.8:3000。

## 1. 上线前检查

1. DNS
- 新增 A 记录：wmt.mls-home.com -> 与 mls-home.com:1311 相同入口 IP。
- 建议 TTL 设为 60 秒（便于回滚）。

2. 证书
- 证书必须包含 wmt.mls-home.com（SAN）。
- 若 1311 由上游网关终止 TLS，则在网关更新证书。
- 若 1311 由本机 Nginx 终止 TLS，则在 Nginx 安装对应证书。

3. 连通性
- 从反向代理机器执行：curl -I http://192.168.1.8:3000
- 返回 200 或 30x 即可。

## 2. 两种落地路径

## A. 推荐：1311 在上游网关，Nginx 接收内网 HTTP

### A1. 网关新增路由

- 匹配条件：
  - Port = 1311
  - Host = wmt.mls-home.com
- 转发目标：本机 Nginx 的 8080

### A2. 本机 Nginx 新增站点

将以下内容保存为 /etc/nginx/sites-available/wmt-subdomain.conf：

```nginx
server {
    listen 8080;
    server_name wmt.mls-home.com;

    location / {
        proxy_pass http://192.168.1.8:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
    }
}
```

启用并重载：

```bash
sudo ln -s /etc/nginx/sites-available/wmt-subdomain.conf /etc/nginx/sites-enabled/wmt-subdomain
sudo nginx -t
sudo systemctl reload nginx
```

## B. 备选：本机 Nginx 直接监听 1311 TLS

将以下内容保存为 /etc/nginx/sites-available/wmt-subdomain-1311.conf：

```nginx
server {
    listen 1311 ssl http2;
    server_name wmt.mls-home.com;

    ssl_certificate /etc/letsencrypt/live/wmt.mls-home.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wmt.mls-home.com/privkey.pem;

    location / {
        proxy_pass http://192.168.1.8:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_read_timeout 120s;
        proxy_connect_timeout 10s;
    }
}
```

启用并重载：

```bash
sudo ln -s /etc/nginx/sites-available/wmt-subdomain-1311.conf /etc/nginx/sites-enabled/wmt-subdomain-1311
sudo nginx -t
sudo systemctl reload nginx
```

## 3. 验证步骤

1. 本机 Host 路由验证（网关路径 A）：

```bash
curl -I -H "Host: wmt.mls-home.com" http://127.0.0.1:8080
```

2. 公网验证：

```bash
curl -k -I https://wmt.mls-home.com:1311
```

3. 功能验证：
- 浏览器打开 https://wmt.mls-home.com:1311
- 主页面、静态资源、前端路由刷新均正常。

## 4. 回滚（30 秒）

A 路径：

```bash
sudo rm -f /etc/nginx/sites-enabled/wmt-subdomain
sudo nginx -t
sudo systemctl reload nginx
```

B 路径：

```bash
sudo rm -f /etc/nginx/sites-enabled/wmt-subdomain-1311
sudo nginx -t
sudo systemctl reload nginx
```

再执行：
- 撤销网关 Host 路由
- 可选撤销 DNS 记录（保留低 TTL）

## 5. 常见故障

1. 证书报错
- 证书不含 wmt.mls-home.com，补发含 SAN 证书。

2. 访问超时
- 192.168.1.8:3000 不可达，检查防火墙与服务进程。

3. 配置改了不生效
- 1311 可能在网关终止，先确认流量是否到达本机 Nginx。
