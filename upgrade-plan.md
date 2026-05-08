# WMT 社区化升级计划

> **项目代号**: WMT Community (WorldModel Tracker Community)  
> **目标**: 将现有的 WorldModel Tracker 静态追踪站升级为社区驱动的世界模型讨论站  
> **版本目标**: v2.0.0  
> **预估周期**: 6-8 周（MVP 版 3-4 周）

---

## 一、现状分析

### 1.1 现有技术栈

| 层级 | 技术 | 版本 | 状态 |
|------|------|------|------|
| 前端 | React + TypeScript | v19 | ✅ 保留升级 |
| 构建 | Vite | v7 | ✅ 保留 |
| 样式 | Tailwind CSS + shadcn/ui | v3 | ✅ 保留 |
| 路由 | react-router-dom | v7 | ✅ 保留 |
| 3D 可视化 | Three.js + R3F | v184 | ✅ 保留 |
| 动画 | Framer Motion | v12 | ✅ 保留 |
| 数据 | 静态 JSON | - | ❌ 需后端化 |
| 后端 | 无 | - | 🆕 新增 |
| 数据库 | 无 | - | 🆕 新增 |

### 1.2 现有页面与功能

- **Home**: 霓虹 Hero、世界模型介绍、精选模型、最新动态、PeCoLab 展示
- **Tracking**: 模型/公司/论文追踪卡片
- **Timeline**: 发展时间线
- **Globe**: 3D 地球可视化
- **About**: 关于页面
- **Detail**: 详情页

### 1.3 核心优势（需保留）

1. **视觉风格**: 深色霓虹科技风（品红 #ff0080 / 青色 #00ffff / 金色 #ffd700）
2. **双语支持**: 中英双语切换（LanguageContext）
3. **3D 能力**: React Three Fiber 已集成
4. **组件库**: shadcn/ui 60+ 组件开箱即用
5. **动画体系**: Framer Motion + 粒子背景 + 滚动揭示

---

## 二、升级目标与功能架构

### 2.1 总体架构

```
┌─────────────────────────────────────────────────────────────┐
│                     WMT Community v2.0                        │
├────────────────────┬────────────────────────────────────────┤
│     前端 (React)    │           后端 (FastAPI)                │
│  ┌──────────────┐  │  ┌──────────────┐  ┌─────────────────┐ │
│  │   社区门户    │  │  │   REST API   │  │   SQLite/       │ │
│  │  - 博客系统   │  │  │  - 认证模块   │  │   PostgreSQL    │ │
│  │  - 讨论论坛   │◄─┼──┤  - 内容管理   │◄─┤   (数据库)       │ │
│  │  - Demo 展厅  │  │  │  - 通知服务   │  │                 │ │
│  │  - 追踪数据   │  │  │  - 搜索索引   │  │                 │ │
│  └──────────────┘  │  └──────────────┘  └─────────────────┘ │
│  ┌──────────────┐  │  ┌──────────────┐                      │
│  │   管理后台    │  │  │  Admin API   │                      │
│  │  (受保护路由) │  │  │  (权限控制)   │                      │
│  └──────────────┘  │  └──────────────┘                      │
└────────────────────┴────────────────────────────────────────┘
```

### 2.2 新增功能矩阵

| 功能模块 | 子功能 | 优先级 | 难度 | 备注 |
|---------|--------|--------|------|------|
| **用户系统** | 注册/登录/登出 | P0 | 中 | JWT + bcrypt |
| | 用户资料页 | P0 | 低 | 头像、简介、社交链接 |
| | 权限角色 | P1 | 中 | admin / moderator / user |
| **博客系统** | Markdown 编辑器 | P0 | 中 | react-markdown + 代码高亮 |
| | 文章发布/编辑 | P0 | 中 | 草稿/发布状态 |
| | 文章列表/详情 | P0 | 低 | 标签、分类、阅读量 |
| | 评论与回复 | P0 | 中 | 嵌套评论 |
| | 点赞/收藏 | P1 | 低 | |
| **讨论论坛** | 板块管理 | P0 | 中 | 按主题分版 |
| | 发帖/回帖 | P0 | 中 | 富文本/Markdown |
| | 话题标签 | P1 | 低 | |
| | @提及用户 | P2 | 中 | |
| **Demo 展厅** | Demo 配置管理 | P0 | 中 | iframe 嵌入方案 |
| | HuggingFace 集成 | P1 | 低 | Spaces 嵌入 |
| | Gradio/Streamlit | P1 | 低 | 外部链接 + 预览 |
| | 用户提交 Demo | P2 | 中 | 审核机制 |
| **通知系统** | 回复通知 | P1 | 中 | WebSocket 或轮询 |
| | 系统公告 | P2 | 低 | |
| **搜索** | 全文搜索 | P1 | 中 | SQLite FTS / 后端索引 |
| **管理后台** | 内容审核 | P1 | 中 | 文章/评论审核 |
| | 用户管理 | P2 | 低 | 封禁/解封 |
| | Demo 审核 | P2 | 中 | |

