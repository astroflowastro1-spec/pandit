import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export const metadata = {
  title: "Terms and Conditions | Mere Pandit Ji",
  description: "Terms and conditions for using Mere Pandit Ji services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#F26622] transition-colors">Home</Link>
          <FiChevronRight className="text-gray-400" />
          <span className="text-gray-900 font-medium">Terms & Conditions</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-serif">Terms and Conditions</h1>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              A product of Digital Disha Astro Spiritual LLP<br/>
              LLPIN: ACS-6431 | GSTIN: 03AAYFD9772A1Z6<br/>
              www.merepanditji.org<br/>
              Registered Office: SCO 35, Second Floor, Balaji Complex, Dhakoli, Zirakpur – 140603, SAS Nagar, Mohali, Punjab<br/>
              <span className="mt-4 block font-bold text-gray-900">Effective Date: 10 July 2026</span>
            </p>
          </div>

          <div className="prose prose-emerald max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            <p className="font-bold text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-200">
              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY ACCESSING OR USING THE MERE PANDIT JI PLATFORM, YOU AGREE TO BE BOUND BY ALL OF THE FOLLOWING TERMS AND CONDITIONS AND OUR PRIVACY POLICY.
            </p>

            <h3>1. INTRODUCTION</h3>
            <p><strong>1.1</strong> The website www.merepanditji.org and the mobile application on Android and iOS platforms, ‘Mere Pandit Ji’ (together, the “Platform”), are owned and operated by Digital Disha Astro Spiritual LLP, a limited liability partnership incorporated in India (LLPIN: ACS-6431), having its registered office at SCO 35, Second Floor, Balaji Complex, Dhakoli, Zirakpur – 140603, SAS Nagar, Mohali, Punjab, India, and includes any of its affiliates, associates, assignees or successors-in-interest as determined by it at its sole discretion (“Company”, “we”, “us” or “our”). Your (“you”, “your” or “User”) use of the services offered through the Platform (“Services”) is governed by these Terms and Conditions (“Terms of Use”).</p>
            <p><strong>1.2</strong> Please read these Terms of Use together with our Privacy Policy, available on the Platform, and all other rules, guidelines and policies published on the Platform from time to time, as they together govern your use of the Platform and the Services.</p>
            <p><strong>1.3</strong> By downloading, accessing, browsing or using the Platform in any manner, you signify your acceptance of these Terms of Use and the Privacy Policy. If you do not agree with any part of these Terms of Use, you must discontinue use of the Platform and the Services immediately.</p>
            <p><strong>1.4</strong> These Terms of Use constitute an electronic record under the Information Technology Act, 2000 and the rules made thereunder, and are published in accordance with Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. This is a computer-generated electronic record and does not require any physical or digital signature.</p>

            <h3>2. DEFINITIONS</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>“Astrologer/Pandit”</strong> means an independent third-party astrologer, priest, purohit or spiritual consultant empanelled or listed on the Platform to render Services to Users.</li>
              <li><strong>“Chadhava/Offering”</strong> means any devotional offering, or temple offering booked by a User through the Platform to be performed at a temple or by a Pandit on the User’s behalf.</li>
              <li><strong>“Kundli/Digital Report”</strong> means any computer-generated or astrologer-prepared horoscope, birth chart, numerology or matchmaking report delivered to the User in digital form.</li>
              <li><strong>“Puja”</strong> means any religious ritual or ceremony booked by a User through the Platform, whether performed individually (“Vyaktigat Puja”) or collectively with other devotees (“Samuhik Puja”).</li>
              <li><strong>“Spiritual Products”</strong> means physical products including but not limited to rudraksha, gemstones, crystals, yantras, bracelets, malas and other devotional or spiritual merchandise sold through the Platform.</li>
              <li><strong>“Wallet”</strong> means the Platform’s internal digital ledger through which cashback, promotional credit or refunds may be credited to a User’s account for use towards future Services.</li>
            </ul>

            <h3>3. ACCEPTANCE OF TERMS</h3>
            <p><strong>3.1</strong> By registering, signing up, downloading the application, or otherwise accessing or using the Platform, you acknowledge that you have read, understood and agreed to be bound by these Terms of Use and the Privacy Policy. If you do not accept these Terms of Use in their entirety, you must not use the Platform.</p>
            <p><strong>3.2</strong> Continued use of the Platform following any update to these Terms of Use constitutes your acceptance of the revised Terms of Use.</p>

            <h3>4. USER ELIGIBILITY & REGISTRATION</h3>
            <p><strong>4.1</strong> Only persons who are competent to contract under the Indian Contract Act, 1872 may use the Platform and avail the Services. Persons who are minors (under 18 years of age), of unsound mind, or otherwise incompetent to contract, including un-discharged insolvents, are not permitted to register on or use the Platform.</p>
            <p><strong>4.2</strong> You may register and log in to the Platform using your mobile number, email address, or through other authentication mechanisms enabled by the Company from time to time (“Login Details”).</p>
            <p><strong>4.3</strong> You shall not: (i) provide false, inaccurate or fraudulent information while registering; (ii) create an account on behalf of another person without their explicit consent; or (iii) use another person’s Login Details to impersonate them.</p>
            <p><strong>4.4</strong> You are solely responsible for maintaining the confidentiality of your Login Details and for all activities that occur under your account.</p>

            <h3>5. OVERVIEW OF SERVICES</h3>
            <p>Mere Pandit Ji is a technology platform that facilitates the following Services, either directly or through empanelled third-party Astrologers/Pandits and temple partners:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Online Puja Booking, including individual and Samuhik Puja at partner temples;</li>
              <li>Astrology Consultations via call and chat with empanelled Astrologers;</li>
              <li>Chadhava and Temple Offering services performed at partner temples on behalf of Users;</li>
              <li>Sale of Spiritual Products such as rudraksha, gemstones, crystals, yantras and bracelets;</li>
              <li>Kundli, horoscope, numerology and other digital astrology reports;</li>
              <li>Wallet, cashback and promotional offers, where applicable.</li>
            </ul>
            <p><strong>5.1</strong> The Company acts as a technology intermediary/facilitator connecting Users with independent, third-party Astrologers, Pandits and temple partners, and does not itself perform religious rituals or render astrological predictions unless expressly stated.</p>

            <h3>6. USER RESPONSIBILITIES & PROHIBITED ACTIVITIES</h3>
            <p>By using the Platform, you represent, warrant and agree that you shall not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>violate any applicable law, regulation, or these Terms of Use while using the Platform or Services;</li>
              <li>resell, sublicense or make any commercial use of the Services without our prior written consent;</li>
              <li>reverse engineer, decompile or disassemble any part of the Platform, except where expressly permitted by law;</li>
              <li>upload or transmit any virus, malware or harmful code, or otherwise attempt to disrupt, damage or overburden the Platform;</li>
              <li>post or transmit content that is defamatory, obscene, threatening, hateful, or that promotes violence, self-harm, black magic, witchcraft or superstition-based exploitation;</li>
              <li>infringe any intellectual property, privacy or other rights of the Company or any third party;</li>
              <li>use automated means (bots, scrapers or crawlers) to access or extract data from the Platform;</li>
              <li>bypass or interfere with any security feature, rate-limit or access-restriction implemented on the Platform.</li>
            </ul>

            <h3>7. ASTROLOGY CONSULTATION TERMS (CALL & CHAT)</h3>
            <p><strong>7.1</strong> Astrology consultations are offered on a paid, per-minute or fixed-duration basis, through call or chat, with empanelled Astrologers listed on the Platform.</p>
            <p><strong>7.2</strong> Charges are computed based on the actual duration of the consultation as recorded by the Platform’s systems, and such records shall be treated as conclusive for billing purposes, absent manifest error.</p>
            <p><strong>7.3</strong> If a call disconnects within the first 2 (two) minutes due to a technical or network issue not attributable to the User, no charge shall be levied for that session. If the call exceeds 3 (three) minutes, per-minute charges shall apply for the entire duration of the call, irrespective of the cause of disconnection thereafter.</p>
            <p><strong>7.4</strong> Astrologers and Pandits listed on the Platform are independent third-party service providers and are not employees, agents or representatives of the Company. The Company does not verify, endorse or guarantee the accuracy of any prediction, advice or guidance rendered by such Astrologers.</p>

            <h3>8. ONLINE PUJA BOOKING TERMS</h3>
            <p><strong>8.1</strong> Users may book individual (Vyaktigat) or collective (Samuhik) Pujas through the Platform, to be performed at partner temples or by empanelled Pandits, on a date and Tithi selected by the User at the time of booking.</p>
            <p><strong>8.2</strong> Any discrepancy in the performance of the Puja, including but not limited to mispronunciation of the User’s name or Sankalp, must be reported to the Company in writing within 7 (seven) days of the scheduled Puja date or of receipt of the video recording of the Puja, whichever is later, failing which the Services shall be deemed satisfactorily completed.</p>
            <p><strong>8.3</strong> A video or photographic record of the Puja, where offered, shall ordinarily be shared with the User within 3–4 (three to four) working days of performance of the Puja.</p>
            <p><strong>8.4</strong> Pujas are performed in accordance with Vedic and Sanatan traditions to the best of the ability of the empanelled Pandit; however, the Company does not guarantee any specific spiritual, material or personal outcome or benefit arising from performance of the Puja.</p>

            <h3>9. CHADHAVA & TEMPLE OFFERING TERMS</h3>
            <p><strong>9.1</strong> Chadhava and temple offering services are performed at partner temples on behalf of the User, in accordance with the customs and practices followed at the relevant temple.</p>
            <p><strong>9.2</strong> Where a User has subscribed to a recurring/auto Chadhava, the User may cancel future/upcoming instances at any time; however, no refund shall be processed for Chadhava services already performed prior to cancellation.</p>
            <p><strong>9.3</strong> Any complaint regarding non-performance, mis-performance, or delay in delivery of the Chadhava video (beyond 10 working days) must be raised within 7 (seven) days of the scheduled date or of receipt of the video, whichever is later.</p>

            <h3>10. SPIRITUAL PRODUCTS & MARKETPLACE TERMS</h3>
            <p><strong>10.1</strong> The Company may sell, or facilitate the sale of, Spiritual Products such as rudraksha, gemstones, crystals, yantras, malas and bracelets, either directly or through third-party sellers/temple partners listed on the Platform.</p>
            <p><strong>10.2</strong> Product images are for representational purposes only; actual products may vary slightly in size, shade, texture or finish owing to their natural or handcrafted origin.</p>
            <p><strong>10.3</strong> Spiritual Products are sold as devotional and spiritual articles only. They are not medical devices, drugs, or therapeutic products, and carry no warranty of medical, psychological or physical benefit of any kind.</p>
            <p><strong>10.4</strong> Shipping timelines communicated at the time of order are indicative estimates only and may vary due to logistics, courier delays, or Force Majeure events (Clause 20).</p>
            <p><strong>10.5</strong> Products may be returned or exchanged only where they arrive damaged, defective, or materially different from what was ordered, and such claim must be raised within 48 (forty-eight) hours of delivery along with photographic/video proof (unboxing video, where required).</p>
            <p><strong>10.6</strong> Energised, customised, or personally blessed/energised products, once dispatched, are non-returnable and non-exchangeable, except where found to be materially defective.</p>

            <h3>11. KUNDLI REPORTS & DIGITAL PRODUCTS</h3>
            <p><strong>11.1</strong> Kundli, horoscope, matchmaking and numerology reports may be generated by automated/AI-assisted systems, by empanelled Astrologers, or a combination of both, based on the birth details furnished by the User.</p>
            <p><strong>11.2</strong> The Company shall not be responsible for any inaccuracy in a report arising from incorrect, incomplete or fraudulent birth details furnished by the User.</p>
            <p><strong>11.3</strong> Once a digital report or Kundli is generated and delivered to the User, it is deemed non-refundable and non-cancellable, except where the report was not delivered at all, was materially incomplete, or where required by applicable law.</p>
            <p><strong>11.4</strong> Any AI-generated or software-assisted horoscope or report is provided for informational and guidance purposes only and does not constitute professional astrological, legal, medical or financial advice.</p>

            <h3>12. WALLET, CASHBACK & PROMOTIONAL OFFERS</h3>
            <p><strong>12.1</strong> Wallet credits, cashback and promotional offers, where made available by the Company, may be used solely towards future Services on the Platform and cannot be withdrawn, transferred, or exchanged for cash unless expressly stated otherwise.</p>
            <p><strong>12.2</strong> The Company reserves the right to modify, withdraw, or impose conditions and expiry timelines on any promotional offer, cashback or Wallet credit at its sole discretion, with or without prior notice.</p>
            <p><strong>12.3</strong> Refunds arising out of Clause 13 may, at the Company’s discretion or with the User’s consent, be credited to the Wallet instead of the original payment method, in which case such refund shall be treated as instantaneous and final.</p>

            <h3>13. CANCELLATION & REFUND POLICY</h3>
            <p>At Mere Pandit Ji, we are committed to providing a smooth and trustworthy experience across Astrology Consultations, Puja Bookings, Chadhava Services and Spiritual Products. We encourage Users to opt for rescheduling wherever possible, rather than cancellation, so as to not miss the intended spiritual benefit of the Service. This Cancellation & Refund Policy sets out the conditions under which refunds shall be considered.</p>
            <p><strong>13.1 Puja Services</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>(a) Refund Requested Before the Puja Date – eligible where: the incorrect package was selected; an incorrect Puja was booked; or in special circumstances such as bereavement in the family, medical emergency, or any other genuine personal reason, provided the request is raised at least 1 (one) day prior to the scheduled Puja. Requests made on the day of the Puja are generally not eligible for a refund once preparations have commenced, save in exceptional circumstances at the Company’s sole discretion.</li>
              <li>(b) Refund Requested Within 7 Days After the Puja Date / Video Delivery – a full refund shall be considered where the issue is attributable to the Company or its Pandit partners, including the User’s name/Sankalp being missed or mispronounced (subject to the User first being offered rescheduling), or where the Puja was cancelled/rescheduled by the Company and the User does not wish to reschedule.</li>
              <li>(c) Duplicate bookings or double payments not attributable to the Company may, as a courtesy and at the Company’s sole discretion, be refunded for the extra/duplicate booking only, provided this is flagged before the Puja commences.</li>
            </ul>
            <p><strong>13.2 Chadhava Services</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>(a) Cancellation requested at least 1 (one) day prior to the scheduled Chadhava is eligible for a refund. Requests to edit the Sankalp after finalisation, where not technically possible, shall also be eligible for a refund.</li>
              <li>(b) For subscription/auto-Chadhava, cancellation stops future instances only; already-processed Chadhava orders are non-refundable.</li>
              <li>(c) Within 7 days of the offering date or receipt of the Chadhava video: refunds shall be considered where the name was missed/mispronounced (subject to rescheduling being offered first), where the Chadhava was not performed as per temple custom, or where the video is delayed beyond 10 working days.</li>
            </ul>
            <p><strong>13.3 Astrology Consultations</strong></p>
            <p>Refunds/credits shall be considered where: network issues attributable to the Astrologer caused a call drop or inaudible call; the Astrologer was unable to communicate in the agreed language; or the Astrologer’s response was delayed beyond 3 (three) minutes without intimation. As set out in Clause 7.3, calls lasting under 2 minutes due to technical failure are not charged; calls exceeding 3 minutes are billed in full regardless of subsequent disconnection.</p>
            <p><strong>13.4 Refund Processing Timeline</strong></p>
            <p>Once a refund request is approved, the refund shall be processed within 7 (seven) to 10 (ten) business days to the original payment method (or to the Wallet, where opted for/applicable). A confirmation message shall be sent to the User once the refund has been processed.</p>
            <p><strong>13.5 Non-Refundable Scenarios</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Discrepancies reported after 7 days of receiving the Puja/Chadhava video;</li>
              <li>Personal-reason cancellations raised after the Puja/Chadhava has commenced;</li>
              <li>Astrology sessions already in progress or completed;</li>
              <li>Dissatisfaction with astrological predictions or outcomes, as astrology is guidance-based and outcomes cannot be guaranteed;</li>
              <li>Digital Kundli/reports already generated and delivered (see Clause 11.3);</li>
              <li>Energised/customised Spiritual Products already dispatched (see Clause 10.6);</li>
              <li>Any case where misuse or abuse of this Policy is suspected, at the Company’s sole discretion.</li>
            </ul>
            <p><strong>13.6 Refund Exceptions</strong></p>
            <p>In the event of Force Majeure (Clause 20) or a verified error attributable to the Company (e.g., missing video, no-show by the Pandit/Astrologer, non-performance of the Puja/Chadhava), the Company shall, at its discretion, process a full refund or offer rescheduling at no additional cost.</p>
            <p><strong>13.7 How to Request a Refund</strong></p>
            <p>Refund and rescheduling requests may be raised by writing to info.merepanditji@gmail.com or by calling our support line at +91 7696705550. By booking any Service on the Platform, Users agree to be bound by this Cancellation & Refund Policy.</p>

            <h3>14. RESCHEDULING POLICY</h3>
            <p><strong>14.1</strong> Where a refund is not available under Clause 13, Users shall ordinarily be offered the option to reschedule the Puja, Chadhava or consultation to a mutually convenient date, subject to availability of the Pandit/Astrologer/temple slot.</p>
            <p><strong>14.2</strong> Rescheduling requests must be raised at least 1 (one) day prior to the originally scheduled date/time, save in genuine emergencies assessed on a case-by-case basis.</p>

            <h3>15. PRICING & PAYMENT TERMS</h3>
            <p><strong>15.1</strong> You agree to pay all charges applicable to the Services availed by you, in the manner and mode notified on the Platform, including via UPI, cards, net-banking, wallets or other payment gateways integrated with the Platform.</p>
            <p><strong>15.2</strong> Prices displayed on the Platform are inclusive of applicable taxes unless stated otherwise, and are subject to periodic revision at the Company’s discretion, with such revision applying prospectively to new bookings.</p>
            <p><strong>15.3</strong> GST-compliant invoices shall be issued for applicable transactions under GSTIN 03AAYFD9772A1Z6. Your network/data operator may separately levy charges for data usage while accessing the Platform, for which the Company bears no responsibility.</p>
            <p><strong>15.4</strong> All payments are processed through third-party, RBI-authorised payment gateways. The Company does not store your complete card or banking credentials and is not responsible for any failure, delay or error on the part of the payment gateway or your bank.</p>

            <h3>16. INTELLECTUAL PROPERTY RIGHTS</h3>
            <p><strong>16.1</strong> All content on the Platform, including but not limited to text, graphics, logos, the “Mere Pandit Ji” name and mark, software, audio/video recordings, Kundli report formats, and the design and “look and feel” of the Platform, is the exclusive property of the Company or its licensors and is protected under applicable Indian intellectual property laws.</p>
            <p><strong>16.2</strong> You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform for your personal, non-commercial use only. No right, title or interest in the Platform or its content is transferred to you.</p>
            <p><strong>16.3</strong> You shall not copy, reproduce, distribute, modify, publicly display, or create derivative works from any content on the Platform without the Company’s prior written consent.</p>

            <h3>17. USER-GENERATED CONTENT</h3>
            <p><strong>17.1</strong> Where the Platform permits Users to submit reviews, ratings, comments or other content (“User Content”), you grant the Company a worldwide, royalty-free, non-exclusive licence to use, reproduce and display such User Content in connection with operating and promoting the Platform.</p>
            <p><strong>17.2</strong> You represent that your User Content does not infringe any third-party rights and is not unlawful, defamatory, obscene or otherwise objectionable. The Company reserves the right to remove any User Content at its sole discretion, without notice.</p>

            <h3>18. THIRD-PARTY ASTROLOGERS, PANDITS & TEMPLE PARTNERS DISCLAIMER</h3>
            <p><strong>18.1</strong> Astrologers, Pandits and temple partners featured on the Platform are independent third parties and are not employees or agents of the Company. The Company facilitates the connection between Users and such third parties but does not control, supervise or guarantee their conduct, competence or the outcome of any Service rendered by them.</p>
            <p><strong>18.2</strong> The Company does not endorse, verify or vouch for the qualifications, predictions, advice or statements made by any Astrologer, Pandit or temple partner, and disclaims all liability arising from reliance on the same.</p>
            <p><strong>18.3</strong> Any dispute between a User and a third-party Astrologer/Pandit/temple partner shall be resolved directly between such parties, and the Company shall not be made a party to, nor bear liability for, such disputes, save to the extent expressly undertaken under Clause 13.</p>

            <h3>19. THIRD-PARTY LINKS</h3>
            <p><strong>19.1</strong> The Platform may contain links to third-party websites or applications, including payment gateways and social media platforms. Such links are provided for convenience only and do not imply endorsement by the Company. The Company is not responsible for the content, privacy practices or terms of use of any linked third-party website or application.</p>

            <h3>20. FORCE MAJEURE</h3>
            <p><strong>20.1</strong> The Company shall not be liable for any failure or delay in performance of its obligations under these Terms of Use where such failure or delay arises out of causes beyond its reasonable control, including but not limited to natural disasters, epidemics/pandemics, war, riots, strikes, governmental action, internet/telecom outages, or failure of third-party payment gateways or logistics partners.</p>

            <h3>21. MEDICAL, FINANCIAL, LEGAL & ASTROLOGY OUTCOME DISCLAIMER</h3>
            <p><strong>21.1</strong> The Services offered on the Platform, including astrology consultations, Kundli reports, Puja and Chadhava services, and Spiritual Products, are rooted in traditional Vedic and Sanatan practices and are provided for informational, guidance and devotional purposes only.</p>
            <p><strong>21.2</strong> The Company makes no representation or warranty regarding the accuracy, reliability or efficacy of any astrological prediction, numerology reading, or the spiritual, material, health, or financial outcome of any Puja, Chadhava or Spiritual Product.</p>
            <p><strong>21.3</strong> Nothing on the Platform constitutes, or is a substitute for, professional medical, psychological, legal or financial advice. Users experiencing physical or mental health concerns are strongly advised to seek advice from a qualified medical practitioner, and should not rely on astrology, numerology or spiritual guidance as a substitute for such professional care.</p>
            <p><strong>21.4</strong> Spiritual Products such as rudraksha, gemstones, crystals and yantras are sold purely as devotional/spiritual articles and are not medical devices, drugs or treatments of any kind, and carry no warranty of therapeutic effect.</p>
            <p><strong>21.5</strong> The Company does not encourage, promote or tolerate content or practices involving black magic, witchcraft, tantrism, or any exploitative or superstition-based practice, and reserves the right to remove any Astrologer/Pandit or content found to be engaging in the same.</p>
            <p><strong>21.6</strong> Restriction of the Platform’s Services to Sanatan Dharma-based practices is not intended to, and shall not be construed to, disrespect or discriminate against any other religion or belief system.</p>

            <h3>22. LIMITATION OF LIABILITY</h3>
            <p><strong>22.1</strong> To the fullest extent permitted by applicable law, in no event shall the Company, its partners, officers, directors or employees be liable for any indirect, incidental, special, punitive or consequential damages arising out of or in connection with your use of, or inability to use, the Platform or the Services, whether based on contract, tort (including negligence), or any other legal theory, even if the Company has been advised of the possibility of such damages.</p>
            <p><strong>22.2</strong> The Services are provided on an “as is” and “as available” basis, without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
            <p><strong>22.3</strong> Notwithstanding anything to the contrary, the Company’s aggregate liability arising out of or relating to these Terms of Use or the Services shall not exceed the amount actually paid by the User for the specific Service giving rise to the claim.</p>

            <h3>23. INDEMNIFICATION</h3>
            <p><strong>23.1</strong> You agree to indemnify and hold harmless the Company, its officers, directors, employees and empanelled Astrologers/Pandits/temple partners from and against any losses, damages, costs, and claims arising out of: (i) your use or misuse of the Platform or Services; (ii) your breach of these Terms of Use; (iii) your violation of any applicable law; or (iv) your infringement of any third-party right.</p>

            <h3>24. PRIVACY & DATA PROTECTION</h3>
            <p><strong>24.1</strong> Your use of the Platform, including any birth details, personal information, or payment information shared with us, is governed by our Privacy Policy published on the Platform, which forms an integral part of these Terms of Use.</p>
            <p><strong>24.2</strong> By using the Platform, you consent to the collection, storage, processing and use of your personal data in accordance with our Privacy Policy and applicable Indian data protection laws, including the Digital Personal Data Protection Act, 2023, to the extent applicable.</p>
            <p><strong>24.3</strong> The Company may use cookies, analytics tools and similar technologies to enhance your experience on the Platform and for internal analytics purposes.</p>

            <h3>25. COMMUNICATIONS & MARKETING CONSENT</h3>
            <p><strong>25.1</strong> By registering on the Platform, you consent to receive transactional and promotional communications from the Company via SMS, WhatsApp, email, call or push notification, including on numbers registered under the National Do Not Disturb (DND) registry.</p>
            <p><strong>25.2</strong> You may opt out of promotional communications at any time by writing to info.merepanditji@gmail.com, without prejudice to transactional communications necessary for the Services.</p>

            <h3>26. SUSPENSION & TERMINATION</h3>
            <p><strong>26.1</strong> The Company may suspend or terminate your access to the Platform at any time, with or without cause or notice, including where fraudulent, illegal or abusive activity is suspected.</p>
            <p><strong>26.2</strong> The Company reserves the right to discontinue the Platform or any Service at any time, at its sole discretion.</p>
            <p><strong>26.3</strong> Provisions which by their nature ought to survive termination – including Intellectual Property (Clause 16), Limitation of Liability (Clause 22), Indemnification (Clause 23) and Governing Law (Clause 27) – shall survive termination of these Terms of Use.</p>

            <h3>27. GOVERNING LAW & JURISDICTION</h3>
            <p><strong>27.1</strong> These Terms of Use shall be governed by and construed in accordance with the laws of India.</p>
            <p><strong>27.2</strong> Subject to Clause 28 (Grievance Redressal), the courts at SAS Nagar (Mohali), Punjab shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms of Use or the Services.</p>

            <h3>28. GRIEVANCE REDRESSAL & GRIEVANCE OFFICER</h3>
            <p>In accordance with the Information Technology Act, 2000, the Consumer Protection (E-Commerce) Rules, 2020, and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, any complaint or grievance regarding the Platform or Services may be addressed to our Grievance Officer:</p>
            <div className="bg-gray-50 rounded-xl p-6 my-6 border border-gray-200">
              <table className="w-full text-left text-sm text-gray-700">
                <tbody>
                  <tr className="border-b border-gray-200"><th className="py-2 pr-4 font-bold">Grievance Officer</th><td className="py-2">Customer Support Team, Digital Disha Astro Spiritual LLP</td></tr>
                  <tr className="border-b border-gray-200"><th className="py-2 pr-4 font-bold">Product</th><td className="py-2">Mere Pandit Ji</td></tr>
                  <tr className="border-b border-gray-200"><th className="py-2 pr-4 font-bold">Phone / WhatsApp</th><td className="py-2">+91 7696705550</td></tr>
                  <tr className="border-b border-gray-200"><th className="py-2 pr-4 font-bold">Email</th><td className="py-2">info.merepanditji@gmail.com</td></tr>
                  <tr className="border-b border-gray-200"><th className="py-2 pr-4 font-bold">Registered Office</th><td className="py-2">SCO 35, Second Floor, Balaji Complex, Dhakoli, Zirakpur – 140603, SAS Nagar, Mohali, Punjab</td></tr>
                  <tr><th className="py-2 pr-4 font-bold">Website</th><td className="py-2">www.merepanditji.org</td></tr>
                </tbody>
              </table>
            </div>
            <p>The Grievance Officer shall acknowledge receipt of any complaint within 24 (twenty-four) hours and shall endeavour to redress it within 15 (fifteen) days from the date of receipt, in accordance with applicable law.</p>

            <h3>29. MODIFICATION OF TERMS OF USE</h3>
            <p><strong>29.1</strong> The Company reserves the right, at its sole discretion, to modify, amend or replace these Terms of Use at any time, by posting the revised Terms of Use on the Platform. It is your responsibility to review these Terms of Use periodically. Continued use of the Platform after such changes constitutes your acceptance of the revised Terms of Use.</p>

            <h3>30. SEVERABILITY</h3>
            <p><strong>30.1</strong> If any provision of these Terms of Use is held to be invalid or unenforceable, such provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</p>

            <h3>31. MISCELLANEOUS</h3>
            <p><strong>31.1</strong> Notices under these Terms of Use shall be in writing and deemed duly given upon receipt, including electronic confirmation of receipt where sent by email.</p>
            <p><strong>31.2</strong> Nothing in these Terms of Use confers any right or benefit on any person other than you and the Company, and no third party shall have any right to enforce any provision hereof.</p>
            <p><strong>31.3</strong> The Company's failure to enforce any right or provision under these Terms of Use shall not constitute a waiver of such right or provision.</p>

            <h3>32. CONTACT US</h3>
            <p>For any questions regarding these Terms of Use, the Services, or to raise a complaint, please contact us at:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Company:</strong> Digital Disha Astro Spiritual LLP (LLPIN: ACS-6431)</li>
              <li><strong>Product:</strong> Mere Pandit Ji</li>
              <li><strong>GSTIN:</strong> 03AAYFD9772A1Z6</li>
              <li><strong>Registered Office:</strong> SCO 35, Second Floor, Balaji Complex, Dhakoli, Zirakpur – 140603, SAS Nagar, Mohali, Punjab</li>
              <li><strong>Website:</strong> www.merepanditji.org</li>
              <li><strong>Customer Support:</strong> +91 7696705550</li>
              <li><strong>Email:</strong> info.merepanditji@gmail.com</li>
            </ul>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mt-12 text-center">
              <p className="font-black text-gray-900 m-0 uppercase tracking-wide">
                YOU CONFIRM THAT YOU HAVE READ, UNDERSTOOD AND VOLUNTARILY AGREE TO BE BOUND BY ALL OF THE ABOVE TERMS AND CONDITIONS.
              </p>
            </div>
            
            <p className="text-sm text-gray-500 text-center mt-8">
              Last updated on: 10 July 2026<br/>
              <strong>DIGITAL DISHA ASTRO SPIRITUAL LLP</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
