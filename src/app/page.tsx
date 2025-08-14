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
  // Empty arrays for build time
  const articles: any[] = [];
  const categories: any[] = [];

  return (
    <div className="min-h-screen">
      {/* Latest News */}
      <section className="py-6 bg-gray-50">
        <div className="container-custom">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to GlobalEye News
            </h1>
            <p className="text-xl text-gray-600">
              Your source for the latest news and insights from around the world.
            </p>
          </div>
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
            {['Technology', 'World', 'Business', 'Science', 'Health', 'Entertainment'].map((categoryName) => (
              <div key={categoryName} className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{categoryName}</h3>
                  <span className="text-sm text-gray-500">0 articles</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Latest news and insights from the {categoryName.toLowerCase()} world.
                </p>
                
                <a
                  href={`/category/${categoryName.toLowerCase()}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all {categoryName} articles →
                </a>
              </div>
            ))}
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
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