---

## 三、技术方案详解

### 3.1 后端方案: FastAPI + SQLAlchemy + SQLite

**选型理由**:
- 团队已有 Python 数据脚本（`generate_worldmodel_data.py`）
- FastAPI 自动生成 OpenAPI 文档，前后端对接高效
- SQLAlchemy ORM 成熟稳定，后期可无缝迁移 PostgreSQL
- SQLite 零配置，单文件，适合社区初期规模

**项目结构**:

```
wmt-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI 入口
│   ├── config.py               # 配置管理
│   ├── database.py             # SQLAlchemy 引擎/Session
│   ├── models/                 # 数据表模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── post.py
│   │   ├── comment.py
│   │   ├── topic.py
│   │   ├── demo.py
│   │   └── notification.py
│   ├── schemas/                # Pydantic 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── post.py
│   │   └── ...
│   ├── routers/                # API 路由
│   │   ├── __init__.py
│   │   ├── auth.py             # 认证相关
│   │   ├── users.py
│   │   ├── posts.py            # 博客文章
│   │   ├── topics.py           # 论坛话题
│   │   ├── comments.py
│   │   ├── demos.py            # Demo 展厅
│   │   ├── notifications.py
│   │   └── search.py
│   ├── services/               # 业务逻辑层
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── post_service.py
│   │   └── ...
│   ├── dependencies.py         # 依赖注入（JWT 验证等）
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── security.py         # 密码哈希、JWT
│   │   └── markdown.py         # Markdown 处理
│   └── seed.py                 # 初始数据
├── alembic/                    # 数据库迁移
├── tests/
├── requirements.txt
├── Dockerfile
└── README.md
```

**核心依赖**:

```txt
fastapi>=0.115.0
uvicorn[standard]>=0.34.0
sqlalchemy>=2.0.0
alembic>=1.15.0
pydantic>=2.10.0
pydantic-settings>=2.7.0
python-jose[cryptography]>=3.4.0
passlib[bcrypt]>=1.7.4
python-multipart>=0.0.20
aiosqlite>=0.21.0
markdown>=3.7
pygments>=2.19.0
httpx>=0.28.0
pytest>=8.3.0
```

### 3.2 数据库设计 (ER 概要)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    users    │     │    posts    │     │   comments  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │◄────┤ author_id   │◄────┤ author_id   │
│ username    │     │ title       │     │ post_id     │
│ email       │     │ slug        │     │ parent_id   │──┐
│ password_hash│    │ content     │     │ content     │  │
│ avatar_url  │     │ summary     │     │ created_at  │  │
│ role        │     │ status      │     └─────────────┘  │
│ bio         │     │ tags        │                      │
│ created_at  │     │ views       │     ┌─────────────┐  │
└─────────────┘     │ likes       │     │  comment    │◄─┘
                    │ created_at  │     │ _reactions  │
                    └─────────────┘     ├─────────────┤
                           ▲            │ comment_id  │
                           │            │ user_id     │
                    ┌──────┴──────┐     │ type        │
                    │ post_reactions│   └─────────────┘
                    ├─────────────┤
                    │ post_id     │
                    │ user_id     │
                    │ type        │
                    └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   topics    │     │ topic_posts │     │   demos     │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)     │◄────┤ topic_id    │     │ id (PK)     │
│ name        │     │ post_id     │────►│ name        │
│ slug        │     └─────────────┘     │ description │
│ description │                         │ embed_url   │
│ color       │     ┌─────────────┐     │ source_type │
│ icon        │     │notifications│     │ author_id   │
│ sort_order  │     ├─────────────┤     │ status      │
└─────────────┘     │ user_id     │     │ tags        │
                    │ type        │     │ views       │
                    │ content     │     │ created_at  │
                    │ is_read     │     └─────────────┘
                    │ source_id   │
                    │ created_at  │
                    └─────────────┘
