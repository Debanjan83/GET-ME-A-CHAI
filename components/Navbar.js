"use client"
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link
          href="/"
          className="logo font-bold text-lg flex items-center gap-2 hover:opacity-80 transition"
        >
          <img className="invertImg" src="tea.gif" width={40} alt="Logo" />
          <span className="text-xl hidden sm:block">Get Me A Chai!</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
                >
                  Welcome {session.user.email}
                  <svg
                    className={`w-3 h-3 transition-transform ${showDropdown ? "rotate-180" : ""
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-md text-gray-700 dark:bg-gray-800 dark:text-gray-200 transition ${showDropdown ? "block" : "hidden"
                    }`}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${session.user.name}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Your Page
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <button
                onClick={() => signOut()}
                className="bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-3 space-y-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block px-2 py-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                href={`/${session.user.name}`}
                className="block px-2 py-2 rounded hover:bg-gray-700"
              >
                Your Page
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-2 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="w-full px-2 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
