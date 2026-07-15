import axios from 'axios';

const LIVE_URL = "https://merepanditji.org/api/save-booking";

const testData = {
  signature: "mock_signature", // Bypasses payment verification for testing
  paymentId: "test_pay_live_001",
  orderId: "test_order_live_001",
  pujaTitle: "Test Puja - Live Server Check",
  pujaDate: "2026-07-16",
  pujaLocation: "Varanasi",
  packageId: "pkg_001",
  packageTitle: "Silver Package",
  packagePrice: 1100,
  currency: "INR",
  currencyCode: "INR",
  customerName: "Vikas Test",
  customerPhone: "7018610136",  // Test number
  customerGotra: "Kashyap",
  totalPaid: 1100,
  date: new Date().toISOString()
};

console.log("🚀 Testing WhatsApp on LIVE SERVER: https://merepanditji.org");
console.log("📱 Sending message to: +91 7018610136");
console.log("⏳ Please wait...\n");

try {
  const response = await axios.post(LIVE_URL, testData, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000
  });

  console.log("✅ Live Server Response:");
  console.log(JSON.stringify(response.data, null, 2));
  
  if (response.data.success) {
    console.log("\n🎉 SUCCESS! WhatsApp message should have been sent!");
    console.log("📱 Check WhatsApp on number: +91 7018610136");
  } else {
    console.log("\n⚠️ API responded but may have issues:", response.data);
  }

} catch (error) {
  console.error("❌ FAILED to reach live server!");
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", JSON.stringify(error.response.data, null, 2));
    
    if (error.response.status === 400) {
      console.error("\n💡 Possible cause: Environment variables (AISENSY_API_KEY etc.) not set on Hostinger!");
    }
  } else {
    console.error("Error:", error.message);
  }
}
