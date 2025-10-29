import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import showpassword from "../../assets/showpassword.svg";
import hidepassword from "../../assets/hidepassword.svg";
import google from "../../images/google.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const signUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "https://tariq-health-backend.vercel.app/auth/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Account created successfully!", {
        autoClose: 1000,
      });

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-teal-200 relative overflow-hidden">
      {/* 🔵 Decorative Blobs */}
      <div className="absolute w-96 h-96 bg-green-400/30 rounded-full blur-3xl top-16 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-teal-400/30 rounded-full blur-3xl bottom-16 right-10 animate-pulse"></div>

      {/* 🟢 Glass Card */}
      <div className="relative bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl w-[420px] p-8 text-gray-800 transition-all hover:shadow-green-200/50">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-3 drop-shadow-md">
          Create Account
        </h1>
        <p className="text-center text-gray-700 mb-8 text-sm">
          🌿 Join <span className="font-semibold text-green-700">HealthMate</span> —  
          your AI-powered wellness partner 💚
        </p>

        {/* Input fields */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 placeholder-gray-500"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 placeholder-gray-500"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 placeholder-gray-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 pr-10 placeholder-gray-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle password"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-4 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Terms + Link */}
        <div className="flex justify-between items-center text-sm mb-6 text-green-700 font-medium">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="accent-green-600" />
            <span>Remember me</span>
          </label>
          <div>
            Already have an account?{" "}
            <Link to="/" className="underline hover:text-green-900">
              Sign In
            </Link>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={signUp}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 active:scale-95"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-xs text-gray-500 font-semibold">
            or sign up with
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <div className="border border-gray-300 py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2">
            <img src={google} alt="Google" className="w-6" />
            <span className="font-medium text-gray-700">Google</span>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-xs text-gray-600 mt-8 text-center italic leading-relaxed">
          “AI is for understanding only, not for medical advice.”  
          <br />
          <span className="text-green-700">
            “Yeh AI samajhne ke liye hai, ilaaj ke liye nahi.” 💚
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
