"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast.success("Thanks for your donation!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                theme: "light",
                transition: Bounce,
            });
            router.push(`/${username}`);
        }
    }, [searchParams, router, username]);

    const getData = async () => {
        const u = await fetchuser(username);
        setcurrentUser(u);
        const dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
    };

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const pay = async (amount) => {
        if (!currentUser.razorpayid) return toast.error("Razorpay ID not configured!");
        const order = await initiate(amount, username, paymentform);
        const options = {
            key: currentUser.razorpayid,
            amount,
            currency: "INR",
            name: "Get Me A Chai",
            description: "Support your favorite creator",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            prefill: {
                name: paymentform.name || "Anonymous",
                email: "guest@example.com",
                contact: "9000090000",
            },
            theme: { color: "#7F00FF" },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    const totalRaised = payments.reduce((a, b) => a + b.amount, 0);

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="relative w-full bg-gray-100">
                <img
                    className="object-cover w-full h-48 md:h-[350px] shadow-md"
                    src={currentUser.coverpic}
                    alt="Cover"
                />
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full overflow-hidden w-32 h-32">
                    <img
                        className="rounded-full object-cover w-full h-full"
                        src={currentUser.profilepic}
                        alt="Profile"
                    />
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">@{username}</h1>
                <p className="text-gray-400">Let&apos;s help {username} get a chai!</p>
                <p className="text-gray-400">
                    {payments.length} Payments · ₹{totalRaised} raised
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-[90%] md:w-[80%] mx-auto mt-12 mb-12">
                <div className="flex-1 bg-slate-900 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Top Supporters</h2>
                    <ul className="space-y-3 text-sm">
                        {payments.length === 0 ? (
                            <li>No payments yet</li>
                        ) : (
                            payments.map((p, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <img src="/avatar.gif" width={33} alt="Avatar" className="rounded-full" />
                                    <span>
                                        {p.name} donated <b>₹{p.amount}</b> – &quot;{p.message}&quot;
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="flex-1 bg-slate-900 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="name"
                            value={paymentform.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />
                        <input
                            type="text"
                            name="message"
                            value={paymentform.message}
                            onChange={handleChange}
                            placeholder="Enter Message"
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />
                        <input
                            type="number"
                            name="amount"
                            value={paymentform.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount (₹)"
                            className="p-3 rounded-lg bg-slate-800 text-white"
                        />
                        <button
                            onClick={() => pay(Number(paymentform.amount) * 100)}
                            disabled={
                                !paymentform.name ||
                                paymentform.name.length < 3 ||
                                !paymentform.message ||
                                paymentform.message.length < 4 ||
                                !paymentform.amount
                            }
                            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 disabled:opacity-50 p-3 rounded-lg font-medium transition cursor-pointer"
                        >
                            Pay
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                        {[10, 20, 30].map((amt) => (
                            <button
                                key={amt}
                                className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition cursor-pointer"
                                onClick={() => pay(amt * 100)}
                            >
                                Pay ₹{amt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
