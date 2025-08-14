import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement - GlobalEye News',
  description: 'Learn about our commitment to accessibility and the features we provide to ensure our website is accessible to all users.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to Accessibility</h2>
              <p className="text-gray-700 mb-4">
                GlobalEye News is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards to ensure our website is accessible to all users.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that websites should be accessible to everyone, regardless of their abilities or 
                the technology they use. Our goal is to provide an inclusive experience that meets or exceeds 
                the requirements of the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessibility Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Navigation & Structure</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li>Clear and consistent navigation structure</li>
                    <li>Logical heading hierarchy (H1, H2, H3)</li>
                    <li>Skip navigation links for keyboard users</li>
                    <li>Breadcrumb navigation</li>
                    <li>Search functionality with autocomplete</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Keyboard & Screen Reader</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>Full keyboard navigation support</li>
                    <li>Visible focus indicators</li>
                    <li>Screen reader compatible content</li>
                    <li>ARIA labels and landmarks</li>
                    <li>Semantic HTML structure</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Visual & Audio</h3>
                  <ul className="list-disc pl-6 text-purple-700 space-y-2">
                    <li>High contrast color schemes</li>
                    <li>Resizable text (up to 200%)</li>
                    <li>Alternative text for images</li>
                    <li>Captions for video content</li>
                    <li>Audio descriptions where needed</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Forms & Interactive</h3>
                  <ul className="list-disc pl-6 text-orange-700 space-y-2">
                    <li>Clear form labels and instructions</li>
                    <li>Error messages and validation</li>
                    <li>Logical tab order</li>
                    <li>Submit button identification</li>
                    <li>Required field indicators</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">WCAG 2.1 Compliance</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Level AA Standards</h3>
                <p className="text-gray-700 mb-4">
                  Our website strives to meet WCAG 2.1 Level AA standards, which include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Perceivable</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Text alternatives for non-text content</li>
                      <li>• Captions and other alternatives for multimedia</li>
                      <li>• Content that can be presented in different ways</li>
                      <li>• Content that is easy to see and hear</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Operable</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Functionality available from a keyboard</li>
                      <li>• Users have enough time to read and use content</li>
                      <li>• Content does not cause seizures</li>
                      <li>• Users can easily navigate and find content</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Understandable</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Text is readable and understandable</li>
                    <li>• Content appears and operates in predictable ways</li>
                    <li>• Users are helped to avoid and correct mistakes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Robust</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Content can be interpreted by various user agents</li>
                    <li>• Content remains accessible as technologies advance</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assistive Technologies</h2>
              <p className="text-gray-700 mb-4">
                Our website is designed to work with various assistive technologies, including:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-blue-800">Screen Readers</h4>
                  <p className="text-blue-700 text-sm">JAWS, NVDA, VoiceOver, TalkBack</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-green-800">Mobile Accessibility</h4>
                  <p className="text-green-700 text-sm">iOS VoiceOver, Android TalkBack</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-purple-800">Keyboard Navigation</h4>
                  <p className="text-purple-700 text-sm">Full keyboard support</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accessibility Tools</h2>
              
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Built-in Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Text Size</h4>
                    <p className="text-yellow-700 text-sm">
                      Use your browser&apos;s zoom function (Ctrl/Cmd + Plus) to increase text size up to 200% 
                      without losing functionality.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">High Contrast</h4>
                    <p className="text-yellow-700 text-sm">
                      Our color scheme provides sufficient contrast ratios. You can also use your 
                      operating system&apos;s high contrast mode.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Known Limitations</h2>
              <p className="text-gray-700 mb-4">
                While we strive to ensure our website is fully accessible, we acknowledge that some areas 
                may have limitations:
              </p>
              
              <div className="bg-red-50 rounded-lg p-6">
                <ul className="list-disc pl-6 text-red-700 space-y-2">
                  <li>Some older PDF documents may not be fully accessible</li>
                  <li>Third-party content (ads, social media embeds) may have varying accessibility</li>
                  <li>Some interactive features may require JavaScript to be enabled</li>
                  <li>Video content may not always have captions or audio descriptions</li>
                </ul>
              </div>
              
              <p className="text-gray-700 mt-4">
                We are actively working to address these limitations and improve accessibility across all areas of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback & Support</h2>
              <p className="text-gray-700 mb-4">
                We welcome your feedback on the accessibility of our website. If you experience accessibility 
                barriers or have suggestions for improvement, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Accessibility Team</h3>
                  <p className="text-blue-700 mb-2"><strong>Email:</strong> accessibility@globaleye.live</p>
                  <p className="text-blue-700 mb-2"><strong>Subject:</strong> Accessibility Feedback</p>
                  <p className="text-blue-700 mb-2"><strong>Response Time:</strong> 48-72 hours</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">General Support</h3>
                  <p className="text-green-700 mb-2"><strong>Email:</strong> support@globaleye.live</p>
                  <p className="text-green-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-green-700 mb-2"><strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Continuous Improvement</h2>
              <p className="text-gray-700 mb-4">
                We are committed to continuously improving the accessibility of our website. Our accessibility 
                efforts include:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Regular Audits</h4>
                    <p className="text-gray-700 text-sm">We conduct regular accessibility audits using automated tools and manual testing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">User Testing</h4>
                    <p className="text-gray-700 text-sm">We work with users who have disabilities to test and improve our website</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Training</h4>
                    <p className="text-gray-700 text-sm">Our development team receives regular training on accessibility best practices</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Updates</h4>
                    <p className="text-gray-700 text-sm">We regularly update our website to incorporate accessibility improvements</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  We are committed to making our website accessible to everyone. Your feedback helps us improve.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Contact Accessibility Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
