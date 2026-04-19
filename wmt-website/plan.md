# WorldModel Tracker 网站搭建计划

## 项目概述
搭建一个"世界模型(WorldModel)"追踪调研网站，支持中英文双语切换。
- 英文名称: WorldModel Tracker
- 中文名称: 世界模型跟踪器
- 风格参照: https://www.mls-home.com:1311/ （深色背景、霓虹发光、粒子动画、科技感）
- 技术栈: Python (数据层) + React + TypeScript + Tailwind CSS + Vite (前端)

## 阶段安排

### Stage 1: 项目初始化与设计 (Main Agent - 我自己)
- 初始化React项目
- 创建设计文档 design.md
- 定义数据接口规范（供Python数据和前端对接）
- 输出: /mnt/agents/output/design/design.md, /mnt/agents/output/app/

### Stage 2: 并行开发 (3个Sub-agent同时工作)

#### Agent 1: Python数据工程师 (Data_Engineer)
- **任务**: 用Python编写世界模型领域的数据采集与结构化脚本
- **输出**: /mnt/agents/output/worldmodel_data/
  - companies.json - 世界模型相关公司与机构
  - models.json - 主要世界模型项目/模型
  - papers.json - 重要论文与研究
  - timeline.json - 世界模型发展时间线
  - news.json - 最新动态
- **技术**: Python脚本，生成中英文双语的JSON数据文件
- **关键**: 数据必须包含中英文字段 (title/title_cn, description/description_cn)

#### Agent 2: 前端架构师 (Frontend_Architect)
- **任务**: 实现网站主页 + 共享组件 + 视觉效果
- **工作分支**: scaffold
- **核心内容**:
  - 霓虹发光文字效果 (品红/青色/黄色渐变)
  - 粒子动画背景 (Canvas/CSS实现)
  - 中英文语言切换功能 (React Context)
  - Navbar组件 (含语言切换按钮)
  - Footer组件
  - Layout组件
  - Hero区域 (大号发光标题 + 标语)
  - 主页各个section
- **技术**: React 19 + TypeScript + Tailwind CSS v3 + Framer Motion

#### Agent 3: 页面开发者 (Page_Developer)
- **任务**: 实现所有子页面
- **工作分支**: pages
- **页面列表**:
  - /tracking - 世界模型追踪页（主要公司/模型/论文的追踪卡片）
  - /timeline - 发展时间线页
  - /about - 关于页面
  - /detail/:id - 详情页面（展示具体模型/公司详情）
- **技术**: React 19 + TypeScript + Tailwind CSS v3

### Stage 3: 合并与部署 (Main Agent)
- 合并所有分支
- 集成Python数据到前端
- 构建和部署
- 输出: 可访问的网站URL

## 数据接口规范

所有JSON数据文件统一格式:
```json
{
  "items": [
    {
      "id": "unique-id",
      "title": "English Title",
      "title_cn": "中文标题",
      "description": "English description",
      "description_cn": "中文描述",
      "category": "category-name",
      "tags": ["tag1", "tag2"],
      "date": "2024-01-01",
      "url": "https://...",
      "image": "/image-path.jpg",
      "status": "active|research|released"
    }
  ]
}
```

## 视觉风格规范 (基于参考网站)
- 背景色: 深色 (#0a0a1a 或类似深紫/深蓝色)
- 主色调: 深色底色上的霓虹发光
- 发光色1: 品红/粉红 (#ff0080)
- 发光色2: 青色 (#00ffff)
- 发光色3: 黄色/金色 (#ffd700)
- 文字色: 白色 (#ffffff) + 灰色辅助
- 卡片: 半透明深色背景 + 渐变边框
- 字体: 现代无衬线字体
- 动画: 粒子背景 + 发光脉冲 + 滚动动画