```

### 3.3 前端调整方案

**保持现有架构**，增量开发：

```
wmt-website/app/src/
├── App.tsx                      # 更新路由（新增社区相关页面）
├── components/
│   ├── Navbar.tsx               # 新增社区入口、用户头像下拉
│   ├── ...（现有组件保留）
│   ├── editor/                  # 🆕 Markdown 编辑器封装
│   │   ├── MarkdownEditor.tsx
│   │   └── MarkdownPreview.tsx
│   ├── comment/                 # 🆕 评论组件
│   │   ├── CommentList.tsx
│   │   ├── CommentItem.tsx
│   │   └── CommentForm.tsx
│   └── demo/                    # 🆕 Demo 嵌入组件
│       ├── DemoCard.tsx
│       ├── DemoEmbed.tsx        # iframe 安全封装
│       └── DemoSubmitForm.tsx
├── pages/                       # 现有页面保留
│   ├── Home.tsx                 # 改造：首页增加社区动态流
│   ├── Tracking.tsx
│   ├── Timeline.tsx
│   ├── About.tsx
│   ├── Detail.tsx
│   ├── Globe.tsx
│   ├── Blog/                    # 🆕 博客系统
│   │   ├── BlogList.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── BlogEditor.tsx
│   │   └── BlogUserProfile.tsx
│   ├── Forum/                   # 🆕 讨论论坛
│   │   ├── ForumHome.tsx        # 板块列表
│   │   ├── TopicList.tsx        # 话题列表（按板块）
│   │   ├── TopicDetail.tsx      # 话题详情（帖子+回帖）
│   │   └── NewTopic.tsx
│   ├── DemoGallery/             # 🆕 Demo 展厅
│   │   ├── DemoGallery.tsx
│   │   └── DemoDetail.tsx
│   ├── Auth/                    # 🆕 认证页面
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Profile.tsx
│   └── Admin/                   # 🆕 管理后台（受保护路由）
│       ├── AdminDashboard.tsx
│       ├── AdminPosts.tsx
│       ├── AdminDemos.tsx
│       └── AdminUsers.tsx
├── hooks/                       # 🆕 新增自定义 hooks
│   ├── useAuth.ts               # 认证状态管理
│   ├── useApi.ts                # API 请求封装
│   └── useNotification.ts       # 通知轮询
├── services/                    # 🆕 API 服务层
│   ├── api.ts                   # axios 实例配置
│   ├── auth.service.ts
│   ├── post.service.ts
│   ├── topic.service.ts
│   ├── comment.service.ts
│   ├── demo.service.ts
│   └── search.service.ts
├── stores/                      # 🆕 状态管理（可选 Zustand）
│   └── authStore.ts
└── types/                       # 🆕 TypeScript 类型
    ├── user.ts
    ├── post.ts
    ├── topic.ts
    └── demo.ts
```

**新增依赖**:

```bash
# Markdown 编辑与渲染
npm install react-markdown remark-gfm rehype-highlight rehype-sanitize

# 代码高亮主题
npm install highlight.js

# API 请求
npm install axios

# 状态管理（轻量，比 Redux 更适合本项目）
npm install zustand

# 时间格式化
npm install date-fns  # 已安装，确认版本

# 表单验证
npm install zod react-hook-form @hookform/resolvers  # 大部分已安装
```

### 3.4 Demo 嵌入技术方案

**核心问题**: 如何在安全、可控的前提下嵌入第三方世界模型 Demo

**方案**:

| 来源类型 | 嵌入方式 | 示例 |
|---------|---------|------|
| Hugging Face Spaces | `iframe` 直接嵌入 | `https://<user>-<space>.hf.space` |
| Gradio 共享链接 | `iframe` 嵌入 | `https://<hash>.gradio.live` |
| Streamlit Cloud | `iframe` 嵌入（需配置） | `https://<app>.streamlit.app/?embedded=true` |
| 自托管 Demo | `iframe` + CORS 配置 | 实验室内部 GPU 服务器 |
| 视频/GIF 预览 | 静态资源 | 作为 fallback |

**安全封装组件** (`DemoEmbed.tsx`):

```tsx
// 核心设计点：
// 1. sandbox 属性限制 iframe 权限
// 2. allow="camera; microphone" 按需申请
// 3. 加载状态 & 错误处理
// 4. 自适应宽高比
```

