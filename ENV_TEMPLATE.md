# 🔧 Environment Variables Template

## 📝 Create `.env.local` file

Create a file named `.env.local` in your project root with the following content:

```env
# Supabase Configuration (Required)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI Writer Configuration (Optional)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
PEXELS_API_KEY=your_pexels_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Site Configuration (Optional)
SITE_URL=https://globaleye.live

# NextAuth Configuration (Required for Google OAuth)
NEXTAUTH_SECRET=9f6eee167525fed090a78fd565c75567d37fe116e8712701139f47e721d4fcd0
NEXTAUTH_URL=https://globaleye.live

# Google OAuth Configuration (Required)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Google Analytics Configuration (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🔑 How to Get Your Supabase Keys

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign in to your account**
3. **Select your project**
4. **Go to Settings → API**
5. **Copy the following values:**
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## 📊 How to Get Your Google Analytics Key

1. **Go to [analytics.google.com](https://analytics.google.com)**
2. **Sign in to your Google account**
3. **Create a new property** or select existing one
4. **Go to Admin → Data Streams → Web**
5. **Copy the Measurement ID** (starts with G-)
6. **Add it to your `.env.local`** as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## ⚠️ Important Notes

- **Never commit `.env.local`** to version control
- **Only use `.env.local`** - do not create `.env`
- **Restart your development server** after changing environment variables
- **The `SUPABASE_SERVICE_ROLE_KEY` is required** for the upload script to work

## 🚀 After Creating `.env.local`

Once you have your `.env.local` file set up:

1. **Run the upload script:**
   ```bash
   pnpm run upload-data
   ```

2. **Check the output** for success messages

3. **Restart your development server:**
   ```bash
   pnpm run dev
   ```

4. **Visit your site** - Articles should now load from the database!

## 📊 Google Analytics Setup

After adding your GA Measurement ID:

1. **Restart your development server**
2. **Visit your site** - Analytics will start tracking automatically
3. **Check Google Analytics** - You should see real-time data
4. **Custom events** are automatically tracked:
   - Article views
   - Category views
   - Search queries
   - User engagement
