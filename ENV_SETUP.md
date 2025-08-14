# 🔧 Environment Variables Setup

## 📋 Quick Setup

This project uses **`.env.local`** only. Do not create a `.env` file.

### 1. Create `.env.local` file

Create a file named `.env.local` in your project root directory.

### 2. Add your environment variables

```env
# Supabase Configuration (Required)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI Writer Configuration (Required)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
PEXELS_API_KEY=your_pexels_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Site Configuration (Optional)
SITE_URL=https://globaleye.live

# AI Writer Mode (Optional)
AI_WRITER_MODE=cron
```

### 3. Get your API keys

#### Ollama (Local AI)
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Download the required model: `ollama pull qwen2.5:0.5b`
3. Start Ollama service: `ollama serve`
4. Ensure Ollama is running on `http://localhost:11434`

#### Pexels API (Free)
1. Go to [pexels.com/api](https://pexels.com/api)
2. Sign up for free account
3. Get your API key

#### Unsplash API (Free)
1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Create free application
3. Get your Access Key

#### Supabase (Free tier available)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get your project URL and keys from Settings → API

## ⚠️ Important Notes

- **Never commit `.env.local`** to version control
- **Only use `.env.local`** - do not create `.env`
- **Restart your development server** after changing environment variables
- **Check file permissions** - ensure `.env.local` is readable by your application

## 🔍 Troubleshooting

### "Environment variable not found"
- Check that `.env.local` exists in project root
- Verify variable names match exactly (case-sensitive)
- Restart your development server

### "API key invalid"
- Verify your API keys are correct
- Check if you've exceeded free tier limits
- Ensure no extra spaces or characters in the values

## 📚 Related Files

- `README.md` - Main project documentation
- `SUPABASE_SETUP.md` - Supabase configuration guide
- `OLLAMA_SETUP.md` - Ollama AI setup guide
- `SUPABASE_STORAGE_SETUP.md` - Image storage setup guide
- `storage_setup.sql` - SQL commands for storage setup
- `STORAGE_TEST.md` - Quick storage testing guide
- `CONTENT_QUALITY_SYSTEM.md` - Content quality & anti-duplication system
- `content_quality_setup.sql` - SQL commands for quality system
- `QUALITY_TEST.md` - Quick quality system testing guide
- `DEPLOYMENT.md` - Deployment instructions
