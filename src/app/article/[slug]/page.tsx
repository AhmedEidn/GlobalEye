'use client';

import { createClientSupabaseClient } from '@/lib/supabase';
import type { Article } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { slug } = await params;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('📰 ArticlePage - Fetching article with slug:', slug);
        }
        
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          if (process.env.NODE_ENV === 'development') {
            console.log('📰 ArticlePage - Not in browser, skipping fetch');
          }
          setLoading(false);
          return;
        }
        
        // Use client-side Supabase
        const supabase = createClientSupabaseClient();
        
        if (process.env.NODE_ENV === 'development') {
          console.log('📰 ArticlePage - Supabase client created successfully');
        }
        
        // Fetch article by slug
        const { data: articleData, error: articleError } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (process.env.NODE_ENV === 'development') {
          console.log('📰 ArticlePage - Article query result:', { articleData, articleError });
        }
        
        if (articleError) {
          console.error('📰 ArticlePage - Error fetching article:', articleError);
          if (articleError.code === 'PGRST116') {
            // Article not found
            setError('Article not found');
          } else {
            setError('Failed to load article');
          }
        } else if (articleData) {
          if (process.env.NODE_ENV === 'development') {
            console.log('📰 ArticlePage - Article fetched successfully:', articleData);
          }
          setArticle(articleData);
        } else {
          setError('Article not found');
        }
      } catch (error) {
        console.error('📰 ArticlePage - Error:', error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            {error || 'The article you are looking for does not exist.'}
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-gray-600 mt-4 text-lg">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center mt-6 text-sm text-gray-500">
              <span>Published on {new Date(article.created_at).toLocaleDateString()}</span>
              {article.category_id && (
                <span className="ml-4">
                  Category ID: {article.category_id}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <div className="text-gray-600">
                <p>Article content is not available at the moment.</p>
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-4">
                    <summary className="cursor-pointer font-medium">Debug Info</summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(article, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
