import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-50 to-emerald-100 text-gray-700 border-t border-green-200 dark:from-gray-900 dark:to-gray-800 dark:text-gray-300 dark:border-gray-700 transition-colors duration-300">
      
      {/* 🔹 Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* 🩺 Logo & Description */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold mb-3 text-green-700 dark:text-green-400">
            HealthMate 🩺
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
            Your AI-powered health companion — helping you understand medical
            reports, track your progress, and make informed health decisions
            every day.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-green-600 dark:hover:text-green-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-green-600 dark:hover:text-green-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/doctors"
                className="hover:text-green-600 dark:hover:text-green-400 transition"
              >
                Our Doctors
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-green-600 dark:hover:text-green-400 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              <span className="block">📧 support@healthmate.com</span>
            </li>
            <li>
              <span className="block">📞 +92 300 9876543</span>
            </li>
            <li>
              <span className="block">📍 Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Bottom Bar */}
      <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-green-100 dark:border-gray-800">
        © {new Date().getFullYear()} <span className="font-semibold text-green-600 dark:text-green-400">HealthMate</span>.  
        All rights reserved. Empowering Health with AI 🌿
      </div>
    </footer>
  );
};

export default Footer;
