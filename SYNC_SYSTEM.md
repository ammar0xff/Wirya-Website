# Synchronization System Documentation

## Overview

The refactored synchronization system provides a secure, reliable, and user-friendly way to manage content and sync changes to GitHub. This document explains the architecture, components, and usage.

## Architecture

### Components

1. **Content Manager** (`lib/content-manager.ts`)
   - Singleton pattern for centralized state management
   - Manages blog posts, services, and service categories
   - Tracks dirty state (unsaved changes)
   - Observable pattern for React integration
   - Persists to localStorage for offline editing

2. **Sync Service** (`lib/sync-service.ts`)
   - Handles all GitHub synchronization operations
   - Preserves file structure and exports
   - Uses server-side API for security
   - Provides methods for syncing blog posts and services

3. **Server API** (`app/api/sync/route.ts`)
   - Secure server-side GitHub operations
   - Environment variable validation
   - Proper error handling and logging
   - Never exposes GitHub tokens to browser

4. **React Hook** (`hooks/use-content-manager.ts`)
   - Easy integration with React components
   - Automatic re-renders on state changes
   - Type-safe content management

### Data Flow

\`\`\`
User Action (Edit/Delete)
    ↓
Content Manager (Update State)
    ↓
UI Update (Optimistic)
    ↓
User Clicks "Sync"
    ↓
Sync Service (Prepare Data)
    ↓
Server API (GitHub Operations)
    ↓
GitHub Repository (Commit)
    ↓
Vercel Webhook (Auto Deploy)
    ↓
Site Updated
\`\`\`

## Security Features

### Server-Side Token Storage
- GitHub tokens stored in environment variables
- Never exposed to browser or client-side code
- All GitHub operations go through server API

### Authentication
- Admin credentials stored as environment variables
- Password hashing for secure storage
- HTTP-only cookies for session management

### Data Validation
- Server-side validation of all sync requests
- Environment variable checks before operations
- Proper error handling and user feedback

## Usage

### For Developers

#### Initialize Content Manager

\`\`\`typescript
import { useContentManager } from "@/hooks/use-content-manager"

function MyComponent() {
  const { state, manager } = useContentManager()
  
  // Access current state
  console.log(state.blogPosts)
  console.log(state.services)
  console.log(state.isDirty) // Has unsaved changes?
  
  // Update content
  manager.addBlogPost(newPost)
  manager.updateService(id, updatedService)
  manager.deleteService(id)
}
\`\`\`

#### Sync to GitHub

\`\`\`typescript
import { SyncService } from "@/lib/sync-service"

async function syncContent() {
  // Sync blog posts
  const result = await SyncService.syncBlogPosts(state.blogPosts)
  
  // Sync services
  const result = await SyncService.syncServices(state.services)
  
  // Sync both
  const results = await SyncService.syncAll(state.blogPosts, state.services)
  
  if (result.success) {
    manager.markSynced()
  }
}
\`\`\`

### For Administrators

#### Editing Content

1. Navigate to admin panel (`/admin`)
2. Login with your credentials
3. Edit blog posts or services
4. Changes are saved locally (dirty state indicator appears)
5. Click "Sync" button to save to GitHub
6. Wait for confirmation message
7. Vercel will automatically rebuild and deploy

#### Monitoring Sync Status

- **Dirty State Indicator**: Orange banner shows unsaved changes
- **Sync Button**: Disabled when no changes to sync
- **Status Messages**: Real-time feedback on sync operations
- **Last Sync Time**: Displayed in content manager state

## File Structure Preservation

The sync service preserves the complete file structure when syncing:

### Blog Posts (`lib/blog-loader.ts`)
\`\`\`typescript
import type { BlogPost } from "./types"

export const BLOG_POSTS: BlogPost[] = [...]

export { BLOG_POSTS as default }
\`\`\`

### Services (`lib/services.ts`)
\`\`\`typescript
export interface Service { ... }
export interface ServiceCategory { ... }

export const serviceCategories: ServiceCategory[] = [...]
export const services: Service[] = [...]

export const SERVICES = services
export const SERVICE_CATEGORIES = serviceCategories
\`\`\`

This ensures:
- Type definitions are preserved
- Multiple exports work correctly
- No breaking changes to existing code
- Build system recognizes all exports

## Error Handling

### Client-Side
- User-friendly error messages
- Retry mechanisms for network failures
- Offline editing with localStorage backup
- Dirty state tracking prevents data loss

### Server-Side
- Environment variable validation
- GitHub API error handling
- Detailed logging for debugging
- Proper HTTP status codes

## Benefits

### Security
- ✅ GitHub tokens never exposed to browser
- ✅ Server-side authentication
- ✅ HTTP-only cookies
- ✅ Environment variable validation

### Reliability
- ✅ Centralized state management
- ✅ Dirty state tracking
- ✅ localStorage persistence
- ✅ Optimistic UI updates

### User Experience
- ✅ Real-time feedback
- ✅ Unsaved changes indicator
- ✅ Automatic state synchronization
- ✅ Clear error messages

### Maintainability
- ✅ Single source of truth
- ✅ Type-safe operations
- ✅ Observable pattern
- ✅ Easy to extend

## Troubleshooting

### Sync Fails

**Check:**
1. Environment variables are set correctly
2. GitHub token has `repo` scope
3. Repository owner and name are correct
4. Network connection is stable

**Solution:**
- Verify environment variables in Vercel dashboard
- Check browser console for error messages
- Review server logs for detailed errors

### Changes Not Appearing

**Check:**
1. Sync completed successfully
2. Vercel deployment finished
3. Browser cache cleared

**Solution:**
- Wait for Vercel deployment to complete
- Hard refresh browser (Ctrl+Shift+R)
- Check Vercel deployment logs

### Dirty State Not Clearing

**Check:**
1. Sync completed successfully
2. `manager.markSynced()` was called

**Solution:**
- Manually refresh the page
- Check browser console for errors
- Verify sync API response

## Future Enhancements

### Planned Features
- [ ] Conflict resolution for concurrent edits
- [ ] Version history and rollback
- [ ] Draft/publish workflow
- [ ] Scheduled publishing
- [ ] Multi-user support with roles
- [ ] Real-time collaboration
- [ ] Image upload and management
- [ ] SEO optimization tools

### Possible Integrations
- [ ] Database backend (PostgreSQL, MongoDB)
- [ ] CDN for media files
- [ ] Search indexing (Algolia, Elasticsearch)
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Webhook support

## Support

For issues or questions:
- Check this documentation first
- Review SETUP.md for configuration
- Check DEPLOYMENT.md for deployment issues
- Review browser console for client errors
- Check Vercel logs for server errors