---

## 四、实施路线图

### Phase 1: 基础设施搭建（第 1-2 周）

**目标**: 跑通前后端联调，用户系统可用

#### Week 1: 后端骨架 + 数据库

- [ √ ] 搭建 FastAPI 项目骨架 (`wmt-backend/`)
- [ √ ] 配置 SQLAlchemy + Alembic 迁移
- [ - ] 设计并实现数据模型（users, posts, comments）
- [ √ ] 实现 JWT 认证中间件（注册/登录/Token 刷新）
- [ √ ] 编写用户 API（CRUD）
- [ √ ] 配置 CORS，允许前端开发环境访问
- [  ] 编写 API 文档（FastAPI 自动生成 `/docs`）

#### Week 2: 前端认证 + 联调

- [ √ ] 前端新增 `services/api.ts`（axios 拦截器，自动附加 Token）
- [ √ ] 实现 `Login.tsx` / `Register.tsx` 页面
- [ - ] 实现 `useAuth` hook + `authStore`（Zustand）
- [ - ] 改造 `Navbar.tsx`：登录态显示头像下拉菜单
- [ √ ] 保护路由实现：未登录用户重定向到登录页
- [ - ] 联调测试：注册 → 登录 → 获取当前用户 → 退出

```
按 Phase 1 的清单做了逐项核对，当前状态如下。

**已完成**
1. FastAPI 后端骨架已搭建  
[ main.py ](wmt-backend/app/main.py)  
[ config.py ](wmt-backend/app/config.py)  
[ database.py ](wmt-backend/app/database.py)

2. SQLAlchemy + Alembic 已接入并可迁移  
[ alembic.ini ](wmt-backend/alembic.ini)  
[ env.py ](wmt-backend/alembic/env.py)  
[ 20260506_0001_create_users.py ](wmt-backend/alembic/versions/20260506_0001_create_users.py)

3. JWT 认证核心接口已完成（注册/登录/刷新）  
[ auth.py ](wmt-backend/app/routers/auth.py)  
[ auth_service.py ](wmt-backend/app/services/auth_service.py)  
[ security.py ](wmt-backend/app/utils/security.py)

4. 用户 API 已完成（me、更新自己、列表、按 id、删除）  
[ users.py ](wmt-backend/app/routers/users.py)  
[ dependencies.py ](wmt-backend/app/dependencies.py)

5. CORS 已配置，并且前端开发代理也已配置  
[ config.py ](wmt-backend/app/config.py)  
[ vite.config.ts ](wmt-website/app/vite.config.ts)

6. 前端认证页面与受保护路由已完成  
[ Login.tsx ](wmt-website/app/src/pages/Auth/Login.tsx)  
[ Register.tsx ](wmt-website/app/src/pages/Auth/Register.tsx)  
[ ProtectedRoute.tsx ](wmt-website/app/src/components/ProtectedRoute.tsx)  
[ App.tsx ](wmt-website/app/src/App.tsx)

7. useAuth 已实现（含 token 持久化、登录、注册、拉取当前用户、退出）  
[ useAuth.tsx ](wmt-website/app/src/hooks/useAuth.tsx)

8. 基础健康检查测试已存在  
[ test_health.py ](wmt-backend/tests/test_health.py)

**部分完成**
1. 数据模型项只完成了 users，未完成 posts/comments  
当前只有 [ user.py ](wmt-backend/app/models/user.py)

2. Navbar 登录态有显示用户名和退出，但不是头像下拉菜单形态  
[ Navbar.tsx ](wmt-website/app/src/components/Navbar.tsx)

3. 联调链路你们已能跑通注册/登录相关流程，但缺少自动化联调测试用例  
目前仅有健康检查测试 [ test_health.py ](wmt-backend/tests/test_health.py)

**未完成**
1. 前端 services/api.ts 的目标是 axios 拦截器，但当前实现是 fetch 版本  
[ api.ts ](wmt-website/app/src/services/api.ts)

2. authStore（Zustand）未落地  
仓库中无对应文件（例如 authStore.ts）

3. Week 1 清单中的 posts/comments 相关模型和迁移未落地  
 wmt-backend/app/models 

**结论**
1. Phase 1 大约完成度在 75% 到 85%  
2. 里程碑里最关键的用户系统主流程基本可用  
3. 还差的主要是两块：按计划的状态管理方案（axios + Zustand）和后端模型范围（posts/comments）

如果你要，我下一步可以直接给你一个最小补齐方案，按半天到一天把这三个缺口补完并打勾。
```

