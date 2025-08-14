import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import { getArticlesByCategory, getCategoryBySlug, getTotalPages, paginateArray } from '@/lib/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - GlobalEye News`,
    description: category.description ?? undefined,
    openGraph: {
      title: `${category.name} - GlobalEye News`,
      description: category.description ?? undefined,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(category.slug);
  const currentPage = parseInt(page || '1');
  const itemsPerPage = 9;
  const totalPages = getTotalPages(articles.length, itemsPerPage);
  const paginatedArticles = paginateArray(articles, currentPage, itemsPerPage);

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {category.name}
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-6 bg-gray-50">
        <div className="container-custom">
          {paginatedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  // This would be handled by client-side navigation
                  const url = new URL(window.location.href);
                  url.searchParams.set('page', page.toString());
                  window.location.href = url.toString();
                }}
              />
            </>
          ) : (
            <div className="text-center py-8">
              <div className="max-w-md mx-auto">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no articles in this category yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
