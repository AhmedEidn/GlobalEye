-- ========================================
-- COMPLETE DATABASE SETUP FOR GLOBALEYE NEWS
-- ========================================
-- This file contains all SQL commands needed to set up the complete database
-- Run this in Supabase SQL Editor to recreate all tables and data

-- ========================================
-- STEP 1: ENABLE REQUIRED EXTENSIONS
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_trgm for text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enable unaccent for better search
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ========================================
-- STEP 2: CREATE PROFILES TABLE (USERS)
-- ========================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    website TEXT,
    location VARCHAR(100),
    date_of_birth DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at);

-- ========================================
-- STEP 3: CREATE CATEGORIES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50),
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for categories
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories(is_active);

-- ========================================
-- STEP 4: CREATE ARTICLES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER,
    word_count INTEGER,
    meta_title VARCHAR(200),
    meta_description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    seo_score INTEGER DEFAULT 85,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for articles
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON public.articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_is_pinned ON public.articles(is_pinned);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_articles_search ON public.articles USING GIN (
    to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || content)
);

-- ========================================
-- STEP 5: CREATE TAGS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#6B7280',
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for tags
CREATE INDEX IF NOT EXISTS idx_tags_slug ON public.tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_usage_count ON public.tags(usage_count);

-- ========================================
-- STEP 6: CREATE ARTICLE_TAGS JUNCTION TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.article_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, tag_id)
);

-- Create indexes for article_tags
CREATE INDEX IF NOT EXISTS idx_article_tags_article_id ON public.article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_tag_id ON public.article_tags(tag_id);

-- ========================================
-- STEP 7: CREATE COMMENTS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    is_approved BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for comments
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_is_approved ON public.comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at);

-- ========================================
-- STEP 8: CREATE FAVORITES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- Create indexes for favorites
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_article_id ON public.favorites(article_id);
CREATE INDEX IF NOT EXISTS idx_favorites_created_at ON public.favorites(created_at);

-- ========================================
-- STEP 9: CREATE LIKES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- Create indexes for likes
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON public.likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_article_id ON public.likes(article_id);
CREATE INDEX IF NOT EXISTS idx_likes_created_at ON public.likes(created_at);

-- ========================================
-- STEP 10: CREATE VIEWS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for views
CREATE INDEX IF NOT EXISTS idx_views_article_id ON public.views(article_id);
CREATE INDEX IF NOT EXISTS idx_views_user_id ON public.views(user_id);
CREATE INDEX IF NOT EXISTS idx_views_created_at ON public.views(created_at);
CREATE INDEX IF NOT EXISTS idx_views_ip_address ON public.views(ip_address);

-- ========================================
-- STEP 11: CREATE SETTINGS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for settings
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_is_public ON public.settings(is_public);

-- ========================================
-- STEP 12: CREATE NOTIFICATIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('success', 'error', 'warning', 'info')),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- ========================================
-- STEP 13: CREATE SUBSCRIPTIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, category_id)
);

-- Create indexes for subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_category_id ON public.subscriptions(category_id);

-- ========================================
-- STEP 14: CREATE ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ========================================
-- STEP 15: CREATE RLS POLICIES
-- ========================================

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Articles policies
CREATE POLICY "Published articles are viewable by everyone" ON public.articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can view own articles" ON public.articles
    FOR SELECT USING (author_id = auth.uid());

CREATE POLICY "Authors can modify own articles" ON public.articles
    FOR ALL USING (author_id = auth.uid());

CREATE POLICY "Admins can modify all articles" ON public.articles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Comments policies
CREATE POLICY "Approved comments are viewable by everyone" ON public.comments
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can view own comments" ON public.comments
    FOR SELECT USING (author_id = auth.uid());

CREATE POLICY "Users can insert own comments" ON public.comments
    FOR INSERT WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own comments" ON public.comments
    FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Admins can moderate all comments" ON public.comments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON public.favorites
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own favorites" ON public.favorites
    FOR ALL USING (user_id = auth.uid());

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON public.likes
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own likes" ON public.likes
    FOR ALL USING (user_id = auth.uid());

