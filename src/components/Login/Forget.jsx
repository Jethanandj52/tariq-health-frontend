import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Forget = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    try {
      const res = await axios.post(
        "https://hackathon-backend-flax.vercel.app/auth/forget-password",
        { email },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Reset link sent to your email!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send reset link!",
        { autoClose: 2000 }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-teal-200 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-teal-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl w-[400px] p-8 text-gray-800 dark:text-white">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-400">
            🔐 Forgot Password?
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
            Enter your registered email address. <br />
            We'll send you a password reset link ✉️
          </p>
        </div>

        {/* Input Field */}
        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2 text-green-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 placeholder-gray-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={forgetPassword}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 active:scale-95"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div className="text-center mt-5 text-sm text-green-700">
          Back to{" "}
          <Link
            to="/"
            className="font-semibold underline hover:text-green-800 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Footer Quote */}
        <p className="text-xs text-center text-gray-600 mt-8 italic">
          “Password bhool jao 💭, lekin apni sehat ka khayal rakhna na bhoolo 💚”
        </p>
      </div>
    </div>
  );
};

export default Forget;
