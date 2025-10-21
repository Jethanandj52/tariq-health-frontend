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
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl w-[380px] p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-2">
          Reset Password
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Apna naya password set karo 💪 <br /> aur HealthMate ke sath healthy
          raho.
        </p>

        {/* Password Field */}
        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-1">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-9 cursor-pointer"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 relative">
          <label className="block text-sm font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-9 cursor-pointer"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition-all active:scale-95"
        >
          Reset Password
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
          “Apna password strong rakho — sehat aur data dono surakshit rakho 💚”
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