-- Views policies
CREATE POLICY "Views are viewable by everyone" ON public.views
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert views" ON public.views
    FOR INSERT WITH CHECK (true);

-- Settings policies
CREATE POLICY "Public settings are viewable by everyone" ON public.settings
    FOR SELECT USING (is_public = true);

CREATE POLICY "Only admins can modify settings" ON public.settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own subscriptions" ON public.subscriptions
    FOR ALL USING (user_id = auth.uid());

-- ========================================
-- STEP 16: CREATE FUNCTIONS AND TRIGGERS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update word count and reading time
CREATE OR REPLACE FUNCTION update_article_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate word count
    NEW.word_count = array_length(regexp_split_to_array(NEW.content, '\s+'), 1);
    
    -- Calculate reading time (average 200 words per minute)
    NEW.reading_time = GREATEST(1, CEIL(NEW.word_count::numeric / 200));
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.tags 
        SET usage_count = usage_count + 1 
        WHERE id = NEW.tag_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.tags 
        SET usage_count = GREATEST(0, usage_count - 1) 
        WHERE id = OLD.tag_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Function to update article stats when likes/favorites change
CREATE OR REPLACE FUNCTION update_article_stats_from_interactions()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Update like count
        IF TG_TABLE_NAME = 'likes' THEN
            UPDATE public.articles 
            SET seo_score = seo_score + 1 
            WHERE id = NEW.article_id;
        END IF;
        
        -- Update favorite count
        IF TG_TABLE_NAME = 'favorites' THEN
            UPDATE public.articles 
            SET seo_score = seo_score + 2 
            WHERE id = NEW.article_id;
        END IF;
        
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Update like count
        IF TG_TABLE_NAME = 'likes' THEN
            UPDATE public.articles 
            SET seo_score = GREATEST(0, seo_score - 1) 
            WHERE id = OLD.article_id;
        END IF;
        
        -- Update favorite count
        IF TG_TABLE_NAME = 'favorites' THEN
            UPDATE public.articles 
            SET seo_score = GREATEST(0, seo_score - 2) 
            WHERE id = OLD.article_id;
        END IF;
        
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_stats BEFORE INSERT OR UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION update_article_stats();

CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON public.tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_article_tags_usage_count AFTER INSERT OR DELETE ON public.article_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_article_stats_from_likes AFTER INSERT OR DELETE ON public.likes
    FOR EACH ROW EXECUTE FUNCTION update_article_stats_from_interactions();

CREATE TRIGGER update_article_stats_from_favorites AFTER INSERT OR DELETE ON public.favorites
    FOR EACH ROW EXECUTE FUNCTION update_article_stats_from_interactions();

-- ========================================
-- STEP 17: INSERT DEFAULT DATA
-- ========================================

