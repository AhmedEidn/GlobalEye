import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - GlobalEye News',
  description: 'Read the terms and conditions that govern your use of GlobalEye News services, including your rights and responsibilities as a user.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using GlobalEye News ("the Service"), you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") govern your use of our website, mobile applications, and any other services 
                provided by GlobalEye News ("we," "us," or "our"). Your continued use of the Service constitutes acceptance of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description of Service</h2>
              <p className="text-gray-700 mb-4">
                GlobalEye News is a digital news platform that provides:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Breaking news and current events coverage</li>
                <li>In-depth analysis and investigative journalism</li>
                <li>Opinion pieces and editorial content</li>
                <li>Multimedia content including images and videos</li>
                <li>Newsletter subscriptions and updates</li>
                <li>Interactive features and user engagement tools</li>
                <li>Personalized content recommendations</li>
                <li>Social sharing and favorite article features</li>
                <li>Mobile-responsive design for all devices</li>
                <li>RSS feeds and content syndication</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Accounts and Registration</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Account Creation</h3>
                <p className="text-blue-700 mb-3">
                  To access certain features of our Service, you may be required to create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-blue-700 space-y-1">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Account Security</h3>
                <p className="text-green-700">
                  You are responsible for safeguarding your account credentials and for any activities or actions under your account. 
                  Notify us immediately of any unauthorized use of your account or any other breach of security.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Prohibited Activities</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Violate any applicable laws or regulations</li>
                    <li>• Infringe on intellectual property rights</li>
                    <li>• Harass, abuse, or harm others</li>
                    <li>• Spread false or misleading information</li>
                    <li>• Attempt to gain unauthorized access</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Content Restrictions</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Post offensive or inappropriate content</li>
                    <li>• Use the service for commercial spam</li>
                    <li>• Interfere with service operation</li>
                    <li>• Collect personal data without consent</li>
                    <li>• Impersonate others or entities</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property Rights</h2>
              
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Our Content</h3>
                <p className="text-purple-700 mb-3">
                  The Service and its original content, features, and functionality are owned by GlobalEye News and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-purple-700">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
                  republish, download, store, or transmit any of the material on our Service without our prior written consent.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">User-Generated Content</h3>
                <p className="text-indigo-700 mb-3">
                  By submitting content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                  reproduce, modify, adapt, publish, translate, and distribute such content.
                </p>
                <p className="text-indigo-700">
                  You represent and warrant that you own or control all rights to the content you submit and that such content 
                  does not violate these Terms or any applicable laws.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
                which is incorporated into these Terms by reference. By using our Service, you consent to our collection and use 
                of information as detailed in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimers and Limitations</h2>
              
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Content Accuracy</h3>
                <p className="text-yellow-700">
                  While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, 
                  or reliability of any content on our Service. News and information may change rapidly, and we encourage users 
                  to verify important information from multiple sources.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Availability</h3>
                <p className="text-gray-700">
                  We strive to maintain the availability of our Service, but we do not guarantee uninterrupted access. 
                  The Service may be temporarily unavailable due to maintenance, technical issues, or other factors beyond our control.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Limitation of Liability</h3>
                <p className="text-red-700">
                  To the maximum extent permitted by law, GlobalEye News shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, 
                  arising out of or relating to your use of the Service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Links and Services</h2>
              <p className="text-gray-700 mb-4">
                Our Service may contain links to third-party websites or services that are not owned or controlled by GlobalEye News. 
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
                third-party websites or services.
              </p>
              <p className="text-gray-700 mb-4">
                You acknowledge and agree that GlobalEye News shall not be responsible or liable, directly or indirectly, 
                for any damage or loss caused or alleged to be caused by or in connection with the use of such third-party content, 
                goods, or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, 
                you may simply discontinue using the Service or contact us to delete your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 mb-4">
                Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration 
                in accordance with the rules of the American Arbitration Association, unless prohibited by applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700 mb-4">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use 
                our Service after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@globaleye.live<br/>
                  <strong>Address:</strong> GlobalEye News, New York, NY 10001<br/>
                  <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and 
                interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, 
                and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                These Terms of Service constitute the entire agreement between you and GlobalEye News regarding the use of our Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
