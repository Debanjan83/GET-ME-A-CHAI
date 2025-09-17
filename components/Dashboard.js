"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateProfile, fetchuser } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});

    useEffect(() => {
        if (!session) {
            router.push("/login");
        } else {
            getData();
        }
    }, [router, session]);

    const getData = async () => {
        if (session?.user?.name) {
            let u = await fetchuser(session.user.name);
            setForm(u);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(form, session.user.name);

        toast.success("Profile Updated!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto py-8 px-6">
                <h1 className="text-center mb-8 text-3xl font-bold text-gray-900 dark:text-white mt-16">
                    Welcome to your Dashboard
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Name
                        </label>
                        <input
                            value={form.name || ""}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            value={form.email || ""}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            value={form.username || ""}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="profilepic"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Profile Picture
                        </label>
                        <input
                            value={form.profilepic || ""}
                            onChange={handleChange}
                            type="text"
                            name="profilepic"
                            id="profilepic"
                            placeholder="Paste image URL"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="coverpic"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Cover Picture
                        </label>
                        <input
                            value={form.coverpic || ""}
                            onChange={handleChange}
                            type="text"
                            name="coverpic"
                            id="coverpic"
                            placeholder="Paste image URL"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="razorpayid"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Razorpay ID
                        </label>
                        <input
                            value={form.razorpayid || ""}
                            onChange={handleChange}
                            type="text"
                            name="razorpayid"
                            id="razorpayid"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="razorpaysecret"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Razorpay Secret
                        </label>
                        <input
                            value={form.razorpaysecret || ""}
                            onChange={handleChange}
                            type="text"
                            name="razorpaysecret"
                            id="razorpaysecret"
                            className="w-full p-2 border rounded-lg bg-gray-50 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full p-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition font-medium text-sm cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Dashboard;
