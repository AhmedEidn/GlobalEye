'use client';

import ArticleGrid from '@/components/ArticleGrid';
import { useCategories } from '@/components/CategoriesProvider';
import { createClientSupabaseClient } from '@/lib/supabase';
import type { Article } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { categories } = useCategories();

  useEffect(() => {
    async function fetchData() {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Starting to fetch data...');
        }
        
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          if (process.env.NODE_ENV === 'development') {
            console.log('🏠 HomePage - Not in browser, skipping fetch');
          }
          setLoading(false);
          return;
        }
        
        // Use client-side Supabase
        const supabase = createClientSupabaseClient();
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Supabase client created successfully');
        }
        
        // Check environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
          console.log('🏠 HomePage - NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
          console.log('🏠 HomePage - NEXT_PUBLIC_SUPABASE_URL value:', supabaseUrl);
          console.log('🏠 HomePage - NEXT_PUBLIC_SUPABASE_ANON_KEY length:', supabaseKey?.length || 0);
        }
        
        if (!supabaseUrl || !supabaseKey) {
          console.error('🏠 HomePage - Missing Supabase environment variables');
          if (process.env.NODE_ENV === 'development') {
            console.log('🏠 HomePage - Environment variables check failed, but continuing...');
          }
          // Don't throw error, continue with default values
        }
        
        // Test Supabase connection with a simple query
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Testing Supabase connection...');
        }
        
        // Fetch articles
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Fetching articles...');
        }
        
        try {
          // Try multiple approaches to get articles
          let articlesData = null;
          let articlesError = null;
          
          // Approach 1: Full select with ordering
          if (process.env.NODE_ENV === 'development') {
            console.log('🏠 HomePage - Trying articles approach 1: full select...');
          }
          
          const { data: fullData, error: fullError } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(12);
          
          if (process.env.NODE_ENV === 'development') {
            console.log('🏠 HomePage - Articles approach 1 result:', { fullData, fullError });
          }
          
          if (!fullError && fullData && fullData.length > 0) {
            articlesData = fullData;
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - Articles approach 1 successful, got:', fullData.length, 'articles');
            }
          } else {
            // Approach 2: Simple select
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - Articles approach 1 failed, trying approach 2...');
            }
            
            const { data: simpleData, error: simpleError } = await supabase
              .from('articles')
              .select('id, title, slug, excerpt, status, created_at')
              .limit(10);
            
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - Articles approach 2 result:', { simpleData, simpleError });
            }
            
            if (!simpleError && simpleData && simpleData.length > 0) {
              articlesData = simpleData;
              if (process.env.NODE_ENV === 'development') {
                console.log('🏠 HomePage - Articles approach 2 successful, got:', simpleData.length, 'articles');
              }
            } else {
              // Approach 3: Minimal select
              if (process.env.NODE_ENV === 'development') {
                console.log('🏠 HomePage - Articles approach 2 failed, trying approach 3...');
              }
              
              const { data: minimalData, error: minimalError } = await supabase
                .from('articles')
                .select('id, title, slug, excerpt');
              
              if (process.env.NODE_ENV === 'development') {
                console.log('🏠 HomePage - Articles approach 3 result:', { minimalData, minimalError });
              }
              
              if (!minimalError && minimalData && minimalData.length > 0) {
                articlesData = minimalData;
                if (process.env.NODE_ENV === 'development') {
                  console.log('🏠 HomePage - Articles approach 3 successful, got:', minimalData.length, 'articles');
                }
              } else {
                articlesError = minimalError || new Error('All article approaches failed');
              }
            }
          }
          
          if (articlesData && articlesData.length > 0) {
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - Articles fetched successfully:', articlesData.length);
              console.log('🏠 HomePage - Articles data sample:', articlesData[0]);
            }
            
            // Filter published articles if possible
            let publishedArticles = articlesData.filter(a => a.status === 'published');
            
            // If no published articles, show all non-draft articles
            if (publishedArticles.length === 0) {
              publishedArticles = articlesData.filter(a => a.status !== 'draft');
              if (process.env.NODE_ENV === 'development') {
                console.log('🏠 HomePage - No published articles, showing non-draft articles:', publishedArticles.length);
              }
            }
            
            // If still no articles, show all articles
            if (publishedArticles.length === 0) {
              publishedArticles = articlesData;
              if (process.env.NODE_ENV === 'development') {
                console.log('🏠 HomePage - No non-draft articles, showing all articles:', publishedArticles.length);
              }
            }
            
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - Final articles to display:', publishedArticles.length);
              console.log('🏠 HomePage - About to set articles state with:', publishedArticles.length, 'articles');
            }
            
            setArticles(publishedArticles);
            
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - Articles state set successfully');
            }
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.log('🏠 HomePage - No articles found in database after all approaches');
              if (articlesError) {
                console.log('🏠 HomePage - Last articles error:', articlesError);
              }
            }
            setArticles([]);
          }
        } catch (articleError) {
          console.error('🏠 HomePage - Article fetch error:', articleError);
          setArticles([]);
        }
        
        // Categories are already being fetched by CategoriesProvider
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Categories are managed by CategoriesProvider, skipping fetch');
          console.log('🏠 HomePage - Current categories from context:', categories.length);
        }
        
        setLoading(false);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Data fetching completed successfully');
        }
      } catch (error) {
        console.error('🏠 HomePage - Error fetching data:', error);
        setLoading(false);
        
        // Set empty arrays to prevent undefined errors
        setArticles([]);
        // Categories are managed by CategoriesProvider
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🏠 HomePage - Error details:', error);
        }
      }
    }

    fetchData();
  }, []);

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('🏠 HomePage - Categories from DB:', categories?.length || 0);
    console.log('🏠 HomePage - Categories state:', categories);
    console.log('🏠 HomePage - Articles state:', articles);
    console.log('🏠 HomePage - Loading state:', loading);
    
    // Additional debug info
    if (categories && categories.length > 0) {
      console.log('🏠 HomePage - First category details:', categories[0]);
      console.log('🏠 HomePage - All categories:', categories.map(c => ({ id: c.id, name: c.name, article_count: c.article_count })));
    }
    if (articles && articles.length > 0) {
      console.log('🏠 HomePage - First article details:', articles[0]);
    }
    
    // Force check the condition
    console.log('🏠 HomePage - Condition check:');
    console.log('  - categories exists:', !!categories);
    console.log('  - categories.length:', categories?.length || 0);
    console.log('  - categories && categories.length > 0:', !!(categories && categories.length > 0));
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Latest Articles */}
      {articles.length > 0 && (
        <section className="py-6 bg-white">
          <div className="container-custom">
            <ArticleGrid articles={articles} />
          </div>
        </section>
      )}

      {/* Category Highlights */}
      <section className="py-6 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dive deeper into topics that interest you most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full bg-blue-100 p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <h4 className="font-bold">Loading Categories...</h4>
                <p>Please wait while we fetch categories from the database.</p>
              </div>
            ) : categories && categories.length > 0 ? (
              categories.map((category, index) => {
                if (process.env.NODE_ENV === 'development') {
                  console.log(`🏠 Rendering category ${index}:`, category);
                  console.log(`🏠 Category ${index} data:`, {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    article_count: category.article_count,
                  });
                }
                
                return (
                  <div
                    key={category.id || index}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {category.name || `Category ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description || 'Explore articles in this category.'}
                      </p>
                      <div className="text-sm text-gray-500 mb-4">
                        {category.article_count || 0} articles
                      </div>
                      <a
                        href={`/category/${category.slug || category.id}`}
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Explore
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full bg-yellow-100 p-6 text-center rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">No Categories Available</h4>
                <p className="text-yellow-700">
                  Categories are being loaded. Please check back later.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-3 bg-yellow-200 rounded text-sm">
                    <p><strong>Debug Info:</strong></p>
                    <p>Categories length: {categories?.length || 0}</p>
                    <p>Categories data: {JSON.stringify(categories, null, 2)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Informed with GlobalEye
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest news and insights delivered to your inbox. Join thousands of readers who trust us for quality journalism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Learn More
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
