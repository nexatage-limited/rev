# REV - Product Requirements Document (PRD)

**Version 1.0**  
**Prepared for:** Engineering Build – 2 Months  
**Confidential** — Rev © 2025

---

## 1. PRODUCT OVERVIEW

Rev is an AI-assisted, trust-first platform that connects users with vetted mobile phone repair technicians. The platform focuses on reliable matching, transparent pricing, and end-to-end tracking to reduce fraud and increase accountability in phone repairs.

### Vision

To make phone repair safe, fast, transparent, and trustworthy.

### Mission

Enable users to confidently repair their devices while giving skilled technicians the tools to build a verified, steady business.

### Core Value Proposition

| Problem                                         | Rev Solution                                               |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Users fear fraud, poor quality, delays          | Verified technicians, transparent pricing, tracked repairs |
| Technicians lack visibility and consistent work | Smart matching, stable leads, reputation system            |

---

## 2. PROBLEM STATEMENT

Across many cities, phone repair is associated with trust problems: unknown technicians, no transparent pricing, long repair times, and inconsistent quality. Customers often rely on word-of-mouth; technicians struggle to scale beyond local reputation. These pain points make buying and repairing phones a high-friction, risky process.

---

## 3. USER PERSONAS

### Primary: The Busy Professional — "Tade"

- **Age:** 25–40
- **Motivation:** Fast, reliable repairs with minimal hassle
- **Needs:** Quick booking (≤2 mins), reliable technician, tracking & ETA
- **Success Metric:** Book repair in under 2 minutes; device returned within 24–48 hours

### Technician: The Skilled Engineer — "Kunle"

- **Age:** 22–45
- **Motivation:** Steady work, fair earnings, reputation building
- **Needs:** Verified profile, job details before acceptance, timely payments
- **Success Metric:** 3–5 bookings/week with avg rating ≥4.3

### Secondary: Pre-Owned Device Buyer — "Aisha" (Future)

This persona represents users who want verified repair certifications for buying used phones. Not in MVP scope, informs future features.

---

## 4. DESIGN SYSTEM (Summary)

Design principles: Trust by design, clarity, accessibility (AA), and speed. Use a sans-serif UI type family, consistent spacing (4px grid), and clear CTA hierarchy.

| Element       | Specification                              |
| ------------- | ------------------------------------------ |
| Primary Color | #FF6A00 (Energetic Orange)                 |
| Accent/Black  | #000000                                    |
| Typography    | Inter (or Helvetica fallback) — Sans-serif |
| Buttons       | Rounded 12px, elevated for primary CTAs    |

---

## 5. MVP SCOPE & FEATURE LIST

**Goal:** Deliver an end-to-end repair booking experience that proves demand and validates core assumptions: users prefer verified technicians and will pay for trusted repairs.

1. User onboarding (email, phone OTP, social login)
2. Technician onboarding + KYC, document upload, verification workflow
3. Repair request flow: device selection, issue category, schedule, pickup/drop options
4. Rule-based matching engine (location + rating + skill) — top 3 technicians
5. In-app messaging between user and technician
6. Job lifecycle & status updates (Pending → Accepted → In Repair → Ready → Completed)
7. Payments: Pay on delivery + online payments (Paystack/Stripe)
8. Ratings & reviews, dispute resolution in admin panel
9. Admin dashboard for verification and support

---

## 6. FEATURE DETAILS (Selected Deep Dives)

### 6.1 Authentication & Accounts

Support email + phone OTP sign-up. Session handling via secure JWT refresh tokens. Role-based access: user, technician, admin.

### 6.2 Repair Request Flow (User)

Multi-step wizard:

1. Device (brand & model)
2. Issue category + symptoms
3. Location & pick-up/drop options
4. Preferred time & confirmation

Provide a cost estimate range and ETA from matched technicians.

### 6.3 Matching Engine (MVP)

Rule-based approach for MVP: filter by proximity (≤10km), verified status, rating, and technician availability.

**Ranking formula:**

```
score = 0.5 * rating + 0.3 * proximity_score + 0.2 * response_time_score
```

