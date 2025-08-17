'use client';

import { useCategories } from './CategoriesProvider';
import Link from 'next/link';

export default function Footer() {
  const { categories, loading } = useCategories();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 justify-items-start">
                     {/* Brand Section */}
           <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">GlobalEye</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Stay informed with the latest news, breaking stories, and in-depth analysis from around the world. 
              GlobalEye News brings you reliable, timely, and comprehensive coverage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/feed.xml" className="text-gray-400 hover:text-white transition-colors" title="RSS Feed">
                <span className="sr-only">RSS Feed</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 012.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 012.18-2.18M6.18 8.36a2.18 2.18 0 012.18 2.18C8.36 12.55 7.38 13.55 6.18 13.55C5 13.55 4 12.55 4 11.36A2.18 2.18 0 016.18 8.36M6.18 1.09a2.18 2.18 0 012.18 2.18C8.36 5.09 7.38 6.09 6.18 6.09C5 6.09 4 5.09 4 3.91A2.18 2.18 0 016.18 1.09M12.5 22a3.5 3.5 0 003.5-3.5c0-1.93-1.57-3.5-3.5-3.5S9 16.57 9 18.5S10.57 22 12.5 22M12.5 13.5a3.5 3.5 0 003.5-3.5c0-1.93-1.57-3.5-3.5-3.5S9 8.07 9 10S10.57 13.5 12.5 13.5M12.5 5a3.5 3.5 0 003.5-3.5C16 1.57 14.43 0 12.5 0S9 1.57 9 3.5S10.57 5 12.5 5"/>
                </svg>
              </a>
            </div>
          </div>

                               {/* Categories */}
            <div>
             <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
             {loading ? (
               <div className="text-gray-400">Loading categories...</div>
             ) : categories.length > 0 ? (
               (() => {
                 const third = Math.ceil(categories.length / 3);
                 const first = categories.slice(0, third);
                 const second = categories.slice(third, third * 2);
                 const third_col = categories.slice(third * 2);
                 return (
                   <div className="grid grid-cols-3 gap-x-6 gap-y-2 md:gap-x-6 md:gap-y-2">
                     <ul className="space-y-2">
                       {first.map((category) => (
                         <li key={category.id}>
                           <Link href={`/category/${category.slug}`} className="text-gray-300 hover:text-white transition-colors">
                             {category.name}
                           </Link>
                         </li>
                       ))}
                     </ul>
                     <ul className="space-y-2">
                       {second.map((category) => (
                         <li key={category.id}>
                           <Link href={`/category/${category.slug}`} className="text-gray-300 hover:text-white transition-colors">
                             {category.name}
                           </Link>
                         </li>
                       ))}
                     </ul>
                     <ul className="space-y-2">
                       {third_col.map((category) => (
                         <li key={category.id}>
                           <Link href={`/category/${category.slug}`} className="text-gray-300 hover:text-white transition-colors">
                             {category.name}
                           </Link>
                         </li>
                       ))}
                     </ul>
                   </div>
                 );
               })()
             ) : (
               <div className="text-gray-400">No categories available</div>
             )}
           </div>

                               {/* Quick Links */}
            <div>
             <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
             <ul className="space-y-2">
               <li>
                 <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                   Home
                 </Link>
               </li>
               <li>
                 <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                   About Us
                 </Link>
               </li>
               <li>
                 <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                   Contact
                 </Link>
               </li>
                               <li>
                  <Link href="/feed.xml" className="text-gray-300 hover:text-white transition-colors">
                    RSS Feed
                  </Link>
                </li>
             </ul>
           </div>


        </div>

                 {/* Bottom Section */}
         <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} GlobalEye News. All rights reserved.
          </p>
                      <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
              <Link href="/dmca" className="text-gray-400 hover:text-white text-sm transition-colors">
                DMCA
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm transition-colors">
                Disclaimer
              </Link>
              <Link href="/data-processing" className="text-gray-400 hover:text-white text-sm transition-colors">
                Data Processing
              </Link>
              <Link href="/sitemap-page" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                About Us
              </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
