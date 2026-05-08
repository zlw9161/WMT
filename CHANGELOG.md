# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog,
and this project follows Semantic Versioning.

## [0.0.2] - 2026-05-08

### Added
- Added Phase 1 backend scaffold (`wmt-backend`) with FastAPI, SQLAlchemy, Alembic, and auth/user endpoints.
- Added frontend authentication flow: login/register/profile pages, protected route, and auth hook.
- Added development API setup with Vite proxy and shared Conda environment file.

### Changed
- Upgraded frontend package version from `0.0.1` to `0.0.2`.
- Updated local auth and API wiring for end-to-end register/login/me flow in development.

### Fixed
- Fixed API path and dev proxy issues that caused `Not Found`/`Failed to fetch` during auth requests.

## [0.0.1] - 2026-04-20

### Added
- Added 2026 world-model entries to data files, including models, timeline events, and latest updates.
- Added source-backed 2026 updates based on verifiable references.
- Added `sourceLevel` metadata in updates for easier source reliability tracking.
- Added this `CHANGELOG.md` for release history tracking.

### Changed
- Bumped frontend app version from `0.0.0` to `0.0.1` in `wmt-website/app/package.json` and lockfile.
- Improved timeline rendering logic to auto-extend year periods, so new years (e.g., 2026+) are displayed without manual code updates.
- Refreshed root documentation (`README.md`) with clearer structure and version tag.

### Fixed
- Fixed timeline year grouping issue that hid 2026 events due to hardcoded period ranges.

## [0.0.0] - Initial

### Added
- Initial project scaffold for WorldModel Tracker website.
- Bilingual documentation and static frontend architecture.