-- Insert default admin user
INSERT INTO public.profiles (id, username, full_name, role, is_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', 'GlobalEye Admin', 'admin', true)
ON CONFLICT (username) DO NOTHING;

-- Insert default categories
INSERT INTO public.categories (id, name, slug, description, color, icon, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Technology', 'technology', 'Latest developments in technology, AI, and innovation', '#3B82F6', 'computer', 1),
('22222222-2222-2222-2222-222222222222', 'World', 'world', 'Global news, politics, and international affairs', '#10B981', 'globe', 2),
('33333333-3333-3333-3333-333333333333', 'Business', 'business', 'Business news, economy, and financial markets', '#8B5CF6', 'briefcase', 3),
('44444444-4444-4444-4444-444444444444', 'Science', 'science', 'Scientific discoveries and research breakthroughs', '#F59E0B', 'flask', 4),
('55555555-5555-5555-5555-555555555555', 'Health', 'health', 'Health news, medical research, and wellness', '#EF4444', 'heart', 5),
('66666666-6666-6666-6666-666666666666', 'Entertainment', 'entertainment', 'Movies, music, TV, and celebrity news', '#EC4899', 'film', 6),
('77777777-7777-7777-7777-777777777777', 'Lifestyle', 'lifestyle', 'Travel, food, culture, and everyday living', '#F59E0B', 'home', 7),
('88888888-8888-8888-8888-888888888888', 'Celebrities', 'celebrities', 'Celebrity news, interviews, and pop culture', '#EC4899', 'star', 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert default settings
INSERT INTO public.settings (key, value, description, is_public) VALUES
('site_name', 'GlobalEye News', 'Website name', true),
('site_description', 'Latest Breaking News and Updates', 'Website description', true),
('site_url', 'https://globaleye.news', 'Website URL', true),
('enable_comments', 'true', 'Enable article comments', true),
('enable_likes', 'true', 'Enable article likes', true),
('enable_favorites', 'true', 'Enable article favorites', true),
('enable_registration', 'true', 'Enable user registration', true),
('require_email_confirmation', 'false', 'Require email confirmation for registration', true),
('default_article_status', 'draft', 'Default status for new articles', false),
('max_articles_per_page', '12', 'Maximum articles per page', true),
('enable_search', 'true', 'Enable site search', true),
('enable_rss', 'true', 'Enable RSS feeds', true),
('enable_sitemap', 'true', 'Enable XML sitemap', true)
ON CONFLICT (key) DO NOTHING;

-- Insert default tags
INSERT INTO public.tags (name, slug, description, color) VALUES
('Artificial Intelligence', 'artificial-intelligence', 'AI and machine learning topics', '#3B82F6'),
('Climate Change', 'climate-change', 'Environmental and climate topics', '#10B981'),
('Innovation', 'innovation', 'Innovation and creativity topics', '#8B5CF6'),
('Sustainability', 'sustainability', 'Sustainable development topics', '#059669'),
('Digital Transformation', 'digital-transformation', 'Digital technology transformation', '#7C3AED'),
('Global Economy', 'global-economy', 'World economic topics', '#DC2626'),
('Space Exploration', 'space-exploration', 'Space and astronomy topics', '#1E40AF'),
('Mental Health', 'mental-health', 'Mental health and wellness', '#EC4899')
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- STEP 18: CREATE VIEWS FOR COMMON QUERIES
-- ========================================

-- View for articles with all related data
CREATE OR REPLACE VIEW public.articles_with_stats AS
SELECT 
    a.*,
    c.name as category_name,
    c.slug as category_slug,
    c.color as category_color,
    p.full_name as author_name,
    p.username as author_username,
    COALESCE(comment_counts.comment_count, 0) as comment_count,
    COALESCE(like_counts.like_count, 0) as like_count,
    COALESCE(view_counts.view_count, 0) as view_count,
    COALESCE(favorite_counts.favorite_count, 0) as favorite_count
FROM public.articles a
LEFT JOIN public.categories c ON a.category_id = c.id
LEFT JOIN public.profiles p ON a.author_id = p.id
LEFT JOIN (
    SELECT article_id, COUNT(*) as comment_count
    FROM public.comments
    WHERE is_approved = true
    GROUP BY article_id
) comment_counts ON a.id = comment_counts.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as like_count
    FROM public.likes
    GROUP BY article_id
) like_counts ON a.id = like_counts.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as view_count
    FROM public.views
    GROUP BY article_id
) view_counts ON a.id = view_counts.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as favorite_count
    FROM public.favorites
    GROUP BY article_id
) favorite_counts ON a.id = favorite_counts.article_id;

-- View for popular articles
CREATE OR REPLACE VIEW public.popular_articles AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.featured_image_url,
    a.published_at,
    c.name as category_name,
    c.slug as category_slug,
    c.color as category_color,
    p.full_name as author_name,
    p.username as author_username,
    COALESCE(v.view_count, 0) as view_count,
    COALESCE(l.like_count, 0) as like_count,
    COALESCE(cm.comment_count, 0) as comment_count,
    (COALESCE(v.view_count, 0) * 1 + COALESCE(l.like_count, 0) * 3 + COALESCE(cm.comment_count, 0) * 2) as popularity_score
