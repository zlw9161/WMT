# WorldModel Tracker

![WMT Version](https://img.shields.io/badge/WMT-v0.0.1-0ea5e9)
![Status](https://img.shields.io/badge/status-active-22c55e)

WorldModel Tracker (WMT) is a bilingual website for tracking the world-model ecosystem in AI, including companies, models, papers, timeline milestones, and recent updates.

## Documentation

- [English documentation](README.en.md)
- [中文文档](README.zh-CN.md)
- [English deployment guide](Deployment.en.md)
- [中文部署文档](Deployment.zh-CN.md)
- [Changelog](CHANGELOG.md)

## Current Version

- WMT: `0.0.1`
- Previous: `0.0.0`
- Last updated: `2026-04-20`

## Project Snapshot

- Frontend path: `wmt-website/app`
- Stack: Vite + React + TypeScript + Tailwind CSS
- Routing mode: HashRouter
- Runtime data source: `wmt-website/app/src/data/worldmodel/`
- Build output: `dist/`

## Repository Layout

```text
WMT/
├─ README.md
├─ README.en.md
├─ README.zh-CN.md
├─ Deployment.en.md
├─ Deployment.zh-CN.md
├─ CHANGELOG.md
├─ docs/
│  └─ screenshots/
└─ wmt-website/
	├─ generate_worldmodel_data.py
	├─ worldmodel_data/
	└─ app/
		├─ package.json
		├─ public/
		└─ src/
```

## Preview

![Homepage preview](docs/screenshots/homepage.png)

## Development Team

![PeCoLab logo](wmt-website/app/public/peco-logo.png)

Developed and maintained by PeCoLab (Perception & Cognition Laboratory).

## Quick Start

```bash
cd wmt-website/app
npm install
npm run dev
```

For full setup and deployment instructions, see [README.en.md](README.en.md) and [Deployment.en.md](Deployment.en.md).
