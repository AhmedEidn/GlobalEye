import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h2>
          <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Link href="/category/technology" className="text-blue-600 hover:text-blue-700">
                Technology
              </Link>
              <Link href="/category/world" className="text-blue-600 hover:text-blue-700">
                World
              </Link>
              <Link href="/category/business" className="text-blue-600 hover:text-blue-700">
                Business
              </Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-700">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