### 6.4 Job Lifecycle & Notifications

**Job states:** Requested → Accepted → In Repair → Ready → Completed → Rated

Push & in-app notifications for state changes; email receipts for payments and confirmations.

### 6.5 In-App Messaging

Use Firebase Realtime Database or WebSocket-powered messaging for MVP. Messages persist in DB; include basic read receipts and timestamps.

---

## 7. TECH STACK & ARCHITECTURE

| Layer         | Recommended Technology                         |
| ------------- | ---------------------------------------------- |
| Frontend      | Next.js + TailwindCSS; PWA-enabled             |
| Backend       | Node.js + NestJS (or Express)                  |
| Database      | PostgreSQL (primary) + Redis (cache)           |
| Auth          | Supabase Auth or custom JWT + refresh token    |
| Realtime      | Firebase RTDB for chat / WebSockets for events |
| Payments      | Paystack (Nigeria) + Stripe (global)           |
| Hosting/Infra | AWS (EC2/RDS/S3) or Vercel + managed DB        |

---

## 8. 8-WEEK ENGINEERING PLAN (Detailed)

**Team Composition:** 1 PM, 1 UX/UI, 2 Frontend, 2 Backend, 1 QA (contractor). Parallel pods: Frontend & Backend work in parallel with weekly syncs.

| Week   | Focus                       | Deliverables                                                     |
| ------ | --------------------------- | ---------------------------------------------------------------- |
| Week 1 | Setup & Foundations         | Repo, CI/CD, staging, baseline UI kit, auth endpoints            |
| Week 2 | Onboarding & Technician KYC | User signup, technician profile & doc upload, admin vetting flow |
| Week 3 | Repair Flow Core            | Repair request wizard, DB schemas, basic matching                |
| Week 4 | Matching & Messaging        | Matching service, messaging MVP (Firebase)                       |
| Week 5 | Payments & Tracking         | Payment integration, job status updates, wallet basics           |
| Week 6 | Admin & Analytics           | Admin dashboard, basic analytics (PostHog/Mixpanel)              |
| Week 7 | Testing & Hardening         | Security checks, load testing, bug fixes                         |
| Week 8 | UAT & Launch                | End-to-end testing, deployment, monitoring setup                 |

---

## 9. SUCCESS METRICS & KPIs

1. **Time to submit repair request:** ≤ 2 minutes
2. **Technician acceptance rate:** ≥ 65%
3. **Average repair turnaround time:** ≤ 48 hours
4. **Average customer rating:** ≥ 4.3/5
5. **Repeat user rate (3 months):** ≥ 30%

---

## 10. RISKS & MITIGATIONS

| Risk                                 | Impact | Mitigation                                           |
| ------------------------------------ | ------ | ---------------------------------------------------- |
| Low-quality technicians damage brand | High   | Strict KYC + probationary period + deposit system    |
| Payment disputes & fraud             | Medium | Escrow-like hold + Pay on Delivery option            |
| Real-time chat complexity            | Medium | Use Firebase for MVP to accelerate                   |
| Timeline slippage                    | Medium | Parallel pods & weekly demos; reduce scope if needed |

---

## 11. OPERATIONAL CONSIDERATIONS

### Support & SLAs

Define SLA for technician response times and repair turnarounds. Implement basic dispute workflows and admin tools to handle refunds, penalties, and suspensions.

### Monitoring & Observability

Integrate Sentry for errors, PostHog for analytics, and basic CloudWatch/Datadog dashboards for infra metrics.

---

## 12. NEXT STEPS

1. Run a 1-week design sprint to produce high-fidelity screens in Figma (based on this PRD)
2. Break down tasks into Jira epics and user stories per sprint
3. Set up analytics and A/B framework to validate matching and pricing
4. Recruit 5–10 verified technicians for pilot launch

---

## Appendix A: Sample User Flow (Text)

User opens app → selects device → describes issue → selects pickup/drop → sees top 3 matched technicians → confirms booking → technician accepts → updates status → repair completed → payment processed → user rates technician.

---

**Prepared by:** Product & Project Management — Rev  
**Date:** October 26, 2025
