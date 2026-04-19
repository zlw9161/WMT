# WorldModel Tracker App

This directory contains the frontend application for WorldModel Tracker.

该目录是 WorldModel Tracker 的前端应用。

## Quick Start

```powershell
cd D:\Projects\PeCo\WMT\wmt-website\app
npm install
npm run dev
```

If PowerShell cannot find `node` or `npm`, run:

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

## Scripts

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

## Documentation / 文档

- [Repository overview](../../README.md)
- [中文文档](../../README.zh-CN.md)
- [English documentation](../../README.en.md)
- [中文部署文档](../../Deployment.md)
- [English deployment guide](../../Deployment.en.md)

## Notes / 说明

- The app uses HashRouter and is suitable for static deployment.
- Frontend data is loaded from `src/data/worldmodel/`.
- 完整项目说明请查看仓库根目录文档。
