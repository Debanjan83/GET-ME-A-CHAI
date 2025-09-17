"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB();

        const user = await User.findOne({ username: to_username });
        if (!user) {
            console.error(`User not found for username: ${to_username}`);
            return { error: "User not found" };
        }

        const instance = new Razorpay({
            key_id: user.razorpayid,
            key_secret: user.razorpaysecret,
        });

        const options = {
            amount: Number.parseInt(amount),
            currency: "INR",
        };

        const order = await instance.orders.create(options);

        await Payment.create({
            oid: order.id,
            to_user: to_username,
            amount: amount / 100,
            amountPaise: amount,
            name: paymentform.name,
            message: paymentform.message,
            done: false,
        });

        return order;
    } catch (err) {
        console.error("Error in initiate:", err);
        return { error: "Failed to initiate payment" };
    }
};

export const fetchuser = async (username) => {
    await connectDB();
    const u = await User.findOne({ username });
    if (!u) return null;
    return u.toObject({ flattenObjectIds: true });
};

export const fetchpayments = async (username) => {
    await connectDB();
    return await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(10)
        .lean();
};

export const updateProfile = async (data, oldusername) => {
    await connectDB();

    let ndata;
    if (typeof data.entries === "function") {
        ndata = Object.fromEntries(data);
    } else {
        ndata = data;
    }

    if (oldusername !== ndata.username) {
        const existing = await User.findOne({ username: ndata.username });
        if (existing) {
            return { error: "Username already exists" };
        }
        await User.updateOne({ email: ndata.email }, ndata);
        await Payment.updateMany(
            { to_user: oldusername },
            { to_user: ndata.username }
        );
    } else {
        await User.updateOne({ email: ndata.email }, ndata);
    }

    return { success: true };
};
