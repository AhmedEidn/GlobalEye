import { format, parseISO } from 'date-fns';
import { supabaseAdmin } from './supabase';
import type { Article, Category } from './types';

// Use admin client for data access
const supabase = supabaseAdmin;

// Data loading functions
export async function getArticles(): Promise<Article[]> {
  try {
    // Try to read from Supabase database first
    const { data: articles, error } = await supabase
      .from('articles')
      .select(`
        *,
        profiles!inner(
          full_name,
          username
        )
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.warn('Failed to read from Supabase:', error);
      return [];
    }

    if (articles && articles.length > 0) {
      // Add author names to all articles
      const articlesWithAuthors = articles.map(article => ({
        ...article,
        author_name: article.profiles?.full_name || 'Unknown Author',
        author_username: article.profiles?.username || 'unknown'
      }));
      
      return articlesWithAuthors;
    }

    // Return empty array if database is empty (no fallback to static files)
    console.log('No articles found in database');
    return [];
  } catch (error) {
    console.warn('Failed to read from Supabase:', error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Try to read from Supabase database first
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Failed to read from Supabase:', error);
      return [];
    }

    if (categories && categories.length > 0) {
      return categories;
    }

    // Return empty array if database is empty (no fallback to static files)
    console.log('No categories found in database');
    return [];
  } catch (error) {
    console.warn('Failed to read from Supabase:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select(`
        *,
        profiles!inner(
          full_name,
          username
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !articles) {
      console.warn('Article not found in database:', slug);
      return null;
    }

    // Add author name to the article object
    const articleWithAuthor = {
      ...articles,
      author_name: articles.profiles?.full_name || 'Unknown Author',
      author_username: articles.profiles?.username || 'unknown'
    };

    return articleWithAuthor;
  } catch (error) {
    console.warn('Failed to read article from Supabase:', error);
    return null;
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    // First get the category ID
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .single();

    if (categoryError || !category) {
      console.warn('Category not found:', categorySlug);
      return [];
    }

    // Then get articles for that category
    const { data: articles, error } = await supabase
      .from('articles')
      .select(`
        *,
        profiles!inner(
          full_name,
          username
        )
      `)
      .eq('category_id', category.id)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.warn('Failed to read articles from Supabase:', error);
      return [];
    }

    if (articles && articles.length > 0) {
      // Add author names to all articles
      const articlesWithAuthors = articles.map(article => ({
        ...article,
        author_name: article.profiles?.full_name || 'Unknown Author',
        author_username: article.profiles?.username || 'unknown'
      }));
      
      return articlesWithAuthors;
    }

    return [];
  } catch (error) {
    console.warn('Failed to read articles by category from Supabase:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !category) {
      console.warn('Category not found in database:', slug);
      return null;
    }

    return category;
  } catch (error) {
    console.warn('Failed to read category from Supabase:', error);
    return null;
  }
}

// Date formatting
export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
}

// SEO utilities
// Environment variables should be defined in .env.local
export function generateSEOProps(
  title?: string,
  description?: string,
  image?: string,
  url?: string,
  type: string = 'website'
) {
  const siteName = 'GlobalEye News';
  const siteUrl = process.env.SITE_URL || 'https://globaleye.live';
  
  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description: description || 'Latest news and insights from around the world',
    image: image || `${siteUrl}/images/default-og.jpg`,
    url: url || siteUrl,
    type,
  };
}

// Pagination utilities
export function paginateArray<T>(array: T[], page: number, limit: number): T[] {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return array.slice(startIndex, endIndex);
}

export function getTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

// Category color mapping
export const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-800',
  world: 'bg-green-100 text-green-800',
  business: 'bg-purple-100 text-purple-800',
  science: 'bg-orange-100 text-orange-800',
  health: 'bg-red-100 text-red-800',
  entertainment: 'bg-pink-100 text-pink-800',
  lifestyle: 'bg-amber-100 text-amber-800',
  celebrities: 'bg-rose-100 text-rose-800',
};
