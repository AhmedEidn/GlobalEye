import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - GlobalEye News',
  description: 'Learn about how GlobalEye News collects, uses, and protects your personal information in accordance with privacy laws and best practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                GlobalEye News ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                use our services, or interact with us in any way.
              </p>
              <p className="text-gray-700 mb-4">
                By using our services, you consent to the collection and use of information in accordance with this policy. 
                We are committed to maintaining the trust and confidence of our users and will always be transparent about our data practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Personal Information</h3>
                <p className="text-blue-700 mb-3">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc pl-6 text-blue-700 space-y-1">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials and profile information</li>
                  <li>Communication preferences and newsletter subscriptions</li>
                  <li>Feedback, comments, and survey responses</li>
                  <li>Information provided when contacting our support team</li>
                  <li>Authentication data from third-party providers (Google OAuth)</li>
                  <li>User preferences and favorite articles</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Automatically Collected Information</h3>
                <p className="text-green-700 mb-3">
                  When you visit our website, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 text-green-700 space-y-1">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, links clicked)</li>
                  <li>Location information (general geographic area)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Referral sources and search terms</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Third-Party Information</h3>
                <p className="text-purple-700">
                  We may receive information from third-party sources, such as social media platforms, 
                  analytics providers, and advertising partners, in accordance with their privacy policies.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for various purposes to provide and improve our services:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Service Provision</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Delivering news content and updates</li>
                    <li>• Personalizing your experience</li>
                    <li>• Processing your requests and inquiries</li>
                    <li>• Maintaining and improving our website</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Communication</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Sending newsletters and updates</li>
                    <li>• Responding to your questions</li>
                    <li>• Providing customer support</li>
                    <li>• Sending important service notifications</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Analytics & Improvement</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Analyzing website usage patterns</li>
                    <li>• Improving content and functionality</li>
                    <li>• Conducting research and surveys</li>
                    <li>• Optimizing user experience</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Legal & Security</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Complying with legal obligations</li>
                    <li>• Protecting against fraud and abuse</li>
                    <li>• Ensuring website security</li>
                    <li>• Enforcing our terms of service</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting your privacy and will not sell, trade, or rent your personal information to third parties. 
                However, we may share your information in the following circumstances:
              </p>
              
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Service Providers</h3>
                <p className="text-yellow-700">
                  We may share information with trusted third-party service providers who assist us in operating our website, 
                  conducting business, or servicing you, such as hosting providers, analytics services, and email delivery services.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Legal Requirements</h3>
                <p className="text-red-700">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities, 
                  such as a court order or government agency.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Business Transfers</h3>
                <p className="text-indigo-700">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. 
                  We will notify you of any such change in ownership or control of your personal information.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Encryption:</strong> We use industry-standard encryption to protect data in transit and at rest</li>
                <li><strong>Access Controls:</strong> Strict access controls limit who can access your personal information</li>
                <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and updates</li>
                <li><strong>Employee Training:</strong> Our staff receives regular training on data protection and privacy</li>
                <li><strong>Incident Response:</strong> We have procedures in place to respond to security incidents</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Access & Control</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Access your personal information</li>
                    <li>• Correct inaccurate information</li>
                    <li>• Request deletion of your data</li>
                    <li>• Object to certain processing</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Communication Preferences</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Opt-out of marketing emails</li>
                    <li>• Manage newsletter subscriptions</li>
                    <li>• Control cookie preferences</li>
                    <li>• Update account settings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                unless a longer retention period is required or permitted by law. The retention period varies depending on:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The type of information and its purpose</li>
                <li>Legal and regulatory requirements</li>
                <li>Your continued use of our services</li>
                <li>Legitimate business needs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information 
                from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, 
                please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers 
                comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, 
                or other factors. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@globaleye.live<br/>
                  <strong>Address:</strong> GlobalEye News, New York, NY 10001<br/>
                  <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                This Privacy Policy is effective as of the date listed above and applies to all users of our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
