# 📤 Instructions for Uploading Data to Supabase Database

## 🚀 Quick Start

### 1. Create `.env.local` file
Create a file named `.env.local` in your project root with your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2. Dependencies are already installed! ✅
The required dependencies are already installed in the main project:
- `@supabase/supabase-js` - For database connection
- `ts-node` - For running TypeScript directly
- `typescript` - For TypeScript support

### 3. Run the upload script
```bash
pnpm run upload-data
```

## 📋 What the Script Does

1. **Creates default AI writer profile** in the `profiles` table
2. **Uploads all categories** from `src/data/categories.json`
3. **Uploads all articles** from `src/data/articles.json`
4. **Transforms data** to match the database schema
5. **Handles conflicts** with upsert operations

## 🔧 Manual Database Setup (if needed)

If you haven't set up the database tables yet, run the SQL script first:

```bash
# In your Supabase SQL editor, run:
# complete_database_setup.sql
```

## 📊 Data Flow

### Before Upload:
- Articles stored in `src/data/articles.json` (local files)
- Categories stored in `src/data/categories.json` (local files)
- System reads from local files

### After Upload:
- Articles stored in Supabase `articles` table
- Categories stored in Supabase `categories` table
- System reads from database with local fallback

## 🎯 Benefits

- **Persistent storage** - Data survives server restarts
- **Better performance** - Database queries are faster
- **Scalability** - Can handle more data and users
- **Backup** - Data is automatically backed up by Supabase
- **Real-time updates** - Can implement real-time features

## 🚨 Troubleshooting

### "Missing Supabase environment variables"
- Check that `.env.local` exists and has correct values
- Restart your terminal after creating the file

### "Failed to connect to Supabase"
- Verify your `SUPABASE_URL` is correct
- Check that your project is active
- Ensure your `SUPABASE_SERVICE_ROLE_KEY` is valid

### "Table doesn't exist"
- Run the `complete_database_setup.sql` script first
- Check that all tables were created successfully

## 🔄 After Upload

Once data is uploaded:

1. **Restart your development server** (`pnpm run dev`)
2. **Visit your site** - Articles should now load from database
3. **Check Supabase dashboard** - Verify data appears in tables
4. **Test all pages** - Ensure everything works correctly

## 📝 Notes

- The script uses `upsert` operations, so it's safe to run multiple times
- If an article already exists, it will be updated with new data
- The system automatically falls back to local files if database is unavailable
- All articles are marked as "published" status
- Default AI writer profile is created with ID: `00000000-0000-0000-0000-000000000001`

## 🐙 PNPM Commands

Since you're using pnpm, here are the specific commands:

```bash
# Run upload script (from project root)
pnpm run upload-data

# Alternative: Run with ts-node directly
npx ts-node scripts/upload-data.ts

# Build and run (if you want to compile first)
pnpm run build
node scripts/upload-data.js
```

## 🔧 Environment Setup

Make sure your `.env.local` file contains:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:** The `SUPABASE_SERVICE_ROLE_KEY` is required for admin operations like creating profiles and uploading data.