**里程碑 1**: ✅ 用户系统完整可用

---

### Phase 2: 博客系统（第 2-4 周）

**目标**: 完整的博客发布、浏览、评论体验

#### Week 2 后半: 后端博客 API

- [ ] 设计文章表（posts）：支持 Markdown、标签、状态（draft/published）
- [ ] 设计评论表（comments）：支持嵌套回复（parent_id）
- [ ] 实现文章 CRUD API（创建需登录，编辑仅限作者/管理员）
- [ ] 实现评论 API（列表、创建、删除）
- [ ] 实现文章 reactions API（点赞/取消点赞）
- [ ] 文章列表支持分页、按标签筛选

#### Week 3: 前端博客页面

- [ ] 集成 `react-markdown` + `remark-gfm` + `highlight.js`
- [ ] 开发 `MarkdownEditor.tsx`（分屏：编辑 + 实时预览）
- [ ] 开发 `BlogList.tsx`：卡片列表、标签云、分页
- [ ] 开发 `BlogDetail.tsx`：文章渲染、作者信息、阅读数
- [ ] 开发 `CommentList` / `CommentItem` / `CommentForm`
- [ ] 开发 `BlogEditor.tsx`：新建/编辑文章（仅登录用户）

#### Week 4: 博客完善 + 用户主页

- [ ] 文章草稿箱功能（保存草稿、发布）
- [ ] 用户个人主页 `Profile.tsx`：展示 TA 发布的文章
- [ ] 文章分享（复制链接、Twitter/X 分享）
- [ ] 响应式适配（移动端编辑器体验优化）

**里程碑 2**: ✅ 博客系统完整可用

---

### Phase 3: 讨论论坛（第 4-5 周）

**目标**: 分板块的论坛，支持发帖回帖

#### Week 4 后半: 后端论坛 API

- [ ] 设计板块表（topics）：name, slug, description, color, icon, sort_order
- [ ] 设计帖子表（topic_posts）：关联板块、作者、标题、内容、置顶、精华
- [ ] 设计回帖表（topic_replies）：嵌套回复
- [ ] 实现板块列表 API
- [ ] 实现帖子列表/详情/创建 API
- [ ] 实现回帖 API
- [ ] 帖子 reactions API

#### Week 5: 前端论坛页面

- [ ] 开发 `ForumHome.tsx`：板块网格（仿 V2EX / Discord 频道风格）
- [ ] 开发 `TopicList.tsx`：某板块下的帖子列表
- [ ] 开发 `TopicDetail.tsx`：帖子详情 + 回帖列表（仿 GitHub Discussions 风格）
- [ ] 开发 `NewTopic.tsx`：发帖表单
- [ ] 改造 `Home.tsx`：新增「社区动态」板块（最新博客 + 热门讨论）

**里程碑 3**: ✅ 论坛系统完整可用

---

### Phase 4: Demo 展厅（第 5-6 周）

**目标**: 可配置化地展示和嵌入开源世界模型 Demo

#### Week 5 后半: 后端 Demo 管理

- [ ] 设计 demo 表（demos）：name, description, embed_url, source_type, author, tags, thumbnail, status
- [ ] 实现 Demo CRUD API（提交需审核）
- [ ] 实现 Demo 列表/详情 API（仅返回 approved 状态的 Demo）
- [ ] 预置一批高质量 Demo 数据（Sora、Cosmos、Stable Video Diffusion 等公开 demo）

#### Week 6: 前端 Demo 展厅

- [ ] 开发 `DemoCard.tsx`：展示缩略图、名称、来源、标签
- [ ] 开发 `DemoEmbed.tsx`：安全 iframe 封装
  - sandbox="allow-scripts allow-same-origin allow-forms"
  - 加载动画、错误 fallback
  - 全屏按钮
- [ ] 开发 `DemoGallery.tsx`：网格/列表切换、按来源筛选
- [ ] 开发 `DemoDetail.tsx`：详情 + 嵌入区域 + 相关推荐
- [ ] 开发 `DemoSubmitForm.tsx`：用户提交 Demo（需审核）

**里程碑 4**: ✅ Demo 展厅可用

---

