import ArticleGrid from '@/components/ArticleGrid';
import { getArticles, getCategories } from '@/lib/utils';
import { formatDate } from '@/lib/date-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GlobalEye News - Latest News and Insights',
  description: 'Stay informed with the latest news, breaking stories, and in-depth analysis from around the world. GlobalEye News brings you reliable, timely, and comprehensive coverage.',
  openGraph: {
    title: 'GlobalEye News - Latest News and Insights',
    description: 'Stay informed with the latest news, breaking stories, and in-depth analysis from around the world.',
  },
};

export default async function HomePage() {
  const articles = await getArticles();
  const categories = await getCategories();

  const latestArticles = articles; // Display all articles on the homepage

  return (
    <div className="min-h-screen">
      {/* Latest News */}
      <section className="py-6 bg-gray-50">
        <div className="container-custom">
          <ArticleGrid articles={latestArticles} />
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-6 bg-white">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dive deeper into topics that interest you most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryArticles = articles.filter(article => article.category_id === category.id);
              const latestCategoryArticle = categoryArticles[0];
              
              return (
                <div key={category.id} className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    <span className="text-sm text-gray-500">{categoryArticles.length} articles</span>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  {latestCategoryArticle && (
                    <div className="mb-4">
                      <a
                        href={`/article/${latestCategoryArticle.slug}`}
                        className="text-blue-600 hover:text-blue-700 font-medium line-clamp-2"
                      >
                        {latestCategoryArticle.title}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(latestCategoryArticle.published_at || latestCategoryArticle.created_at)}
                      </p>
                    </div>
                  )}
                  
                  <a
                    href={`/category/${category.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all {category.name} articles →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-6 bg-blue-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Stay Updated
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              Get the latest news delivered to your inbox. No spam, just quality journalism.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
