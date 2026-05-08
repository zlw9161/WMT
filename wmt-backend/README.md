# WMT Backend (Phase 1)

FastAPI backend scaffold for WMT Community upgrade plan Phase 1.

## Features in this phase

- FastAPI project bootstrap
- SQLite + SQLAlchemy setup
- Alembic migration setup
- JWT auth (register/login/refresh)
- User APIs (me/read/list/update/delete)
- CORS configured for local frontend dev

## Quick start

1. Create environment from repo root:

```bash
conda env update -f ../environment.yml
conda activate wmt
```

2. Install backend dependencies (if needed):

```bash
pip install -r requirements.txt
```

3. Create local env file:

```bash
cp .env.example .env
```

4. Run migration:

```bash
alembic upgrade head
```

5. Start API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8888
```

## API endpoints

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login` (form-data: username, password)
- `POST /api/auth/refresh`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `GET /api/users` (admin only)
- `GET /api/users/{user_id}`
- `DELETE /api/users/{user_id}` (admin only)