### Phase 5: 管理后台 + 搜索 + 通知（第 6-7 周）

#### Week 6 后半: 管理后台

- [ ] 后端：角色权限中间件（admin / moderator / user）
- [ ] 后端：Admin API（用户管理、内容审核、Demo 审核）
- [ ] 前端：Admin 路由保护（仅 admin 可访问）
- [ ] 前端：`AdminDashboard.tsx` 仪表盘（统计卡片）
- [ ] 前端：`AdminPosts.tsx` 文章审核列表
- [ ] 前端：`AdminDemos.tsx` Demo 审核
- [ ] 前端：`AdminUsers.tsx` 用户管理

#### Week 7: 搜索 + 通知

- [ ] 后端：SQLite FTS5 全文搜索（或简单 LIKE 查询过渡）
- [ ] 后端：搜索 API（聚合文章、帖子、Demo）
- [ ] 前端：顶部搜索栏（Cmd+K 快捷键）
- [ ] 后端：通知表 + 通知列表 API
- [ ] 前端：通知中心（轮询或 SSE）
- [ ] 前端：通知红点 badge

**里程碑 5**: ✅ 社区功能完整闭环

---

### Phase 6: 优化与上线（第 7-8 周）

- [ ] 性能优化：图片懒加载、路由懒加载、React.memo
- [ ] SEO 优化：react-helmet-async 动态 title/meta
- [ ] 前端构建优化：代码分割、Tree Shaking
- [ ] 后端：Gunicorn + Uvicorn 部署配置
- [ ] Docker 化：前端 Nginx + 后端 FastAPI
- [ ] 编写部署文档（Deployment.zh-CN.md 更新）
- [ ] 编写用户指南（如何发博客、如何提交 Demo）
- [ ] Beta 测试：邀请实验室成员内测
- [ ] Bug 修复、体验调优

**里程碑 6**: ✅ v2.0.0 正式上线

---

## 五、界面与交互设计规范

### 5.1 新增导航结构

```
Logo + WMT                          搜索框          [中/EN]  [通知]  [头像▼]
─────────────────────────────────────────────────────────────────────────────
Home | Tracking | Timeline | Globe | Blog | Forum | Demo Gallery | About

头像下拉菜单:
  ├─ 我的主页
  ├─ 写文章
  ├─ 我的草稿
  ├─ 设置
  ├─ ─────────
  └─ 退出登录

[Admin 额外显示]
  ├─ 管理后台
```

### 5.2 新增页面路由表

| 路由 | 页面 | 访问权限 |
|------|------|---------|
| `/` | Home（改造，增加社区动态流） | 公开 |
| `/blog` | 博客列表 | 公开 |
| `/blog/:slug` | 博客详情 | 公开 |
| `/blog/write` | 写文章/编辑 | 登录用户 |
| `/forum` | 论坛板块列表 | 公开 |
| `/forum/:topicSlug` | 板块帖子列表 | 公开 |
| `/forum/:topicSlug/:postId` | 帖子详情 | 公开 |
| `/forum/new` | 发布新帖 | 登录用户 |
| `/demos` | Demo 展厅 | 公开 |
| `/demos/:id` | Demo 详情 | 公开 |
| `/demos/submit` | 提交 Demo | 登录用户 |
| `/u/:username` | 用户主页 | 公开 |
| `/login` | 登录 | 未登录 |
| `/register` | 注册 | 未登录 |
| `/settings` | 个人设置 | 登录用户 |
| `/admin` | 管理后台 | admin |

### 5.3 视觉一致性要求

所有新增页面必须严格遵循现有设计系统：

- **背景**: `#0a0a1a`（主深色） / `#12122a`（卡片底色）
- **发光色 1**: `#ff0080`（品红，用于强调、活跃状态）
- **发光色 2**: `#00ffff`（青色，用于链接、按钮）
- **发光色 3**: `#ffd700`（金色，用于特殊标签）
- **文字**: `#ffffff`（主文字） / `#a0a0b8`（次要文字）
- **卡片**: `glass-card`（半透明 + 渐变边框）
- **字体**: `Orbitron`（英文标题） / `Noto Sans SC`（中文） / `Inter`（英文正文）
- **动画**: Framer Motion 入场动画 + 粒子背景保留

---

## 六、部署方案

### 6.1 开发环境

