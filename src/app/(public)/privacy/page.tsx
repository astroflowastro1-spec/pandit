import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Privacy Policy | Mere Pandit Ji",
  description: "Privacy Policy for Mere Pandit Ji services.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#F26622] transition-colors">Home</Link>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-serif">Privacy Policy</h1>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              At Mere Pandit Ji, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our services.
            </p>
          </div>

          <div className="prose prose-emerald max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Information We Collect</h3>
            <p className="mb-4">
              We may collect the following information when you visit our website, fill out a form, or book a consultation:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-8">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Date of birth, place of birth, and time of birth (only for astrological services)</li>
              <li>Payment-related details (processed securely via third-party payment gateways)</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. How We Use Your Information</h3>
            <p className="mb-4">
              Your information is used strictly for:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-8">
              <li>Providing astrology, numerology, vastu, and related consultation services</li>
              <li>Contacting you regarding appointments, confirmations, or follow-ups</li>
              <li>Sharing service updates, offers, or important notifications (only if relevant)</li>
              <li>Improving our services and user experience</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Data Protection & Security</h3>
            <p className="mb-8">
              We take appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure. Your data is accessed only by authorized personnel and is never sold or misused.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Sharing of Information</h3>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties.<br/>
              Your data may only be shared:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-8">
              <li>With trusted service providers (such as payment gateways) solely to complete transactions</li>
              <li>When required by law or legal authorities</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Payment Security</h3>
            <p className="mb-8">
              All payments are processed through secure and trusted third-party payment gateways. Mere Pandit Ji does not store your card or bank details.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Cookies & Tracking</h3>
            <p className="mb-8">
              Our website may use cookies to improve browsing experience and understand user behavior. You may choose to disable cookies in your browser settings if you prefer.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. User Consent</h3>
            <p className="mb-8">
              By using our website or services, you consent to the collection and use of your information as described in this Privacy Policy.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">8. Confidentiality of Consultations</h3>
            <p className="mb-8 bg-emerald-50 p-4 rounded-xl border border-emerald-100 font-medium">
              All consultations and personal discussions are kept strictly confidential. Your personal life details, charts, or remedies are never shared without your permission.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">9. Changes to This Policy</h3>
            <p className="mb-8">
              Mere Pandit Ji reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">10. Contact Us</h3>
            <p className="mb-4">
              If you have any questions or concerns regarding this Privacy Policy, you may contact us at:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <ul className="space-y-2">
                <li><strong>Mere Pandit Ji</strong></li>
                <li><strong>Email:</strong> info.merepanditji@gmail.com</li>
                <li><strong>Phone/WhatsApp:</strong> +91-7696705550</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
