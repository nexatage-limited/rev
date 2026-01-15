# Rev - AI-Assisted Phone Repair Platform

## Project Structure

```
rev-dev/
├── frontend/
│   ├── user-app/          # Customer & Technician App (Port 3000)
│   └── admin-dashboard/   # Admin Dashboard (Port 3001)
├── shared/                # Shared types and utilities
└── backend/               # NestJS API (Port 3002)
```

## Quick Start

### Install Dependencies

```bash
# User App
cd frontend/user-app
npm install

# Admin Dashboard
cd frontend/admin-dashboard
npm install
```

### Development

```bash
# Terminal 1 - User App
cd frontend/user-app
npm run dev

# Terminal 2 - Admin Dashboard
cd frontend/admin-dashboard
npm run dev

# Terminal 3 - Backend
cd backend
npm run start:dev
```

### URLs

- User App: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- Backend API: http://localhost:3002

## Deployment

Each app deploys independently to Vercel:

**User App:**
- Root Directory: `frontend/user-app`
- Build Command: `npm run build`
- Output Directory: `.next`

**Admin Dashboard:**
- Root Directory: `frontend/admin-dashboard`
- Build Command: `npm run build`
- Output Directory: `.next`

## Documentation

- [Product Requirements](./docs/PRD.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Design System](./docs/DESIGN_SYSTEM.md)
