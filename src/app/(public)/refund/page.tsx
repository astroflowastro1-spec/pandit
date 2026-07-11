import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Return & Refund Policy | Mere Pandit Ji",
  description: "Return and refund policy for Mere Pandit Ji services.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#F26622] transition-colors">Home</Link>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-900 font-medium">Return & Refund Policy</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-serif">Return & Refund Policy</h1>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              At Mere Pandit Ji, we value transparency and fairness in our services. Please read this policy carefully before making any payment.
            </p>
          </div>

          <div className="prose prose-emerald max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">No Return & No Refund Policy</h2>
            <p className="font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
              All services offered by Mere Pandit Ji are non-returnable and non-refundable.
            </p>
            <p>
              Once a payment is successfully completed, no refunds, cancellations, or returns will be provided under any circumstances. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-8">
              <li>Astrology consultations</li>
              <li>Numerology, vastu, or tarot services</li>
              <li>Varshfal reports</li>
              <li>Puja, hawan, or ritual bookings</li>
              <li>Online or live sessions</li>
              <li>Digital reports, remedies, or personalized guidance</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Reason for No Refund Policy</h3>
            <p className="mb-8">
              Our services are personalized, time-bound, and based on individual details such as date of birth, time of birth, and personal concerns. Once the consultation or preparation begins, the service cannot be reversed or reused.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Missed Appointments</h3>
            <p className="mb-8">
              If you fail to attend a scheduled consultation or session, no refund or rescheduling will be provided unless explicitly mentioned at the time of booking.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Technical Issues</h3>
            <p className="mb-8">
              In case of genuine technical issues from our side that prevent service delivery, Mere Pandit Ji may, at its sole discretion, reschedule the session. Refunds will not be issued.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Acceptance of Policy</h3>
            <p className="mb-8">
              By making a payment on our website or through any official payment link, you acknowledge and agree to this No Return & No Refund Policy.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact Information</h3>
            <p className="mb-4">
              For any clarification regarding this policy, you may contact us at:
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
