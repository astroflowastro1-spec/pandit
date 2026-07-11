import React from 'react';

export const metadata = {
  title: 'Privacy Policy - Mere Pandit Ji',
  description: 'Privacy policy and data protection for the Mere Pandit Ji platform.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-200">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="font-semibold text-gray-900">Privacy Policy &ndash; Mere Pandit Ji</p>
          <p>
            At Mere Pandit Ji, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our services.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
          <p>We may collect the following information when you visit our website, fill out a form, or book a consultation:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Date of birth, place of birth, and time of birth (only for astrological services)</li>
            <li>Payment-related details (processed securely via third-party payment gateways)</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Protection & Security</h3>
          <p>
            We take appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure. Your data is accessed only by authorized personnel and is never sold or misused.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Sharing of Information</h3>
          <p>We do not sell, trade, or rent your personal information to third parties.</p>
          <p>Your data may only be shared:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With trusted service providers (such as payment gateways) solely to complete transactions</li>
            <li>When required by law or legal authorities</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Payment Security</h3>
          <p>
            All payments are processed through secure and trusted third-party payment gateways. Mere Pandit Ji does not store your card or bank details.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Cookies & Tracking</h3>
          <p>
            Our website may use cookies to improve browsing experience and understand user behavior. You may choose to disable cookies in your browser settings if you prefer.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. User Consent</h3>
          <p>
            By using our website or services, you consent to the collection and use of your information as described in this Privacy Policy.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Confidentiality of Consultations</h3>
          <p>
            All consultations and personal discussions are kept strictly confidential. Your personal life details, charts, or remedies are never shared without your permission.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Changes to This Policy</h3>
          <p>
            Mere Pandit Ji reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Contact Us</h3>
          <p>If you have any questions or concerns regarding this Privacy Policy, you may contact us at:</p>
          <ul className="list-none space-y-2 mt-4 font-semibold text-gray-900">
            <li>Mere Pandit Ji</li>
            <li>Email: <a href="mailto:info.merepanditji@gmail.com" className="text-[#F26622] hover:underline font-normal">info.merepanditji@gmail.com</a></li>
            <li>Phone/WhatsApp: <a href="https://wa.me/917696705550" target="_blank" rel="noopener noreferrer" className="text-[#F26622] hover:underline font-normal">7696705550</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
