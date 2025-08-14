import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - GlobalEye News',
  description: 'Learn about GlobalEye News, our mission, values, and commitment to delivering reliable, timely, and comprehensive news coverage.',
  openGraph: {
    title: 'About Us - GlobalEye News',
    description: 'Learn about GlobalEye News, our mission, values, and commitment to delivering reliable, timely, and comprehensive news coverage.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About GlobalEye News</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted source for the latest news, breaking stories, and in-depth analysis from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At GlobalEye News, we believe that access to reliable, accurate, and timely information is fundamental to a functioning democracy and an informed society. Our mission is to deliver comprehensive news coverage that empowers readers to make informed decisions about the world around them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Accuracy</h3>
                <p className="text-gray-600">We are committed to factual, verified reporting that our readers can trust.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Timeliness</h3>
                <p className="text-gray-600">We deliver breaking news and updates as they happen, keeping you informed in real-time.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive</h3>
                <p className="text-gray-600">We cover a wide range of topics to provide a complete picture of world events.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-600">
                These core values guide everything we do at GlobalEye News.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Journalistic Integrity</h3>
                <p className="text-gray-700 leading-relaxed">
                  We adhere to the highest standards of journalistic ethics. Our reporters are committed to truth, fairness, and objectivity in their coverage. We verify facts, provide context, and present multiple perspectives on complex issues.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Transparency</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe in being transparent about our sources, methods, and editorial decisions. When we make mistakes, we correct them promptly and openly. Our readers deserve to know how we gather and present information.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Diversity and Inclusion</h3>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to reflecting the diversity of our world in our coverage and our team. We believe that diverse perspectives lead to better journalism and a more complete understanding of the issues that matter.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  We embrace new technologies and storytelling methods to better serve our readers. From interactive graphics to multimedia content, we&apos;re constantly exploring ways to make news more engaging and accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals behind GlobalEye News who work tirelessly to bring you the most important stories of the day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">SM</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sarah Mitchell</h3>
              <p className="text-blue-600 mb-2">Editor-in-Chief</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in digital journalism, Sarah leads our editorial team and ensures the highest standards of reporting.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">DJ</span>
              </div>
              <h3 className="text-xl font-bold mb-2">David Johnson</h3>
              <p className="text-blue-600 mb-2">Technology Editor</p>
              <p className="text-gray-600 text-sm">
                David specializes in technology and innovation coverage, bringing deep expertise in the latest developments in the tech world.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">MC</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Maria Chen</h3>
              <p className="text-blue-600 mb-2">World Affairs Correspondent</p>
              <p className="text-gray-600 text-sm">
                Maria covers international politics and global events, providing insightful analysis of complex geopolitical issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-8 text-blue-100">
              Have a story tip, feedback, or just want to say hello? We&apos;d love to hear from you.
            </p>
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
