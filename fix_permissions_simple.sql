-- ========================================
-- SIMPLE PERMISSIONS FIX
-- ========================================
-- This is a simplified version if the main script has issues
-- Run this in your Supabase SQL Editor

-- Grant basic permissions to service_role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Set default permissions for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO service_role;

-- Test permissions
DO $$
BEGIN
    RAISE NOTICE '🎉 Simple permissions fix completed!';
    RAISE NOTICE '📝 Next: Run pnpm run test-db';
END $$;
