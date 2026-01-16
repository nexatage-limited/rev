# OAuth Authentication Setup

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## Apple OAuth Setup

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Sign in with your Apple Developer account
3. Go to Certificates, Identifiers & Profiles
4. Create a new Services ID
5. Enable "Sign in with Apple"
6. Configure domains and redirect URLs:
   - `http://localhost:3000/api/auth/callback/apple` (development)
   - `https://yourdomain.com/api/auth/callback/apple` (production)
7. Create a private key for Sign in with Apple
8. Copy Service ID and generate Client Secret
9. Add to `.env.local`:
   ```
   APPLE_CLIENT_ID=your-service-id
   APPLE_CLIENT_SECRET=your-generated-secret
   ```

## NextAuth Secret

Generate a random secret for NextAuth:

```bash
openssl rand -base64 32
```

Add to `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/auth/signin`
3. Click "Continue with Google" or "Continue with Apple"
4. Complete OAuth flow
5. You'll be redirected to the appropriate dashboard

## Production

For production deployment:
1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URIs to Google and Apple OAuth configs
3. Ensure all secrets are set in your deployment environment (Vercel, etc.)
