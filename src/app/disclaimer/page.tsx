import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - GlobalEye News',
  description: 'Important disclaimers and liability limitations for GlobalEye News content and services.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">General Information Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The information provided on GlobalEye News is for general informational purposes only. 
                While we strive to keep the information up to date and correct, we make no representations 
                or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                suitability, or availability of the information, products, services, or related graphics 
                contained on the website for any purpose.
              </p>
              <p className="text-gray-700 mb-4">
                Any reliance you place on such information is therefore strictly at your own risk. 
                In no event will we be liable for any loss or damage including without limitation, 
                indirect or consequential loss or damage, arising from loss of data or profits arising 
                out of, or in connection with, the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">News and Editorial Content</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Content Accuracy</h3>
                <ul className="list-disc pl-6 text-blue-700 space-y-2">
                  <li>News articles are based on available information at the time of publication</li>
                  <li>Information may become outdated or inaccurate over time</li>
                  <li>We encourage readers to verify information from multiple sources</li>
                  <li>Breaking news may be updated as new information becomes available</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Editorial Standards</h3>
                <ul className="list-disc pl-6 text-green-700 space-y-2">
                  <li>We strive for accuracy, fairness, and balance in our reporting</li>
                  <li>Opinion pieces are clearly labeled as such</li>
                  <li>Editorial decisions are made independently of commercial interests</li>
                  <li>Corrections are published promptly when errors are identified</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">External Links and Third-Party Content</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to external websites and third-party content. 
                We have no control over the nature, content, and availability of those sites. 
                The inclusion of any links does not necessarily imply a recommendation or 
                endorse the views expressed within them.
              </p>
              
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Third-Party Disclaimer</h3>
                <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                  <li>We are not responsible for the content of external websites</li>
                  <li>Third-party advertisements are clearly identified</li>
                  <li>We do not endorse third-party products or services</li>
                  <li>External links are provided for convenience only</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial and Investment Information</h2>
              <p className="text-gray-700 mb-4">
                Any financial or investment information provided on our website is for informational 
                purposes only and should not be construed as financial advice. We are not licensed 
                financial advisors, and our content should not be considered as a substitute for 
                professional financial advice.
              </p>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Investment Disclaimer</h3>
                <ul className="list-disc pl-6 text-red-700 space-y-2">
                  <li>Past performance does not guarantee future results</li>
                  <li>Investment decisions should be based on your own research</li>
                  <li>Consult with qualified financial professionals before making investment decisions</li>
                  <li>We are not liable for any financial losses or damages</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health and Medical Information</h2>
              <p className="text-gray-700 mb-4">
                Health and medical information provided on our website is for general informational 
                purposes only and should not be considered as medical advice. Always consult with 
                qualified healthcare professionals for medical concerns and treatment decisions.
              </p>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Medical Disclaimer</h3>
                <ul className="list-disc pl-6 text-purple-700 space-y-2">
                  <li>Information is not intended to diagnose, treat, or cure any medical condition</li>
                  <li>Individual health needs vary and require professional assessment</li>
                  <li>Emergency medical situations require immediate professional attention</li>
                  <li>We are not liable for any health-related decisions or outcomes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User-Generated Content</h2>
              <p className="text-gray-700 mb-4">
                We may allow users to submit comments, feedback, or other content. 
                We are not responsible for user-generated content and do not necessarily 
                endorse the views expressed by users.
              </p>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Content Moderation</h3>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li>We reserve the right to moderate and remove inappropriate content</li>
                  <li>Users are responsible for the content they submit</li>
                  <li>We do not guarantee the accuracy of user-generated content</li>
                  <li>Violation of our terms may result in content removal</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">General Limitation</h3>
                <p className="text-gray-700 mb-3">
                  To the fullest extent permitted by applicable law, GlobalEye News shall not be liable 
                  for any direct, indirect, incidental, special, consequential, or punitive damages, 
                  including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Interruption of business operations</li>
                  <li>Computer system failures or data corruption</li>
                  <li>Any damages resulting from use of our services</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Maximum Liability</h3>
                <p className="text-red-700">
                  In no event shall our total liability exceed the amount paid by you, if any, 
                  for accessing our website during the twelve (12) months preceding the claim.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless GlobalEye News, its officers, directors, 
                employees, and agents from and against any claims, damages, obligations, losses, 
                liabilities, costs, or debt arising from your use of our website or violation of 
                our terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 mb-4">
                This disclaimer and your use of our website shall be governed by and construed 
                in accordance with the laws of the jurisdiction in which GlobalEye News operates. 
                Any disputes arising from this disclaimer or your use of our website shall be 
                subject to the exclusive jurisdiction of the courts in that jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify this disclaimer at any time. Changes will be 
                effective immediately upon posting on our website. Your continued use of our 
                website after any changes constitutes acceptance of the modified disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this disclaimer, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Legal Department</h3>
                  <p className="text-blue-700 mb-2"><strong>Email:</strong> legal@globaleye.live</p>
                  <p className="text-blue-700 mb-2"><strong>Subject:</strong> Disclaimer Questions</p>
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

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  This disclaimer is an important legal document. Please read it carefully.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Contact Legal Department
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
