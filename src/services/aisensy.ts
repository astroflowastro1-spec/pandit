import axios from 'axios';

export const sendWhatsAppConfirmation = async (orderData: any) => {
  const url = process.env.AISENSY_API_URL;
  const apiKey = process.env.AISENSY_API_KEY;
  const campaignName = process.env.AISENSY_CAMPAIGN_NAME;

  if (!url || !apiKey || !campaignName) {
    console.error("AiSensy API credentials are not configured.");
    return;
  }

  try {
    let customerPhone = orderData.customerPhone || orderData.phone;
    if (!customerPhone) {
      console.error("No customer phone number provided.");
      return;
    }

    // Format phone number
    customerPhone = customerPhone.toString().replace(/\D/g, '');
    if (customerPhone.length === 10) {
      customerPhone = '91' + customerPhone;
    }

    if (!customerPhone.startsWith('91') || customerPhone.length < 12) {
      console.error("Invalid phone number format for AiSensy:", customerPhone);
      return;
    }

    // Format product names if there are multiple, or just use the title
    let productName = orderData.pujaTitle || orderData.packageTitle || "Booking";
    
    // In case there's an array of products (though save-booking uses pujaTitle/packageTitle)
    if (orderData.products && Array.isArray(orderData.products)) {
      productName = orderData.products.map((p: any) => `${p.name} ×${p.quantity || 1}`).join(', ');
    }

    // The "Booking Confirmed" campaign expects exactly 2 parameters.
    // To prevent WhatsApp from silently dropping the message due to variable formatting rules (e.g. no newlines),
    // we only pass the Name and the Product Name.
    const payload = {
      apiKey: apiKey,
      campaignName: campaignName,
      destination: customerPhone,
      userName: "Digital Disha Astro Spiritual LLP",
      templateParams: [
        orderData.customerName || "Customer",
        productName
      ],
      source: "website checkout",
    };

    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        console.log("Successfully sent WhatsApp confirmation:", {
          orderId: orderData.orderId || orderData.paymentId,
          customerPhone: customerPhone,
          status: response.status,
          timestamp: new Date().toISOString()
        });
        return; // Success
      } catch (err: any) {
        attempt++;
        console.error(`AiSensy API attempt ${attempt} failed:`, err.message);
        if (attempt >= maxRetries) {
          console.error("Failed to send WhatsApp confirmation after 3 attempts:", {
            orderId: orderData.orderId || orderData.paymentId,
            customerPhone: customerPhone,
            error: err.response?.data || err.message,
            timestamp: new Date().toISOString()
          });
        } else {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

  } catch (error: any) {
    console.error("Error formatting or sending WhatsApp message:", error.message);
  }
};

/**
 * Send an abandoned cart WhatsApp message when user fails to complete payment.
 * Uses the "abondoned cart" campaign on AiSensy.
 */
export const sendAbandonedCartWhatsApp = async (cartData: {
  customerName: string;
  customerPhone: string;
  pujaTitle?: string;
  packageTitle?: string;
  packagePrice?: number;
  productUrl?: string;
}) => {
  const url = process.env.AISENSY_API_URL;
  const apiKey = process.env.AISENSY_API_KEY;

  if (!url || !apiKey) {
    console.error("AiSensy API credentials are not configured.");
    return;
  }

  try {
    let customerPhone = cartData.customerPhone;
    if (!customerPhone) {
      console.error("No customer phone number provided for abandoned cart.");
      return;
    }

    // Format phone number
    customerPhone = customerPhone.toString().replace(/\D/g, '');
    if (customerPhone.length === 10) {
      customerPhone = '91' + customerPhone;
    }

    if (!customerPhone.startsWith('91') || customerPhone.length < 12) {
      console.error("Invalid phone number format for AiSensy:", customerPhone);
      return;
    }

    // Extract first name
    const firstName = (cartData.customerName || "User").split(' ')[0];

    // The "abondoned cart" campaign expects 3 template params — all $FirstName
    const payload = {
      apiKey: apiKey,
      campaignName: "abondoned cart",
      destination: customerPhone,
      userName: firstName,
      templateParams: [
        firstName,
        cartData.pujaTitle || "your Puja",
        cartData.productUrl || "https://merepanditji.org/cart"
      ],
      source: "new-landing-page form",
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      attributes: {},
      paramsFallbackValue: {
        FirstName: "user"
      }
    };

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log("✅ Abandoned cart WhatsApp sent:", {
          customerPhone,
          customerName: cartData.customerName,
          pujaTitle: cartData.pujaTitle,
          status: response.status,
          timestamp: new Date().toISOString()
        });
        return; // Success
      } catch (err: any) {
        attempt++;
        console.error(`Abandoned cart WhatsApp attempt ${attempt} failed:`, err.message);
        if (attempt >= maxRetries) {
          console.error("Failed to send abandoned cart WhatsApp after 3 attempts:", {
            customerPhone,
            error: err.response?.data || err.message,
            timestamp: new Date().toISOString()
          });
        } else {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

  } catch (error: any) {
    console.error("Error sending abandoned cart WhatsApp:", error.message);
  }
};
