# Subdomain Routing Setup

## Overview
The Rev app uses subdomain-based routing to separate admin dashboard from main app:

- **Main domain** (`rev.com`): Landing page, user portal, technician portal
- **Admin subdomain** (`admin.rev.com`): Admin dashboard

## How It Works

### Middleware (`src/middleware.ts`)
- Detects subdomain from request hostname
- Routes `admin.*` subdomain requests to `/admin/*` paths
- Blocks `/admin` access from main domain (redirects to landing)

### Local Development

1. **Edit hosts file** to test subdomains locally:
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - Mac/Linux: `/etc/hosts`
   
   Add:
   ```
   127.0.0.1 rev.local
   127.0.0.1 admin.rev.local
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```

3. **Access**:
   - Main app: `http://rev.local:3000`
   - Admin: `http://admin.rev.local:3000`

### Production Deployment (Vercel)

1. **Add domains in Vercel**:
   - `rev.com` (main domain)
   - `admin.rev.com` (admin subdomain)

2. **DNS Configuration**:
   - Point both domains to Vercel
   - Vercel automatically handles subdomain routing via middleware

3. **Environment Variables** (if needed):
   - Set `NEXT_PUBLIC_MAIN_DOMAIN=rev.com`
   - Set `NEXT_PUBLIC_ADMIN_DOMAIN=admin.rev.com`

## Routes

### Main Domain (`rev.com`)
- `/` → Landing page
- `/landing` → Landing page
- `/auth/signin` → Sign in
- `/auth/signup` → Sign up
- `/technician/*` → Technician portal
- `/job-status` → Job tracking

### Admin Subdomain (`admin.rev.com`)
- `/` → Admin dashboard overview
- `/users` → User management
- `/technicians` → Technician/KYC management
- `/deliveries` → Delivery management
- `/disputes` → Dispute resolution
