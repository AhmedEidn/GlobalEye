import FavoritesList from '@/components/FavoritesList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Favorites - GlobalEye News',
  description: 'View and manage your favorite articles on GlobalEye News.',
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Favorites</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save articles you love and access them anytime. Your personal reading list is just a click away.
          </p>
        </div>

        {/* Favorites Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <FavoritesList />
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">1</div>
              <h4 className="font-medium text-gray-900 mb-2">Browse Articles</h4>
              <p className="text-sm text-gray-600">Explore our latest news and stories</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">2</div>
              <h4 className="font-medium text-gray-900 mb-2">Click Heart</h4>
              <p className="text-sm text-gray-600">Save articles you want to read later</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">3</div>
              <h4 className="font-medium text-gray-900 mb-2">Access Favorites</h4>
              <p className="text-sm text-gray-600">View all your saved articles here</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">4</div>
              <h4 className="font-medium text-gray-900 mb-2">Enjoy Reading</h4>
              <p className="text-sm text-gray-600">Read at your own pace</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
