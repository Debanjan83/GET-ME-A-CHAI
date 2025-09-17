import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";

export const POST = async (req) => {
  try {
    await connectDb();

    const { amount, to_user } = await req.json();

    // Init Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
    });

    // Save to DB
    await Payment.create({
      oid: order.id,
      to_user,
      amount,
      done: false,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 });
  }
};
