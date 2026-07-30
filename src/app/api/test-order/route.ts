import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET() {
  try {
    await dbConnect();
    const newOrder = await Order.create({
      orderId: "order_TEST_" + Date.now(),
      paymentId: "pay_TEST_" + Date.now(),
      signature: "test_signature",
      totalPaid: 2500,
      status: "Paid",
      shippingInfo: {
        name: "Test Customer",
        email: "test@example.com",
        phone: "9876543210",
        address: "123 Demo Street",
        city: "Test City",
        state: "Delhi",
        pincode: "110001",
      },
      items: [
        {
          id: "test_item_1",
          title: "Premium Test Product",
          price: 2500,
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ success: true, message: "Test order created!", order: newOrder });
  } catch (error: any) {
    console.error("Error creating test order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
