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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl w-[380px] p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Apna registered email likho 📧 <br />
          hum tumhe ek reset link bhejenge.
        </p>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={forgetPassword}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition-all active:scale-95"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div className="text-sm text-center mt-5 text-green-700 font-medium">
          Back to{" "}
          <Link to="/" className="underline">
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-8 text-center italic">
          “Password bhool jao lekin apni sehat ka khayal rakhna na bhoolo 💚”
        </p>
      </div>
    </div>
  );
};

export default Forget;
