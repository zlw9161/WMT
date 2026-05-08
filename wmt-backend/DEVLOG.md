# Phase 1 Backend Infra

Phase1 已经开始执行并落地了，可直接进入前后端联调。你要的 environment.yml 也已完善为团队可复用版本。

本次完成内容

1. 环境文件完善
- 已更新为共享可复现版本（去掉本机 prefix，补齐 Python 后端依赖，并包含 Node 20）
- 文件：environment.yml

2. 后端 Phase1 骨架完成（Week1 目标）
- FastAPI 入口、CORS、健康检查
- SQLAlchemy 数据库会话与 User 模型
- JWT 注册/登录/刷新
- 用户接口（me、update me、list、get by id、delete）
- Alembic 配置与首个 users 表迁移
- 初始管理员脚本
- 关键文件：
  - main.py
  - config.py
  - database.py
  - user.py
  - auth.py
  - users.py
  - dependencies.py
  - env.py
  - 20260506_0001_create_users.py
  - seed.py
  - README.md

3. 前端 Phase1 联调起点完成（Week2 起步）
- 新增 API 请求封装（fetch 版）
- 新增 useAuth（含 token 持久化、登录、注册、拉取当前用户、退出）
- 新增登录/注册/个人页
- 新增受保护路由 Profile
- Navbar 接入登录态入口
- 关键文件：
  - api.ts
  - useAuth.tsx
  - ProtectedRoute.tsx
  - Login.tsx
  - Register.tsx
  - Profile.tsx
  - App.tsx
  - Navbar.tsx

校验状态

- 我已对关键改动文件做问题检查，当前未发现编辑器报错。
- 还没有实际启动服务做端到端运行验证（仅静态检查通过）。

你现在可以直接执行

1. 初始化环境（仓库根目录）
   conda env update -f environment.yml
   conda activate wmt

2. 启动后端（新终端）
   cd /data/PeCoLab/WMT/wmt-backend
   python -m alembic -c alembic.ini upgrade head
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8888

3. 启动前端（新终端）
   cd wmt-website/app
   npm install
   npm run dev

4. 联调路径
- 打开前端登录页：/#/login
- 注册后会自动跳转到 /#/profile 并调用 /api/users/me

如果你愿意，我下一步可以继续把 Phase1 剩余项一次补齐：
1. 加入前端 axios 拦截器版本与统一错误处理
2. 增加后端 pytest 认证流测试（register -> login -> me）
3. 给 Navbar 加完整头像下拉与未登录跳转策略（更贴近 upgrade-plan）

你后续建议固定这样用（全程 conda）

激活环境
conda activate wmt

执行迁移（在后端目录）
cd /data/PeCoLab/WMT/wmt-backend
python -m alembic -c alembic.ini upgrade head

启动后端
