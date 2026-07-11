import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_live_SdjD9XSXUW7XLr",
  key_secret: "u1FnWXafxXXKQhjjKBXT54au",
});

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    // Convert string to number if needed, and handle formatting
    const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/,/g, "")) : amount;

    const options = {
      amount: Math.round(numericAmount * 100), // Amount in paise/cents
      currency: currency === "$" ? "USD" : "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}