```bash
# 后端
 cd wmt-backend
 python -m venv .venv
 source .venv/bin/activate
 pip install -r requirements.txt
 uvicorn app.main:app --reload --port 8000

# 前端
 cd wmt-website/app
 npm install
 npm run dev          # Vite dev server, port 5173
```

### 6.2 生产环境（推荐 Docker Compose）

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./wmt-backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data  # SQLite 持久化
    environment:
      - DATABASE_URL=sqlite:///data/wmt.db
      - SECRET_KEY=${SECRET_KEY}
      - CORS_ORIGINS=https://wmt.pecolab.org

  frontend:
    build: ./wmt-website/app
    ports:
      - "80:80"
    depends_on:
      - backend
```

### 6.3 未来扩展

| 阶段 | 扩展项 | 触发条件 |
|------|--------|---------|
| v2.1 | PostgreSQL 替换 SQLite | 用户量 > 1k，并发写增加 |
| v2.1 | Redis 缓存 + Celery 异步任务 | 通知量、搜索性能瓶颈 |
| v2.2 | OAuth2（GitHub/Google 登录） | 降低注册门槛 |
| v2.2 | WebSocket 实时通知 | 在线用户交互需求 |
| v2.3 | 邮件通知（SendGrid/Resend） | 用户留存需求 |
| v2.3 | CDN 图片存储（Cloudflare R2） | 用户上传图片增多 |

---

## 七、风险与对策

| 风险 | 影响 | 对策 |
|------|------|------|
| iframe 嵌入第三方 Demo 被 X-Frame-Options 拒绝 | Demo 无法显示 | 优先收集允许嵌入的来源；不可嵌入的用跳转链接 + 截图 fallback |
| 用户生成内容（UGC）安全风险 | XSS、恶意脚本 | Markdown 经过 `rehype-sanitize` 过滤；后端二次校验 |
| SQLite 并发写入瓶颈 | 高并发时锁等待 | 初期用户量小无影响；后续迁移 PostgreSQL |
| 前端 bundle 体积膨胀 | 首屏加载变慢 | 路由懒加载、Markdown 编辑器动态 import、分包优化 |
| 第三方 Demo 链接失效 | 展厅出现大量死链 | 定期巡检脚本；用户举报机制；缓存快照 |

---

## 八、附录

### 8.1 推荐的开源世界模型 Demo（预置数据）

| 名称 | 来源 | 嵌入方式 | 类型 |
|------|------|---------|------|
| Stable Video Diffusion | Stability AI | HF Space | 视频生成 |
| CogVideoX | THUDM | HF Space | 视频生成 |
| Open-Sora | PKU | HF Space / 自托管 | 视频生成 |
| Cosmos Tokenizer | NVIDIA | 官网 | 视频分词器 |
| SVD 1.1 Image-to-Video | Stability | HF Space | 图生视频 |
| Latte | NVLabs | HF Space | 视频生成 |
| VideoCrafter2 | Tencent | HF Space | 视频生成 |
| ModelScope T2V | Alibaba | HF Space | 文生视频 |

### 8.2 参考项目

- **界面设计**: V2EX、GitHub Discussions、Hugging Face Spaces
- **Markdown 编辑器**: GitHub Issue 编辑器风格
- **社区运营**: Papers With Code 讨论区、Reddit r/MachineLearning

### 8.3 目录变更总览

```
WMT/
├── wmt-backend/                    # 🆕 新增：FastAPI 后端
│   ├── app/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── wmt-website/
│   ├── app/
│   │   └── src/
│   │       ├── components/
│   │       │   ├── editor/         # 🆕
│   │       │   ├── comment/        # 🆕
│   │       │   └── demo/           # 🆕
│   │       ├── pages/
│   │       │   ├── Blog/           # 🆕
│   │       │   ├── Forum/          # 🆕
│   │       │   ├── DemoGallery/    # 🆕
│   │       │   ├── Auth/           # 🆕
│   │       │   └── Admin/          # 🆕
│   │       ├── services/           # 🆕 API 层
│   │       ├── stores/             # 🆕 状态管理
│   │       ├── hooks/              # 🆕 自定义 hooks
│   │       └── types/              # 🆕 类型定义
│   └── ...
├── docs/
├── docker-compose.yml              # 🆕
└── upgrade-plan.md                 # 📄 本文件
```

---

*计划制定时间: 2026-04-21*  
*版本: v1.0*  
*制定者: WMT 升级规划*
