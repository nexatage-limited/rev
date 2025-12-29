# Rev - AI-Assisted Phone Repair Platform

Rev is an AI-assisted, trust-first platform that connects users with vetted mobile phone repair technicians. The platform focuses on reliable matching, transparent pricing, and end-to-end tracking to reduce fraud and increase accountability in phone repairs.

## 🎯 Vision

To make phone repair safe, fast, transparent, and trustworthy.

## 🚀 Tech Stack

### Frontend

- **Framework:** Next.js 14+ with App Router
- **Styling:** TailwindCSS
- **Language:** TypeScript
- **PWA:** Progressive Web App enabled

### Backend

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL + Redis
- **Real-time:** Firebase Realtime Database
- **Payments:** Paystack (Nigeria) + Stripe (Global)

## 📁 Project Structure

```
rev-dev/
├── frontend/          # Next.js application
├── backend/           # NestJS API server
├── docs/              # Project documentation
│   ├── PRD.md        # Product Requirements Document
│   ├── ARCHITECTURE.md
│   └── DESIGN_SYSTEM.md
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 📚 Documentation

- [Product Requirements Document](./docs/PRD.md) - Complete product specifications
- [Architecture Overview](./docs/ARCHITECTURE.md) - System design and tech stack
- [Design System](./docs/DESIGN_SYSTEM.md) - UI/UX guidelines and components

## 🎨 Design Principles

1. **Trust by Design** - Every element reinforces credibility and safety
2. **Clarity** - Information is easy to scan and understand
3. **Accessibility** - WCAG 2.1 AA compliance
4. **Speed** - Fast interactions, minimal friction

## 📊 Success Metrics

- Time to submit repair request: ≤ 2 minutes
- Technician acceptance rate: ≥ 65%
- Average repair turnaround: ≤ 48 hours
- Average customer rating: ≥ 4.3/5
- Repeat user rate (3 months): ≥ 30%

## 🗓️ Development Timeline

8-week engineering plan with parallel frontend and backend development:

- **Week 1-2:** Setup, authentication, and onboarding
- **Week 3-4:** Repair flow and matching engine
- **Week 5-6:** Payments and admin dashboard
- **Week 7-8:** Testing, hardening, and launch

## 📄 License

Confidential — Rev © 2025
