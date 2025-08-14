# 🚀 Google OAuth Setup Guide for GlobalEye News

## 📋 Overview

This guide will help you set up Google OAuth authentication for your GlobalEye News application using NextAuth.js and Supabase.

## 🔧 Prerequisites

- ✅ Next.js project with TypeScript
- ✅ Supabase project set up
- ✅ Google Cloud Console account
- ✅ Environment variables configured

## 🎯 Step 1: Google Cloud Console Setup

### 1.1 Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `GlobalEye News`
4. Click "Create"

### 1.2 Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click "Enable"

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set application name: `GlobalEye News`
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (Development)
   - `https://yourdomain.com/api/auth/callback/google` (Production)
6. Click "Create"
7. **Save the Client ID and Client Secret**

## 🔑 Step 2: Environment Variables

### 2.1 Update `.env.local`
Add these variables to your `.env.local` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=9f6eee167525fed090a78fd565c75567d37fe116e8712701139f47e721d4fcd0
NEXTAUTH_URL=https://yourdomain.com

# Supabase Configuration (Already configured)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2.2 Generate NEXTAUTH_SECRET (Optional)
If you want a new secret, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🗄️ Step 3: Database Setup

### 3.1 Run Database Migration
The system will automatically create the required tables when you first sign in with Google.

### 3.2 Verify Tables
Check that these tables exist in your Supabase project:
- `users` (created by NextAuth)
- `accounts` (created by NextAuth)
- `sessions` (created by NextAuth)
- `verification_tokens` (created by NextAuth)

## 🚀 Step 4: Testing the Setup

### 4.1 Start Development Server
```bash
pnpm run dev
```

### 4.2 Test Authentication
1. Go to `http://localhost:3000/login`
2. Click "Sign in with Google"
3. Complete Google OAuth flow
4. Verify you're redirected back to the app
5. Check that user data is saved in Supabase

## 🔍 Step 5: Troubleshooting

### 5.1 Common Issues

#### "Invalid redirect URI"
- Check that your redirect URI in Google Cloud Console matches exactly
- Include both development and production URLs
- Ensure no trailing slashes

#### "OAuth client not found"
- Verify `GOOGLE_CLIENT_ID` is correct
- Check that the OAuth client is enabled
- Ensure you're using the correct project

#### "NextAuth secret not set"
- Verify `NEXTAUTH_SECRET` is set in `.env.local`
- Restart your development server after changes

### 5.2 Debug Mode
Enable debug logging by adding to `.env.local`:
```env
NEXTAUTH_DEBUG=true
```

## 📱 Step 6: Customization

### 6.1 Custom User Profile
The system automatically saves:
- Google profile picture
- Email address
- Full name
- Google account ID

### 6.2 Additional User Data
You can extend the user profile by modifying the database schema and NextAuth callbacks.

## 🚀 Step 7: Production Deployment

### 7.1 Update Redirect URIs
1. Go to Google Cloud Console
2. Update OAuth 2.0 credentials
3. Add your production domain
4. Remove localhost URLs

### 7.2 Environment Variables
Ensure all environment variables are set in your production environment:
- Vercel: Use Environment Variables in project settings
- Netlify: Use Environment Variables in site settings
- Docker: Use `.env` file or environment variables

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Documentation](https://supabase.com/docs)

## 🎉 Success!

Once completed, your users will be able to:
- Sign in with their Google account
- Have their profile automatically created
- Access protected routes
- Maintain secure sessions

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Regularly rotate OAuth credentials
- Monitor OAuth usage in Google Cloud Console
- Implement rate limiting for production use

---

**Need help?** Check the troubleshooting section or create an issue in the project repository.
