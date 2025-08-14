# Supabase Setup Guide for GlobalEye News

This guide will walk you through setting up Supabase for your GlobalEye News project, including database configuration, authentication, and deployment.

## Prerequisites

- A Supabase account (free tier available)
- Basic knowledge of SQL and databases
- Your project repository cloned locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `globaleye-news` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your users
5. Click "Create new project"
6. Wait for the project to be created (usually 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Set Up Environment Variables

1. In your project root, create a `.env.local` file:
```bash
# Create .env.local file manually with the following content
```

2. Edit `.env.local` with your actual values:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SITE_URL=http://localhost:3000
```

## Step 4: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `database_setup.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the script

This script will create:
- All necessary tables
- Indexes for performance
- Row Level Security policies
- Helper functions and triggers
- Initial data (categories, tags, settings)

## Step 5: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add your production URLs when ready
3. Go to **Authentication** → **Providers**
4. Enable **Email** provider
5. Configure email templates if needed

## Step 6: Set Up Storage (Optional)

1. Go to **Storage** → **Policies**
2. Create a new bucket called `avatars` for user profile pictures
3. Set up RLS policies for the bucket

## Step 7: Test Your Setup

1. Start your development server:
```bash
pnpm dev
```

2. Test user registration:
   - Go to `/signup`
   - Create a test user account
   - Verify the user appears in Supabase **Authentication** → **Users**

3. Test database operations:
   - Check if categories are loaded on the homepage
   - Verify the database connection works

## Step 8: Production Configuration

When deploying to production:

1. Update environment variables:
```env
SITE_URL=https://your-domain.com
```

2. Update Supabase authentication settings:
   - **Site URL**: Your production domain
   - **Redirect URLs**: Add your production URLs

3. Set up custom domain (optional):
   - Go to **Settings** → **General**
   - Add your custom domain
   - Update DNS records as instructed

## Database Schema Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `profiles` | User profiles | Extends auth.users, role-based access |
| `articles` | News articles | Status management, SEO fields |
| `categories` | Article categories | Hierarchical structure, color coding |
| `tags` | Article tags | Usage tracking, color coding |
| `comments` | User comments | Moderation, threading |
| `likes` | Article likes | User engagement tracking |
| `favorites` | User favorites | Personalization |
| `views` | Article views | Analytics, tracking |

### Relationships

- **Articles** belong to **Categories** and **Authors** (profiles)
- **Articles** have many **Tags** (many-to-many)
- **Users** can **Like**, **Favorite**, and **Comment** on articles
- **Comments** support threading (parent-child relationships)

### Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Role-based access control** (user, moderator, admin)
- **User isolation** - users can only access their own data
- **Public read access** for published content
- **Moderated content** for user-generated content

## Common Issues and Solutions

### Issue: "Cannot connect to Supabase"
**Solution**: Check your environment variables and ensure they're correct

### Issue: "RLS policy violation"
**Solution**: Verify your user is authenticated and has proper permissions

### Issue: "Function not found"
**Solution**: Ensure you ran the complete `database_setup.sql` script

### Issue: "Authentication not working"
**Solution**: Check Supabase auth settings and redirect URLs

## Performance Optimization

### Database Indexes
The setup script creates indexes for:
- Full-text search on articles
- Foreign key relationships
- Frequently queried fields
- Date-based queries

### Query Optimization
- Use the provided views for common queries
- Leverage the search functions for text search
- Use pagination for large result sets

## Monitoring and Analytics

1. **Database Performance**: Monitor query performance in Supabase dashboard
2. **Authentication**: Track user signups and logins
3. **Storage Usage**: Monitor file uploads and storage costs
4. **API Usage**: Track API calls and rate limits

## Backup and Recovery

1. **Automatic Backups**: Supabase provides daily backups
2. **Manual Backups**: Use the SQL editor to export data
3. **Point-in-time Recovery**: Available on paid plans

## Scaling Considerations

- **Free Tier Limits**: 500MB database, 2GB bandwidth
- **Pro Plan**: 8GB database, 250GB bandwidth
- **Enterprise**: Custom limits and features

## Security Best Practices

1. **Never expose service role key** in client-side code
2. **Use RLS policies** to control data access
3. **Validate input** on both client and server
4. **Regular security audits** of your policies
5. **Monitor for suspicious activity**

## Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Next Steps

After completing this setup:

1. **Customize the database schema** if needed
2. **Set up additional authentication providers** (Google, GitHub, etc.)
3. **Configure email templates** for better user experience
4. **Set up monitoring and alerts**
5. **Plan your deployment strategy**

---

Your Supabase setup is now complete! You can start building your GlobalEye News application with a robust, scalable backend. 