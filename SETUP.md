# Setup Guide

## Environment Variables

This application requires the following environment variables to be set:

### Required Variables

#### 1. ADMIN_EMAIL
The email address for admin login.

\`\`\`bash
ADMIN_EMAIL="admin@yourcompany.com"
\`\`\`

#### 2. ADMIN_PASSWORD_HASH
A hash of your admin password. **Never store plain text passwords!**

**How to generate:**

\`\`\`bash
# Run the password hash generator script
npm run generate-password YourSecurePassword123
\`\`\`

Or directly:

\`\`\`bash
node scripts/generate-password-hash.js YourSecurePassword123
\`\`\`

This will output something like:
\`\`\`bash
✅ Password hash generated successfully!

Add this to your .env file or Vercel environment variables:

ADMIN_PASSWORD_HASH=a1b2c3d4e5f6789abcdef...

⚠️  IMPORTANT: Keep this hash secure and never commit it to version control!
\`\`\`

Copy the hash value to your `.env.local` file.

#### 3. NEXT_PUBLIC_SITE_URL
The public URL of your website. This is used for:
- Open Graph meta tags
- Canonical URLs
- Sitemap generation
- Email links

**For local development:**
\`\`\`bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
\`\`\`

**For production (Vercel):**
\`\`\`bash
NEXT_PUBLIC_SITE_URL="https://yoursite.com"
\`\`\`

Or use Vercel's automatic URL:
\`\`\`bash
NEXT_PUBLIC_SITE_URL="https://your-project.vercel.app"
\`\`\`

#### 4. GitHub Integration (Required for Admin Panel)
The admin panel requires GitHub integration to save changes:

\`\`\`bash
GITHUB_TOKEN="ghp_your_github_personal_access_token"
GITHUB_OWNER="your-github-username"
GITHUB_REPO="your-repo-name"
\`\`\`

**How to get a GitHub token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Wirya CMS"
4. Select scopes: `repo` (Full control of private repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again!)

**IMPORTANT**: These credentials are stored server-side only and never exposed to the browser.

### Complete .env.local Example

\`\`\`bash
# Admin Authentication
ADMIN_EMAIL="admin@wirya.com"
ADMIN_PASSWORD_HASH="a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# GitHub Integration (Required for Admin Panel)
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GITHUB_OWNER="yourusername"
GITHUB_REPO="your-repo-name"
\`\`\`

## Setup Steps

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Create environment file**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Generate admin password hash**
   \`\`\`bash
   npm run generate-password YourSecurePassword123
   \`\`\`

5. **Edit .env.local**
   Add all required environment variables (see above)

6. **Run development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

7. **Access admin panel**
   Navigate to `http://localhost:3000/admin` and login with your credentials

### Production Deployment (Vercel)

1. **Push code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Add environment variables**
   In Vercel project settings → Environment Variables, add:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `NEXT_PUBLIC_SITE_URL` (use your Vercel URL or custom domain)
   - `GITHUB_TOKEN` (required for admin panel)
   - `GITHUB_OWNER` (required for admin panel)
   - `GITHUB_REPO` (required for admin panel)

4. **Deploy**
   Vercel will automatically deploy your site

5. **Update NEXT_PUBLIC_SITE_URL**
   After first deployment, update `NEXT_PUBLIC_SITE_URL` to your actual Vercel URL or custom domain

## Security Checklist

- [ ] Generated a strong admin password (12+ characters, mixed case, numbers, symbols)
- [ ] Created password hash using the generator script
- [ ] Added all environment variables to `.env.local` (local) or Vercel (production)
- [ ] Never committed `.env.local` to version control
- [ ] Set correct `NEXT_PUBLIC_SITE_URL` for your environment
- [ ] GitHub token has minimal required permissions (only `repo` scope)
- [ ] Tested admin login works correctly

## Troubleshooting

### "Invalid email or password" error
- Check that `ADMIN_EMAIL` matches exactly what you're entering
- Verify `ADMIN_PASSWORD_HASH` was generated correctly
- Make sure environment variables are loaded (restart dev server)

### GitHub sync not working
- Verify `GITHUB_TOKEN` is valid and not expired
- Check `GITHUB_OWNER` and `GITHUB_REPO` are correct
- Ensure token has `repo` scope permissions

### Site URL issues
- Make sure `NEXT_PUBLIC_SITE_URL` doesn't have trailing slash
- For local dev, use `http://localhost:3000`
- For production, use your actual domain or Vercel URL
- Restart dev server after changing environment variables

## Need Help?

If you encounter issues, check:
1. All environment variables are set correctly
2. Dev server was restarted after adding/changing env vars
3. No typos in variable names or values
4. `.env.local` file is in the root directory
