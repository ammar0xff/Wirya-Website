# Deployment Guide

## Pre-Deployment Checklist

### 1. Security (CRITICAL)

- [x] ✅ Backend authentication implemented with HTTP-only cookies
- [x] ✅ GitHub token stored server-side only (never exposed to browser)
- [x] ✅ Removed localStorage usage for sensitive data
- [x] ✅ Server-side API routes for all GitHub operations
- [ ] Add HTTPS enforcement (automatic on Vercel)
- [ ] Enable rate limiting on API routes

### 2. Environment Variables

Create `.env.local` for development and configure in Vercel for production:

\`\`\`env
# Required - Admin Authentication
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD_HASH=your_generated_hash_here

# Required - GitHub Integration (Server-side only)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name

# Required - Site Configuration
NEXT_PUBLIC_SITE_URL=https://yoursite.com

# Optional
NODE_ENV=production
\`\`\`

### 3. Build Configuration

The application now uses Next.js API routes for secure server-side operations:
- ✅ Secure GitHub token handling (server-side only)
- ✅ HTTP-only cookie authentication
- ✅ Centralized content management
- ✅ Optimistic UI updates
- ✅ Proper error handling

**Note**: The `output: 'export'` option has been removed to enable API routes.

### 4. GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
\`\`\`

## Security Recommendations

### Immediate Actions (Before Production)

1. **Backend Authentication API**

Create `app/api/auth/login/route.ts`:
\`\`\`typescript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  // Validate against environment variables or database
  if (email === process.env.ADMIN_EMAIL && 
      await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH)) {
    
    // Set HTTP-only cookie
    cookies().set('admin-session', generateToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })
    
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
\`\`\`

2. **GitHub Sync API Proxy**

Create `app/api/github/sync/route.ts`:
\`\`\`typescript
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  // Verify admin session
  const session = cookies().get('admin-session')
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { filePath, content, commitMessage } = await request.json()
  
  // Use server-side GitHub token
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(content).toString('base64'),
      })
    }
  )
  
  return NextResponse.json(await response.json())
}
\`\`\`

3. **Update Client Code**

Modify `lib/github-sync.ts` to use API proxy instead of direct GitHub calls.

## Deployment Steps

### Vercel Deployment

1. **Connect Repository**
   \`\`\`bash
   vercel link
   \`\`\`

2. **Set Environment Variables**
   \`\`\`bash
   vercel env add GITHUB_TOKEN
   vercel env add GITHUB_OWNER
   vercel env add GITHUB_REPO
   vercel env add ADMIN_EMAIL
   vercel env add ADMIN_PASSWORD_HASH
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Manual Deployment

1. **Build**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Test Build Locally**
   \`\`\`bash
   npm start
   \`\`\`

3. **Deploy to hosting**
   - Upload `out/` directory (for static export)
   - Or deploy `.next/` directory (for full Next.js)

## Post-Deployment

- [ ] Test all admin functions
- [ ] Verify GitHub sync works
- [ ] Check analytics integration
- [ ] Test on mobile devices
- [ ] Run security audit
- [ ] Set up monitoring/alerts
- [ ] Configure custom domain
- [ ] Enable SSL certificate

## Current Limitations

1. **Authentication**: Uses hardcoded credentials and localStorage
2. **GitHub Token**: Exposed in browser (security risk)
3. **No Database**: All data in static files
4. **No Session Management**: No token expiration or refresh
5. **Build Ignores Errors**: TypeScript and ESLint errors ignored

## Recommended Architecture for Production

\`\`\`
Frontend (Next.js)
  ↓
API Routes (Server-side)
  ↓
GitHub API (with server-side token)
  ↓
GitHub Repository
  ↓
Vercel Deployment (auto-rebuild)
\`\`\`

## New Architecture

### Synchronization System

The refactored sync system includes:

1. **Content Manager** (`lib/content-manager.ts`)
   - Centralized state management for blog posts and services
   - Tracks dirty state (unsaved changes)
   - Persists to localStorage for offline editing
   - Observable pattern for React integration

2. **Sync Service** (`lib/sync-service.ts`)
   - Handles all GitHub synchronization
   - Preserves file structure and exports
   - Uses server-side API for security

3. **Server API** (`app/api/sync/route.ts`)
   - Secure server-side GitHub operations
   - Environment variable validation
   - Proper error handling and logging

4. **React Hook** (`hooks/use-content-manager.ts`)
   - Easy integration with React components
   - Automatic re-renders on state changes
   - Type-safe content management

### Benefits

- **Security**: GitHub tokens never exposed to browser
- **Reliability**: Centralized state management prevents data loss
- **UX**: Optimistic updates and dirty state tracking
- **Maintainability**: Single source of truth for content operations
- **Scalability**: Easy to extend with new content types

## Support

For issues or questions:
- Check build logs in Vercel dashboard
- Review GitHub Actions workflow runs
- Check browser console for client errors
- Verify environment variables are set correctly
