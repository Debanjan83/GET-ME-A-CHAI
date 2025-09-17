import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src="tea.gif" alt="Logo" width={35} className="invertImg" />
          <span className="font-semibold text-lg">Get Me A Chai!</span>
        </div>

        <p className="text-sm text-gray-300 text-center md:text-right">
          © {currentYear} Get Me A Chai — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
