import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
  try {
    await connectDb();

    let body;
    try {
      body = await req.json(); // if client sends JSON
    } catch {
      let fd = await req.formData(); // if form-data
      body = Object.fromEntries(fd);
    }

    // Find payment in DB
    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!payment) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // Get user secret
    const user = await User.findOne({ username: payment.to_user });
    if (!user?.razorpaysecret) {
      return NextResponse.json({ success: false, message: "User secret not found" }, { status: 400 });
    }

    // Verify signature
    const verified = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      user.razorpaysecret
    );

    if (!verified) {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }

    // Update payment status
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
};
