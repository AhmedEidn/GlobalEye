import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - GlobalEye News',
  description: 'Learn about how GlobalEye News uses cookies to enhance your browsing experience and provide personalized content.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and personalizing content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                GlobalEye News uses cookies for several purposes to enhance your browsing experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be disabled.</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization, such as remembering your language preferences.</li>
                <li><strong>Analytics Cookies:</strong> Provide insights into website traffic and user behavior to help us improve our content and services.</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Session Cookies</h3>
                <p className="text-gray-700">
                  These cookies are temporary and are deleted when you close your browser. They help maintain your session 
                  and remember your preferences during your visit.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Persistent Cookies</h3>
                <p className="text-gray-700">
                  These cookies remain on your device for a set period or until you delete them. They help us remember 
                  your preferences and provide a personalized experience across multiple visits.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Cookies</h3>
                <p className="text-gray-700">
                  Some cookies are placed by third-party services that appear on our pages, such as social media 
                  platforms, analytics providers, and advertising networks.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 mb-4">
                You have control over your cookie preferences. Here are several ways you can manage cookies:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Browser Settings</h4>
                  <p className="text-blue-700 text-sm">
                    Most web browsers allow you to control cookies through their settings. You can usually find 
                    these options in the "Privacy" or "Security" sections of your browser settings.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Cookie Consent</h4>
                  <p className="text-green-700 text-sm">
                    When you first visit our website, you'll see a cookie consent banner that allows you to 
                    accept or decline non-essential cookies.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specific Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cookie Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">session_id</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Maintains your session during your visit</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">language_pref</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Remembers your language preference</td>
                      <td className="px-4 py-3 text-sm text-gray-700">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">analytics_id</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Tracks website usage for analytics</td>
                      <td className="px-4 py-3 text-sm text-gray-700">2 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">ad_preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Stores advertising preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-700">6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for 
                other operational, legal, or regulatory reasons. We will notify you of any material changes 
                by posting the new policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@globaleye.live<br/>
                  <strong>Address:</strong> GlobalEye News, New York, NY 10001
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                By continuing to use our website, you agree to our use of cookies as described in this policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