FROM public.articles a
LEFT JOIN public.categories c ON a.category_id = c.id
LEFT JOIN public.profiles p ON a.author_id = p.id
LEFT JOIN (
    SELECT article_id, COUNT(*) as view_count
    FROM public.views
    GROUP BY article_id
) v ON a.id = v.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as like_count
    FROM public.likes
    GROUP BY article_id
) l ON a.id = l.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as comment_count
    FROM public.comments
    WHERE is_approved = true
    GROUP BY article_id
) cm ON a.id = cm.article_id
WHERE a.status = 'published'
ORDER BY popularity_score DESC;

-- View for categories with article counts
CREATE OR REPLACE VIEW public.categories_with_counts AS
SELECT 
    c.*,
    COALESCE(article_counts.article_count, 0) as article_count
FROM public.categories c
LEFT JOIN (
    SELECT category_id, COUNT(*) as article_count
    FROM public.articles
    WHERE status = 'published'
    GROUP BY category_id
) article_counts ON c.id = article_counts.category_id
WHERE c.is_active = true
ORDER BY c.sort_order, c.name;

-- ========================================
-- STEP 19: GRANT PERMISSIONS
-- ========================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT INSERT, DELETE ON public.favorites TO authenticated;
GRANT INSERT, DELETE ON public.likes TO authenticated;
GRANT INSERT ON public.views TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.subscriptions TO authenticated;
GRANT INSERT, UPDATE ON public.notifications TO authenticated;

-- Grant permissions to anon users (for public data)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.articles TO anon;
GRANT SELECT ON public.tags TO anon;
GRANT SELECT ON public.article_tags TO anon;
GRANT SELECT ON public.comments TO anon;
GRANT SELECT ON public.likes TO anon;
GRANT SELECT ON public.views TO anon;
GRANT SELECT ON public.settings TO anon;
GRANT SELECT ON public.articles_with_stats TO anon;
GRANT SELECT ON public.popular_articles TO anon;
GRANT SELECT ON public.categories_with_counts TO anon;

-- Grant permissions to service role (for AI writer)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ========================================
-- STEP 20: CREATE STORAGE BUCKETS
-- ========================================

-- Create storage buckets for images and files
INSERT INTO storage.buckets (id, name, public) VALUES
('article-images', 'article-images', true),
('user-avatars', 'user-avatars', true),
('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies (only if they don't exist)
DO $$
BEGIN
    -- Article images policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access Article Images') THEN
        CREATE POLICY "Public Access Article Images" ON storage.objects FOR SELECT USING (bucket_id = 'article-images');
    END IF;
    
    -- Site assets policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public Access Site Assets') THEN
        CREATE POLICY "Public Access Site Assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
    END IF;
    
    -- User avatars upload policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload avatars') THEN
        CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.role() = 'authenticated');
    END IF;
    
    -- User avatars update policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Users can update own avatars') THEN
        CREATE POLICY "Users can update own avatars" ON storage.objects FOR UPDATE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;
    
    -- User avatars delete policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Users can delete own avatars') THEN
        CREATE POLICY "Users can delete own avatars" ON storage.objects FOR DELETE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;
END $$;

-- ========================================
-- COMPLETION MESSAGE
-- ========================================

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE '✅ Database setup completed successfully!';
    RAISE NOTICE '📊 Tables created: profiles, categories, articles, tags, comments, favorites, likes, views, settings, notifications, subscriptions';
    RAISE NOTICE '🔒 Row Level Security (RLS) enabled on all tables';
    RAISE NOTICE '📈 Views created: articles_with_stats, popular_articles, categories_with_counts';
    RAISE NOTICE '🖼️ Storage buckets created: article-images, user-avatars, site-assets';
    RAISE NOTICE '👤 Default admin user created with username: admin';
    RAISE NOTICE '📂 Default categories and settings inserted';
    RAISE NOTICE '🚀 Your GlobalEye News database is ready to use!';
END $$;
