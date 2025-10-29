import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border-t border-white/20 dark:border-gray-700 backdrop-blur-xl transition-all duration-500">
      
      {/* 🔹 Floating Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>

      {/* 🔹 Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        
        {/* 🩺 Logo & Description */}
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            HealthMate 🩺
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mx-auto sm:mx-0 text-gray-600 dark:text-gray-400">
            Your AI-powered health companion — helping you understand medical
            reports, track your progress, and make informed health decisions
            every day.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-purple-400 text-xl transition-transform transform hover:scale-110"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* 🔗 Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-400 dark:to-pink-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Our Doctors", href: "/doctors" },
              { name: "Contact", href: "/contact" },
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-indigo-500 dark:hover:text-purple-400 transition duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-400 dark:to-pink-400">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>📧 support@healthmate.com</li>
            <li>📞 +92 300 9876543</li>
            <li>📍 Lahore, Pakistan</li>
          </ul>
        </div>
      </div>

      {/* 🔹 Divider Line */}
      <div className="border-t border-gray-200 dark:border-gray-700/50"></div>

      {/* 🔹 Bottom Bar */}
      <div className="text-center py-5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          HealthMate
        </span>
        . All rights reserved — Empowering Health with AI 🌿
      </div>
    </footer>
  );
};

export default Footer;
