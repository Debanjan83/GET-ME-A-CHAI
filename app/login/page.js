"use client"

import React, { useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const providers = [
    { name: "GitHub", id: "github", icon: <img className="h-6 w-6" src="github.png" alt="GitHub" /> },
]

const Login = () => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title = "Login - Get Me A Chai"
        if (session) router.push("/dashboard")
    }, [router, session])

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-10 text-center text-white">
                <h1 className="text-4xl font-bold mb-6">Welcome to Get Me A Chai</h1>
                <p className="text-gray-300 mb-8">Sign in quickly using one of your favorite accounts</p>

                <div className="w-[180px] flex flex-col gap-4 mx-auto">
                    {providers.map((provider) => (
                        <button
                            key={provider.id}
                            onClick={() => signIn(provider.id)}
                            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-200 transition cursor-pointer"
                        >
                            {provider.icon}
                            <span>{provider.name}</span>
                        </button>
                    ))}
                </div>

                <p className="text-gray-400 mt-8 text-sm">
                    By signing in, you agree to our{" "}
                    <span className="underline cursor-pointer">Terms of Service</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
            </div>
        </div>
    )
}

export default Login
