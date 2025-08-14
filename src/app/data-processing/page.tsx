import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Processing Agreement - GlobalEye News',
  description: 'Our data processing agreement outlines how we handle and protect your personal data in compliance with data protection regulations.',
};

export default function DataProcessingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Processing Agreement</h1>
          
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
                This Data Processing Agreement (DPA) is entered into between GlobalEye News ("Data Controller") 
                and our data processing partners ("Data Processors") to ensure compliance with data protection 
                regulations, including the General Data Protection Regulation (GDPR) and other applicable laws.
              </p>
              <p className="text-gray-700 mb-4">
                This agreement outlines the terms and conditions under which personal data is processed, 
                ensuring that all data processing activities are conducted in accordance with legal requirements 
                and best practices for data protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Definitions</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Terms</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable person</li>
                    <li><strong>Data Controller:</strong> GlobalEye News, who determines the purposes and means of processing</li>
                    <li><strong>Data Processor:</strong> Third-party services that process data on our behalf</li>
                    <li><strong>Data Subject:</strong> The individual whose personal data is being processed</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Processing Activities</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li><strong>Collection:</strong> Gathering personal data from various sources</li>
                    <li><strong>Storage:</strong> Securely storing data in our systems</li>
                    <li><strong>Analysis:</strong> Processing data for business insights</li>
                    <li><strong>Sharing:</strong> Limited sharing with authorized partners</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Processing Principles</h2>
              
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Lawfulness, Fairness, and Transparency</h3>
                  <p className="text-purple-700">
                    We process personal data lawfully, fairly, and in a transparent manner. 
                    All processing activities are based on legitimate legal grounds, and we 
                    provide clear information about how data is used.
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Purpose Limitation</h3>
                  <p className="text-blue-700">
                    Personal data is collected for specified, explicit, and legitimate purposes. 
                    We do not process data in ways that are incompatible with these purposes.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Data Minimization</h3>
                  <p className="text-green-700">
                    We only collect and process personal data that is adequate, relevant, 
                    and limited to what is necessary for the intended purposes.
                  </p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">Accuracy</h3>
                  <p className="text-yellow-700">
                    We take reasonable steps to ensure that personal data is accurate and, 
                    where necessary, kept up to date. Inaccurate data is corrected or deleted.
                  </p>
                </div>
                
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Storage Limitation</h3>
                  <p className="text-red-700">
                    Personal data is kept in a form that permits identification for no longer 
                    than necessary for the purposes for which it is processed.
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">Integrity and Confidentiality</h3>
                  <p className="text-indigo-700">
                    We implement appropriate technical and organizational measures to ensure 
                    the security of personal data, including protection against unauthorized 
                    processing and accidental loss.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legal Basis for Processing</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Consent</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li>Explicit consent for marketing communications</li>
                    <li>Consent for cookies and tracking technologies</li>
                    <li>Consent for third-party data sharing</li>
                    <li>Right to withdraw consent at any time</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Legitimate Interest</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>Providing and improving our services</li>
                    <li>Security and fraud prevention</li>
                    <li>Business analytics and insights</li>
                    <li>Customer support and communication</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Contract Performance</h3>
                <p className="text-gray-700">
                  Processing necessary for the performance of a contract with the data subject 
                  or for taking steps at the request of the data subject prior to entering into a contract.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Processing Activities</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">User Account Management</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li>Account creation and authentication</li>
                    <li>Profile management and preferences</li>
                    <li>Login and security monitoring</li>
                    <li>Account deletion and data retention</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Content Personalization</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>Article recommendations</li>
                    <li>Category preferences</li>
                    <li>Reading history analysis</li>
                    <li>Content optimization</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Analytics and Performance</h3>
                  <ul className="list-disc pl-6 text-purple-700 space-y-2">
                    <li>Website usage analytics</li>
                    <li>Performance monitoring</li>
                    <li>User behavior analysis</li>
                    <li>Service improvement insights</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">Communication and Support</h3>
                  <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                    <li>Customer support requests</li>
                    <li>Newsletter communications</li>
                    <li>Feedback and surveys</li>
                    <li>Service notifications</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security Measures</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Technical Security</h3>
                  <ul className="list-disc pl-6 text-red-700 space-y-2">
                    <li>Encryption in transit and at rest</li>
                    <li>Secure authentication systems</li>
                    <li>Regular security updates</li>
                    <li>Intrusion detection and prevention</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Organizational Security</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>Employee training and awareness</li>
                    <li>Access control and monitoring</li>
                    <li>Incident response procedures</li>
                    <li>Regular security audits</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Subject Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Access and Control</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li>Right to access personal data</li>
                    <li>Right to rectification</li>
                    <li>Right to erasure (right to be forgotten)</li>
                    <li>Right to data portability</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Processing Control</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>Right to restrict processing</li>
                    <li>Right to object to processing</li>
                    <li>Right to withdraw consent</li>
                    <li>Right to lodge complaints</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Exercise of Rights</h3>
                <p className="text-gray-700">
                  Data subjects can exercise their rights by contacting us at privacy@globaleye.live. 
                  We will respond to all requests within 30 days and provide the requested information 
                  or take the requested action free of charge.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention and Deletion</h2>
              
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Retention Periods</h3>
                <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                  <li><strong>Account Data:</strong> Retained while account is active, deleted within 30 days of account closure</li>
                  <li><strong>Usage Analytics:</strong> Retained for 2 years for business insights</li>
                  <li><strong>Communication Data:</strong> Retained for 3 years for customer support</li>
                  <li><strong>Legal Records:</strong> Retained as required by applicable laws</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Deletion Procedures</h3>
                <ul className="list-disc pl-6 text-red-700 space-y-2">
                  <li>Secure deletion of data from all systems</li>
                  <li>Notification to third-party processors</li>
                  <li>Confirmation of deletion completion</li>
                  <li>Documentation of deletion activities</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Processors</h2>
              <p className="text-gray-700 mb-4">
                We work with carefully selected third-party processors who help us provide our services. 
                All processors are bound by strict data processing agreements and security requirements.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Service Providers</h3>
                  <ul className="list-disc pl-6 text-blue-700 space-y-2">
                    <li>Cloud hosting and storage services</li>
                    <li>Analytics and monitoring tools</li>
                    <li>Customer support platforms</li>
                    <li>Email and communication services</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Processor Requirements</h3>
                  <ul className="list-disc pl-6 text-green-700 space-y-2">
                    <li>GDPR compliance certification</li>
                    <li>Security and privacy audits</li>
                    <li>Data breach notification procedures</li>
                    <li>Sub-processor approval requirements</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Breach Procedures</h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Incident Response</h3>
                  <ul className="list-disc pl-6 text-red-700 space-y-2">
                    <li>Immediate containment and assessment</li>
                    <li>Notification to relevant authorities within 72 hours</li>
                    <li>Communication to affected data subjects</li>
                    <li>Investigation and remediation measures</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">Documentation and Reporting</h3>
                  <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                    <li>Detailed incident documentation</li>
                    <li>Risk assessment and impact analysis</li>
                    <li>Corrective action implementation</li>
                    <li>Lessons learned and process improvement</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Data Protection Officer</h3>
                  <p className="text-blue-700 mb-2"><strong>Email:</strong> dpo@globaleye.live</p>
                  <p className="text-blue-700 mb-2"><strong>Subject:</strong> Data Protection Inquiries</p>
                  <p className="text-blue-700 mb-2"><strong>Response Time:</strong> 24-48 hours</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Privacy Team</h3>
                  <p className="text-green-700 mb-2"><strong>Email:</strong> privacy@globaleye.live</p>
                  <p className="text-green-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-green-700 mb-2"><strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  This agreement ensures your data is protected and processed in compliance with all applicable laws.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Contact Privacy Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
