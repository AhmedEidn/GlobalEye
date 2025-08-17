'use client';

import { createClientSupabaseClient } from '@/lib/supabase';
import type { CategoryWithArticleCount } from '@/lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface CategoriesContextType {
  categories: CategoryWithArticleCount[];
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  loading: true,
  error: null,
});

export const useCategories = () => useContext(CategoriesContext);

export default function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryWithArticleCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('🏷️ CategoriesProvider - Starting to fetch categories...');
        }

        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          if (process.env.NODE_ENV === 'development') {
            console.log('🏷️ CategoriesProvider - Not in browser, skipping fetch');
          }
          setLoading(false);
          return;
        }

        // Use client-side Supabase
        const supabase = createClientSupabaseClient();
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🏷️ CategoriesProvider - Supabase client created successfully');
        }

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (process.env.NODE_ENV === 'development') {
          console.log('🏷️ CategoriesProvider - Categories query result:', { categoriesData, categoriesError });
        }

        if (categoriesError) {
          console.error('🏷️ CategoriesProvider - Error fetching categories:', categoriesError);
          setError('Failed to load categories');
          setCategories([]);
        } else if (categoriesData && categoriesData.length > 0) {
          if (process.env.NODE_ENV === 'development') {
            console.log('🏷️ CategoriesProvider - Categories fetched successfully:', categoriesData.length);
          }

          // Get article count for each category
          const categoriesWithCounts = await Promise.all(
            categoriesData.map(async (category) => {
              try {
                const { count, error } = await supabase
                  .from('articles')
                  .select('*', { count: 'exact', head: true })
                  .eq('category_id', category.id)
                  .eq('status', 'published');

                if (process.env.NODE_ENV === 'development') {
                  console.log(`🏷️ CategoriesProvider - Category ${category.name} article count:`, count, 'Error:', error);
                }

                return {
                  ...category,
                  article_count: count || 0
                };
              } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                  console.log(`🏷️ CategoriesProvider - Error getting count for category ${category.name}:`, error);
                }
                return {
                  ...category,
                  article_count: 0
                };
              }
            })
          );

          if (process.env.NODE_ENV === 'development') {
            console.log('🏷️ CategoriesProvider - Categories with counts:', categoriesWithCounts);
          }

          setCategories(categoriesWithCounts);
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log('🏷️ CategoriesProvider - No categories found');
          }
          setCategories([]);
        }
      } catch (error) {
        console.error('🏷️ CategoriesProvider - Error:', error);
        setError('Failed to load categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const value: CategoriesContextType = {
    categories,
    loading,
    error,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
