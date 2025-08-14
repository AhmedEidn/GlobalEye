# 🔑 Environment Variables Template for Advanced Article Generation

## 📁 Create `.env.local` file

Create a file named `.env.local` in your project root with the following content:

```bash
# ========================================
# SUPABASE CONFIGURATION
# ========================================
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# ========================================
# IMAGE API KEYS
# ========================================
PEXELS_API_KEY=your-pexels-api-key-here
UNSPLASH_ACCESS_KEY=your-unsplash-access-key-here

# ========================================
# SITE CONFIGURATION
# ========================================
SITE_URL=https://globaleye.live
NEXT_PUBLIC_SITE_URL=https://globaleye.live

# ========================================
# OLLAMA CONFIGURATION (Optional)
# ========================================
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b

# ========================================
# ADDITIONAL API KEYS (Optional)
# ========================================
OPENAI_API_KEY=your-openai-key-here
```

## 🔑 How to Get API Keys

### **1. Supabase Keys**
1. Go to [supabase.com](https://supabase.com)
2. Sign in and select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### **2. Pexels API Key**
1. Go to [pexels.com/api](https://pexels.com/api)
2. Sign up for free account
3. Get your API key
4. Add to `PEXELS_API_KEY`

### **3. Unsplash Access Key**
1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Create developer account
3. Create new application
4. Get your Access Key
5. Add to `UNSPLASH_ACCESS_KEY`



## ⚠️ Important Notes

### **Security**
- **Never commit** `.env.local` to git
- **Keep API keys private** and secure
- **Rotate keys regularly** for security
- **Use service role key** only for server-side operations

### **File Location**
- Place `.env.local` in **project root** (same level as `package.json`)
- **Don't rename** the file
- **Restart your terminal** after creating the file

### **Required vs Optional**
- **Required:** Supabase keys, Image API keys
- **Optional:** OpenAI (for additional features)

## 🧪 Test Your Setup

After creating `.env.local`, test with:

```bash
# Test environment variables
pnpm run debug-env

# Test database connection
pnpm run test-db

# Test article generation
pnpm run generate-tech
```

## 🔧 Troubleshooting

### **Missing Environment Variables**
```bash
❌ Missing Supabase environment variables!
```
**Solution:** Check `.env.local` file exists and has correct values

### **Invalid API Keys**
```bash
❌ Pexels API error
❌ Unsplash API error
```
**Solution:** Verify API keys are correct and active

### **Database Connection Issues**
```bash
❌ Connection test failed
```
**Solution:** Check Supabase URL and service role key

## 📋 Complete Example

Here's a complete `.env.local` example (replace with your actual keys):

```bash
# Supabase
SUPABASE_URL=https://tcumaownqewfssuybssf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Image APIs
PEXELS_API_KEY=1234567890abcdef1234567890abcdef
UNSPLASH_ACCESS_KEY=abcdef1234567890abcdef1234567890

# Site
SITE_URL=https://globaleye.live
NEXT_PUBLIC_SITE_URL=https://globaleye.live

# Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

## 🚀 Next Steps

1. **Create `.env.local`** with your actual API keys
2. **Test the setup** with `pnpm run debug-env`
3. **Generate your first article** with `pnpm run generate-tech`
4. **Check the results** in your database and local files

---

## 🎯 **Ready to Generate Human-Like Articles?**

Once your `.env.local` is set up, you can start generating articles that are **impossible to detect** as AI-generated!
