# WorldModel Tracker

![WMT Version](https://img.shields.io/badge/WMT-v0.0.1-0ea5e9)

## Version

- Current release: 0.0.1
- Previous release: 0.0.0
- Frontend package name: wmt-web
- Change history: [CHANGELOG.md](CHANGELOG.md)

## Overview

WorldModel Tracker is a bilingual static website for monitoring the world model ecosystem in AI, including companies, model releases, papers, timeline events, and recent updates.

The frontend is built with Vite, React, and TypeScript. It uses HashRouter for static-friendly routing, which makes the project easy to build into `dist/` and deploy with Nginx or any other static hosting service.

The frontend application package is named `wmt-web` in `wmt-website/app/package.json`.

## Development Team

### PeCoLab

![PeCoLab logo](wmt-website/app/public/peco-logo.png)

Developed and maintained by PeCoLab (Perception & Cognition Laboratory).

## Features

- Bilingual UI with English and Chinese language switching
- Home page with project overview, featured models, and latest updates
- Tracking page with category filters, status filters, search, and sorting
- Timeline page for major milestones in world model development
- Detail page for individual companies, models, and papers
- About page describing mission, methodology, and project statistics
- Fully static JSON-driven content with no backend dependency

## Screenshots

### Home Page

![Home page screenshot](docs/screenshots/homepage.png)

### Tracking Page

![Tracking page screenshot](docs/screenshots/tracking.png)

### Timeline Page

![Timeline page screenshot](docs/screenshots/timeline.png)

If images are not displayed yet, place the corresponding files in `docs/screenshots/` with the same names.

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React
- shadcn/ui-style component set

## Repository Layout

```text
WMT/
├─ Deployment.md
├─ README.md
├─ README.zh-CN.md
├─ README.en.md
├─ wmt-website/
│  ├─ generate_worldmodel_data.py
│  ├─ worldmodel_data/
│  └─ app/
│     ├─ package.json
│     ├─ public/
│     └─ src/
│        ├─ components/
│        ├─ contexts/
│        ├─ data/worldmodel/
│        └─ pages/
└─ wmt-website-bak/
```

## Routes

- `/`: home page
- `/tracking`: tracking dashboard for companies, models, and papers
- `/timeline`: development timeline
- `/about`: project background and methodology
- `/detail/:id`: item detail page

## Data Flow

The frontend currently reads JSON content from `wmt-website/app/src/data/worldmodel/` and aggregates it through the internal data loader.

Main data files:

- `companies.json`
- `models.json`
- `papers.json`
- `timeline.json`
- `updates.json`

The script `wmt-website/generate_worldmodel_data.py` is intended for generating world model datasets. After regenerating data, sync the output into `src/data/worldmodel/` if you want the frontend to use the latest content.

## Local Development

Recommended environment:

- Node.js 22 LTS
- npm 10+

Go to the frontend app directory:

```powershell
cd D:\Projects\PeCo\WMT\wmt-website\app
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

If PowerShell cannot find `node` or `npm`, temporarily prepend Node.js to PATH:

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

## Common Commands

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

Recommended release flow:

1. Run `npm run build` locally
2. Generate the static output in `dist/`
3. Upload `dist/` to your Ubuntu server
4. Serve it with Nginx or another static file server

See [Deployment.en.md](Deployment.en.md) for the full deployment guide.

## Use Cases

- Research tracking site for world model developments
- AI trend visualization website
- Bilingual static knowledge hub
- Public-facing lab or team showcase site

## Notes

- This is currently a pure frontend static project
- HashRouter makes static deployment simpler
- On Linux servers, make sure import paths match file name casing exactly