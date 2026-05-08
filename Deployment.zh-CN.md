# WorldModel Tracker 部署指南

英文版: [Deployment.en.md](Deployment.en.md)

## 项目说明

当前网站项目位于：

`D:\Projects\PeCo\WMT\wmt-website\app`

这是一个基于 Vite + React + TypeScript 的纯前端静态站点。

- 本地开发使用 Vite 开发服务器
- 生产部署产物为 `dist/`
- 页面路由使用 `HashRouter`
- 数据来自 `src/data/worldmodel/*.json`
- 不依赖后端服务

因此，无论你在 Windows 上开发，还是最终部署到 Ubuntu，上线方式都以“构建静态文件并托管 `dist/`”为主。

## 开发团队

### PeCoLab

![PeCoLab Logo](wmt-website/app/public/peco-logo.png)

本项目由 PeCoLab（感知与认知实验室）开发与维护。

## 部署结果截图

![部署结果截图](docs/screenshots/deployment-success.png)

如果图片暂未显示，请将部署结果截图放到 `docs/screenshots/deployment-success.png`。

---

## 1. Windows 开发 + Ubuntu 部署完整流程

### 1.1 Windows 本地开发

建议环境：

- Node.js 22 LTS
- npm 10+

先确认 Node.js 已安装：

```powershell
node -v
npm -v
```

如果命令不存在，先安装 Node.js，再重新打开 VS Code 终端。

进入项目目录：

```powershell
cd D:\Projects\PeCo\WMT\wmt-website\app
```

安装依赖：

```powershell
npm install
```

启动开发服务器：

```powershell
npm run dev
```

本项目开发端口配置为 `3000`，启动后访问：

`http://localhost:3000`

如果你要先验证生产构建是否正常：

```powershell
npm run build
npm run preview
```

如果遇到安装了 `node` `npm` 安装完成之后，出现无法识别 `node` `npm` 的情况，请执行一次临时的路径修复命令：

```
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

---

### 1.2 Ubuntu 服务器部署

Ubuntu 上不建议直接运行 `npm run dev` 作为正式站点。推荐流程是：

1. 在本地或服务器上执行构建
2. 获得 `dist/` 静态文件
3. 用 Nginx 或其他静态服务器托管 `dist/`

如果你直接在 Ubuntu 服务器上构建：

```bash
cd /path/to/wmt-website/app
npm ci
npm run build
```

构建完成后会生成：

```bash
dist/
```

其中包含：

- `index.html`
- `assets/`

---

### 1.3 Ubuntu + Nginx 部署示例

假设你将构建产物部署到：

`/var/www/wmt-website`

先复制构建产物：

```bash
sudo mkdir -p /var/www/wmt-website
sudo cp -r dist/* /var/www/wmt-website/
```

创建 Nginx 配置：

```nginx
server {
		listen 80;
		server_name your-domain-or-ip;

		root /var/www/wmt-website;
		index index.html;

		location / {
				try_files $uri $uri/ /index.html;
		}
}
```

启用配置并重载 Nginx：

```bash
sudo ln -s /etc/nginx/sites-available/wmt-website /etc/nginx/sites-enabled/wmt-website
sudo nginx -t
sudo systemctl reload nginx
```

如果你已经使用了其他默认站点配置，需要根据实际情况调整站点文件名和软链接。

---

### 1.4 更稳妥的发布方式

推荐把部署过程拆成两步：

1. Windows 本地执行构建并验证
2. 将 `dist/` 上传到 Ubuntu 服务器

这样可以把“构建失败”和“服务器配置失败”两类问题分开处理。

如果你想把 `dist/` 上传到 Ubuntu，可以用 `scp`：

```bash
scp -r dist/* user@your-server:/var/www/wmt-website/
```

---

## 2. Windows 开发、Ubuntu 部署是否有区别

对这个项目来说，差异主要体现在环境和运维层面，而不是业务代码层面。

### 2.1 基本结论

- 开发命令在 Windows 上执行没有问题
- 生产部署更适合放在 Ubuntu 上
- 代码本身不依赖 Windows 专属能力
- 只要 Node.js 版本一致，构建结果通常不会有本质差异

### 2.2 需要重点注意的差异

#### Node.js 版本

Windows 和 Ubuntu 最好统一 Node.js 大版本，建议统一使用 Node.js 22 LTS。

#### 文件路径大小写

Ubuntu 文件系统通常区分大小写，Windows 通常不区分。

例如：

- Windows 下 `./components/Navbar` 和 `./components/navbar` 可能都能工作
- Ubuntu 下如果文件真实名称是 `Navbar.tsx`，写成 `navbar` 就可能直接构建失败

#### 换行符

Windows 常见 `CRLF`，Ubuntu 常见 `LF`。当前项目影响不大，但如果后续增加 shell 脚本，需要特别注意。

#### 权限

Ubuntu 部署时需要处理目录权限、Nginx 权限、站点目录属主等问题，Windows 本地开发通常不涉及这些。

---

## 3. 当前项目的部署特性

### 3.1 路由方式

项目使用 `HashRouter`，因此静态部署兼容性较好：

- 不强依赖服务端路由重写
- 直接部署到静态目录通常也能正常访问

### 3.2 构建命令

项目脚本如下：

```json
{
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"lint": "eslint .",
		"preview": "vite preview"
	}
}
```

常用命令：

- `npm run dev`：本地开发
- `npm run build`：生成生产构建
- `npm run preview`：本地预览生产构建
- `npm run lint`：检查代码规范

---

## 4. 推荐部署顺序

推荐按下面顺序操作：

1. 在 Windows 安装 Node.js 22 LTS
2. 在本地执行 `npm install`
3. 在本地执行 `npm run build`
4. 确认本地构建无报错
5. 将 `dist/` 上传到 Ubuntu
6. 用 Nginx 托管 `dist/`

---

## 5. 当前已确认的信息

- 项目是纯前端静态站点
- 没有后端服务依赖
- 数据文件在 `src/data/worldmodel/`
- Vite 开发端口是 `3000`
- 正式部署应以 `dist/` 为准

---

## 6. 按你的目标部署到 http://www.mls-home.com:3000/wmt（不影响 :1311）

下面是最小影响方案：只在监听 `3000` 的 server 块新增 `/wmt` 路由，不修改 `1311` 的任何 server 块。

### 6.1 构建并准备静态文件

```bash
cd /data/PeCoLab/WMT/wmt-website/app
npm ci
npm run build
```

```bash
sudo mkdir -p /var/www/wmt
sudo rsync -av --delete dist/ /var/www/wmt/
```

### 6.2 备份当前 Nginx 配置（强烈建议）

```bash
sudo cp -a /etc/nginx /etc/nginx.backup.$(date +%F-%H%M%S)
```

### 6.3 在 `:3000` 的 server 块加入 `/wmt` 路由

把仓库中的模板加入到监听 `3000` 的站点配置中：

- 模板文件：`docs/nginx-wmt-subpath-3000.conf`

关键点：

- `location = /wmt` 重定向到 `/wmt/`
- `location /wmt/` 使用 `alias /var/www/wmt/`
- `try_files` 回退到 `/wmt/index.html`

### 6.4 校验并重载 Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 6.5 验证

```bash
curl -I http://www.mls-home.com:3000/wmt/
curl -I http://www.mls-home.com:1311/
```

预期结果：

- `:3000/wmt/` 返回 200
- `:1311` 服务行为与之前一致

### 6.6 回滚（若配置异常）

```bash
sudo cp -a /etc/nginx.backup.<timestamp>/* /etc/nginx/
sudo nginx -t
sudo systemctl reload nginx
```