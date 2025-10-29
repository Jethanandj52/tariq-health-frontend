import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import showpassword from "../../assets/showpassword.svg";
import hidepassword from "../../assets/hidepassword.svg";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill both fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `https://hackathon-backend-flax.vercel.app/auth/reset-password/${token}`,
        { newPassword: password }
      );

      toast.success(res.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-teal-200 relative overflow-hidden">
      {/* Decorative Gradient Blobs */}
      <div className="absolute w-80 h-80 bg-green-400/30 rounded-full blur-3xl top-12 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-teal-400/30 rounded-full blur-3xl bottom-12 right-10 animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl w-[400px] p-8 text-gray-800 transition-all hover:shadow-green-200/50">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 drop-shadow-md mb-3">
          Reset Password
        </h1>
        <p className="text-center text-gray-700 mb-8 text-sm">
          🔒 Naya password set karo aur apni sehat data ko surakshit rakho 💚
        </p>

        {/* New Password Field */}
        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-2 text-green-700">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 pr-10 placeholder-gray-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-11 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 relative">
          <label className="block text-sm font-semibold mb-2 text-green-700">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 pr-10 placeholder-gray-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-11 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 active:scale-95"
        >
          Reset Password
        </button>

        {/* Back to Login */}
        <div className="text-sm text-center mt-6 text-green-700 font-medium">
          Back to{" "}
          <Link to="/" className="underline hover:text-green-900">
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-600 mt-8 text-center italic leading-relaxed">
          “Apna password strong rakho — sehat aur data dono surakshit rakho 💚”
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
