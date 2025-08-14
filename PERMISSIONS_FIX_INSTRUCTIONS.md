# 🔐 Fix Database Permissions - Instructions

## 🚨 Problem
The `service_role` key cannot write to database tables due to insufficient permissions.

## ✅ Solution
Run the `fix_permissions.sql` script in Supabase SQL Editor.

## 📋 Step-by-Step Instructions

### 1. Open Supabase Dashboard
- Go to [supabase.com](https://supabase.com)
- Sign in to your account
- Select your project

### 2. Open SQL Editor
- Click on **SQL Editor** in the left sidebar
- Click **New Query**

### 3. Copy and Paste the Script
- Copy the entire content of `fix_permissions.sql`
- Paste it into the SQL Editor

### 4. Run the Script
- Click **Run** button
- Wait for the script to complete
- Look for success messages

### 5. Verify Permissions
- Check the output for any error messages
- Look for the completion message: "🎉 Permission fix completed!"

## 🔍 What the Script Does

### Step 1: Schema Permissions
- Grants `service_role` access to the `public` schema

### Step 2: Table Permissions
- Grants INSERT, UPDATE, DELETE, SELECT on all tables
- Covers: profiles, categories, articles, tags, etc.

### Step 3: Sequence Permissions
- Grants access to auto-increment sequences

### Step 4: Function Permissions
- Grants execute permissions on custom functions

### Step 5: View Permissions
- Grants select permissions on views

### Step 6: Storage Permissions
- Grants access to file storage

### Step 7: Default Permissions
- Sets permissions for future objects

### Step 8: Verification
- Shows what permissions `service_role` has

### Step 9: Test
- Tests insert permission with a sample profile

## 🚀 After Running the Script

### 1. Test Database Connection
```bash
pnpm run test-db
```
**Expected Result:** ✅ Connection successful!

### 2. Upload Data
```bash
pnpm run upload-data
```
**Expected Result:** ✅ All data uploaded successfully!

### 3. Verify in Supabase
- Go to **Table Editor**
- Check that data appears in tables
- Verify categories and articles are loaded

## 🚨 Troubleshooting

### If you get errors:
1. **Check that you're in the right project**
2. **Ensure you have admin access**
3. **Try running the script in smaller parts**

### Common Errors:
- **"role does not exist"** - Check your project settings
- **"permission denied"** - You may need admin access
- **"table does not exist"** - Run `complete_database_setup.sql` first

## 📝 Notes

- **This script is safe** - it only grants permissions
- **It doesn't modify data** - only changes access rights
- **Run it once** - permissions will persist
- **If you get errors**, check the error messages for guidance

## 🔒 Security Note

The `service_role` key has full access to your database. This is normal for server-side operations, but keep it secure and never expose it in client-side code.

## 🎯 Success Indicators

After running the script, you should see:
- ✅ No error messages
- ✅ "Permission fix completed!" message
- ✅ `pnpm run test-db` succeeds
- ✅ `pnpm run upload-data` succeeds
- ✅ Data appears in your Supabase tables
