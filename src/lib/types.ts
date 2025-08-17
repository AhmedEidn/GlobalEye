// Custom project types for GlobalEye News

// Base types for database tables
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  category_id: string | null;
  published_at: string | null;
  reading_time: number | null;
  word_count: number | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  is_pinned: boolean;
  allow_comments: boolean;
  seo_score: number;
  created_at: string;
  updated_at: string;
}

export interface ArticleInsert {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featured_image_url?: string | null;
  status?: 'draft' | 'published' | 'archived';
  author_id: string;
  category_id?: string | null;
  published_at?: string | null;
  reading_time?: number | null;
  word_count?: number | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_featured?: boolean;
  is_pinned?: boolean;
  allow_comments?: boolean;
  seo_score?: number;
}

export interface ArticleUpdate {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  featured_image_url?: string | null;
  status?: 'draft' | 'published' | 'archived';
  category_id?: string | null;
  published_at?: string | null;
  reading_time?: number | null;
  word_count?: number | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_featured?: boolean;
  is_pinned?: boolean;
  allow_comments?: boolean;
  seo_score?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  icon: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryInsert {
  name: string;
  slug: string;
  description?: string | null;
  color?: string;
  icon?: string | null;
  parent_id?: string | null;
  sort_order?: number;
  is_active?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface CategoryUpdate {
  name?: string;
  slug?: string;
  description?: string | null;
  color?: string;
  icon?: string | null;
  parent_id?: string | null;
  sort_order?: number;
  is_active?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  date_of_birth: string | null;
  is_verified: boolean;
  role: 'user' | 'moderator' | 'admin';
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert {
  username: string;
  full_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  date_of_birth?: string | null;
  is_verified?: boolean;
  role?: 'user' | 'moderator' | 'admin';
  preferences?: Record<string, any>;
}

export interface ProfileUpdate {
  username?: string;
  full_name?: string;
  avatar_url?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  date_of_birth?: string | null;
  is_verified?: boolean;
  role?: 'user' | 'moderator' | 'admin';
  preferences?: Record<string, any>;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface TagInsert {
  name: string;
  slug: string;
  description?: string | null;
  color?: string;
  usage_count?: number;
}

export interface TagUpdate {
  name?: string;
  slug?: string;
  description?: string | null;
  color?: string;
  usage_count?: number;
}

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  article_id: string;
  parent_id: string | null;
  is_approved: boolean;
  is_flagged: boolean;
  flag_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommentInsert {
  content: string;
  author_id: string;
  article_id: string;
  parent_id?: string | null;
  is_approved?: boolean;
  is_flagged?: boolean;
  flag_reason?: string | null;
}

export interface CommentUpdate {
  content?: string;
  is_approved?: boolean;
  is_flagged?: boolean;
  flag_reason?: string | null;
}

export interface Favorite {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
}

export interface FavoriteInsert {
  user_id: string;
  article_id: string;
}

export interface Like {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
}

export interface LikeInsert {
  user_id: string;
  article_id: string;
}

export interface View {
  id: string;
  article_id: string;
  user_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  session_id: string | null;
  created_at: string;
}

export interface ViewInsert {
  article_id: string;
  user_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  referrer?: string | null;
  session_id?: string | null;
}

export interface Setting {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SettingInsert {
  key: string;
  value?: string | null;
  description?: string | null;
  is_public?: boolean;
}

export interface SettingUpdate {
  value?: string | null;
  description?: string | null;
  is_public?: boolean;
}

// Custom project types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image_url: string | null;
  category_name: string;
  author_name: string;
  published_at: string | null;
  similarity: number;
}

export interface PopularArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image_url: string | null;
  category_name: string;
  author_name: string;
  view_count: number;
  like_count: number;
  comment_count: number;
}

export interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image_url: string | null;
  category_name: string;
  similarity_score: number;
}

export interface ArticleWithStats extends Article {
  category_name: string;
  category_slug: string;
  category_color: string;
  author_name: string;
  author_username: string;
  comment_count: number;
  like_count: number;
  view_count: number;
  favorite_count: number;
}

export interface CommentWithProfile extends Comment {
  profiles: {
    full_name: string;
    username: string;
    avatar_url: string | null;
  };
}

export interface CategoryWithCount extends Category {
  article_count: number;
}

export interface CategoryWithArticleCount extends Category {
  article_count: number;
}

export interface UserStats {
  total_articles: number;
  total_likes: number;
  total_comments: number;
  total_favorites: number;
  total_views: number;
}

// Types for filtering and sorting
export interface ArticleFilters {
  category_id?: string;
  author_id?: string;
  status?: 'draft' | 'published' | 'archived';
  tags?: string[];
  search?: string;
}

export interface ArticleSort {
  field: 'created_at' | 'published_at' | 'title' | 'view_count' | 'like_count';
  direction: 'asc' | 'desc';
}

// Types for queries
export interface ArticleQuery {
  filters?: ArticleFilters;
  sort?: ArticleSort;
  page?: number;
  limit?: number;
}

// Types for responses
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Types for authentication
export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  full_name: string;
  username: string;
}

// Types for notifications
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// Types for settings
export interface SiteSettings {
  site_name: string;
  site_description: string;
  logo_url?: string;
  favicon_url?: string;
  primary_color: string;
  secondary_color: string;
  enable_comments: boolean;
  enable_likes: boolean;
  enable_favorites: boolean;
  enable_registration: boolean;
  require_email_confirmation: boolean;
}
