# Deployment Guide

## Overview

Rev has two separate deployments:
1. **User App** - Customer and technician-facing application (`/user-app/*`)
2. **Admin Dashboard** - Internal admin panel (`/admin/*`)

Both apps are deployed from the same Next.js codebase but to separate Vercel projects.

## Prerequisites

- Vercel account
- GitHub repository access
- Node.js 20+

## Setup Instructions

### 1. Create Vercel Projects

#### User App Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Project Name**: `rev-user-app` (or your preferred name)
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` - Paystack public key
   - `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Stripe public key
   - `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox access token
6. Deploy and note the **Project ID** from Settings → General

#### Admin Dashboard Project
1. Create another new project
2. Import the same GitHub repository
3. Configure:
   - **Project Name**: `rev-admin-dashboard` (or your preferred name)
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add the same environment variables as User App
5. Deploy and note the **Project ID** from Settings → General

### 2. Get Vercel Credentials

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Create a new token with appropriate scope
3. Copy the token (you won't see it again)
4. Get your **Team/Org ID** from Settings → General

### 3. Configure GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret" and add:

| Secret Name | Description | Where to Find |
|------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel authentication token | Vercel Account Settings → Tokens |
| `VERCEL_ORG_ID` | Your Vercel team/org ID | Vercel Team Settings → General |
| `VERCEL_PROJECT_ID` | User App project ID | User App Project Settings → General |
| `VERCEL_ADMIN_PROJECT_ID` | Admin Dashboard project ID | Admin Project Settings → General |
| `API_URL` | Production backend API URL | Your backend deployment URL |
| `STAGING_API_URL` | Staging backend API URL | Your staging backend URL |

### 4. Deployment Workflows

The repository has three deployment workflows:

#### CI Workflow (`.github/workflows/ci.yml`)
- Runs on: All pushes and PRs
- Actions: Lint and build both frontend and backend
- Purpose: Ensure code quality before deployment

#### Staging Deployment (`.github/workflows/deploy-staging.yml`)
- Runs on: Push to `staging` branch
- Deploys: Both apps to Vercel preview environments
- Purpose: Test changes before production

#### Production Deployment (`.github/workflows/deploy-prod.yml`)
- Runs on: Push to `master` branch
- Deploys: Both apps to production
- Purpose: Live deployment

### 5. Backend API Setup

The frontend expects the backend API to be available at the URL specified in `NEXT_PUBLIC_API_URL`.

Ensure your backend is deployed and accessible before deploying the frontend.

## Deployment Process

### Deploy to Staging
```bash
git checkout staging
git merge feature/your-feature
git push origin staging
```

This will trigger automatic deployment to preview environments.

### Deploy to Production
```bash
git checkout master
git merge staging
git push origin master
```

This will trigger automatic deployment to production.

## Manual Deployment

If you need to deploy manually:

### User App
```bash
cd frontend
npx vercel --prod --token=YOUR_VERCEL_TOKEN
```

### Admin Dashboard
```bash
cd frontend
cp vercel.admin.json vercel.json
npx vercel --prod --token=YOUR_VERCEL_TOKEN
```

## Vercel Project URLs

After deployment, your apps will be available at:
- **User App**: `https://rev-user-app.vercel.app` (or your custom domain)
- **Admin Dashboard**: `https://rev-admin-dashboard.vercel.app` (or your custom domain)

## Custom Domains

To add custom domains:
1. Go to Vercel Project Settings → Domains
2. Add your domain (e.g., `app.rev.com` for user app, `admin.rev.com` for admin)
3. Configure DNS records as instructed by Vercel

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Verify Node.js version is 20+
- Check build logs in Vercel dashboard

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend is deployed and accessible
- Check CORS settings on backend

### Deployment Not Triggering
- Verify GitHub secrets are set correctly
- Check workflow file syntax
- Review GitHub Actions logs

## Environment Variables Reference

See `.env.example` in the frontend directory for a complete list of required environment variables.

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review GitHub Actions workflow logs
3. Verify all secrets and environment variables are set correctly
