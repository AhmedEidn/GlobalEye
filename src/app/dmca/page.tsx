import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMCA & Copyright Policy - GlobalEye News',
  description: 'Learn about our copyright policy, how to report copyright violations, and the procedures for content removal requests.',
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">DMCA & Copyright Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Copyright Protection</h2>
              <p className="text-gray-700 mb-4">
                GlobalEye News respects the intellectual property rights of others and expects our users to do the same. 
                We are committed to responding to notices of alleged copyright infringement in accordance with the 
                Digital Millennium Copyright Act (DMCA) and other applicable intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, 
                please provide us with the information specified below in the form of a written notification.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filing a DMCA Notice</h2>
              
              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Required Information</h3>
                <p className="text-red-700 mb-3">
                  To file a valid DMCA notice, you must provide the following information:
                </p>
                <ul className="list-disc pl-6 text-red-700 space-y-2">
                  <li><strong>Physical or electronic signature</strong> of the copyright owner or authorized person</li>
                  <li><strong>Identification of the copyrighted work</strong> claimed to have been infringed</li>
                  <li><strong>Identification of the infringing material</strong> and its location on our website</li>
                  <li><strong>Contact information</strong> including address, phone number, and email</li>
                  <li><strong>Statement of good faith belief</strong> that use is not authorized by the copyright owner</li>
                  <li><strong>Statement of accuracy</strong> under penalty of perjury</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">DMCA Notice Template</h3>
                <div className="bg-white p-4 rounded border text-sm text-gray-700">
                  <p className="mb-2"><strong>Subject:</strong> DMCA Copyright Infringement Notice</p>
                  <p className="mb-2"><strong>To:</strong> copyright@globaleye.live</p>
                  <p className="mb-2"><strong>From:</strong> [Your Name/Company]</p>
                  <p className="mb-2"><strong>Date:</strong> [Current Date]</p>
                  <br />
                  <p className="mb-2">I hereby provide notice of copyright infringement pursuant to the Digital Millennium Copyright Act (DMCA).</p>
                  <p className="mb-2"><strong>Copyrighted Work:</strong> [Description of your copyrighted work]</p>
                  <p className="mb-2"><strong>Infringing Material:</strong> [URL or description of infringing content]</p>
                  <p className="mb-2"><strong>Contact Information:</strong> [Your address, phone, email]</p>
                  <p className="mb-2"><strong>Statement:</strong> I have a good faith belief that the use is not authorized by the copyright owner.</p>
                  <p className="mb-2"><strong>Accuracy:</strong> The information in this notice is accurate under penalty of perjury.</p>
                  <p className="mb-2"><strong>Signature:</strong> [Your signature or typed name]</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Counter-Notification</h2>
              <p className="text-gray-700 mb-4">
                If you believe that your content was removed by mistake or misidentification, you may file a counter-notification. 
                The counter-notification must include:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Required Elements</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Your physical or electronic signature</li>
                    <li>• Identification of removed content</li>
                    <li>• Statement under penalty of perjury</li>
                    <li>• Consent to local federal court jurisdiction</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Counter-notification must be filed within 10-14 business days</li>
                    <li>• We may restore content within 10-14 business days</li>
                    <li>• Original complainant may file legal action</li>
                    <li>• Seek legal counsel if unsure about your rights</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Response Process</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Receipt & Review</h4>
                    <p className="text-gray-700 text-sm">We review your DMCA notice within 24-48 hours of receipt</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Content Removal</h4>
                    <p className="text-gray-700 text-sm">If valid, infringing content is removed within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">User Notification</h4>
                    <p className="text-gray-700 text-sm">Content creator is notified of the removal and their rights</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Resolution</h4>
                    <p className="text-gray-700 text-sm">Process continues based on counter-notifications or legal action</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Repeat Infringers</h2>
              <p className="text-gray-700 mb-4">
                In accordance with DMCA requirements, we maintain a policy for dealing with repeat infringers. 
                Users who repeatedly violate copyright laws may have their accounts terminated and access to our 
                services permanently revoked.
              </p>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Three-Strike Policy</h3>
                <ul className="list-disc pl-6 text-orange-700 space-y-2">
                  <li><strong>First Strike:</strong> Warning and content removal</li>
                  <li><strong>Second Strike:</strong> Temporary account suspension (7-30 days)</li>
                  <li><strong>Third Strike:</strong> Permanent account termination</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Copyright Agent</h3>
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> copyright@globaleye.live</p>
                  <p className="text-gray-700 mb-2"><strong>Subject:</strong> DMCA Notice</p>
                  <p className="text-gray-700 mb-2"><strong>Response Time:</strong> 24-48 hours</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal Department</h3>
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@globaleye.live</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-gray-700 mb-2"><strong>Address:</strong> Legal Department, GlobalEye News</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Important Disclaimers</h2>
              
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Legal Notice</h3>
                <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                  <li>This policy is for informational purposes only and does not constitute legal advice</li>
                  <li>We recommend consulting with legal counsel for specific copyright issues</li>
                  <li>We reserve the right to modify this policy at any time</li>
                  <li>Filing false claims may result in legal consequences</li>
                </ul>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  For questions about this DMCA policy, please contact our legal department.
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
