import React, { useState, useRef } from "react";
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
    try {
      const res = await axios.post(
        "https://hackathon-backend-flax.vercel.app/auth/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      toast.success("Account created successfully!", { autoClose: 1000 });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error("Signup Failed: " + (err.response?.data || err.message), {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl w-[400px] p-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-3">
          HealthMate Sign Up
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Sehat ka Smart Dost 💚 <br />
          Join now to manage your health smartly.
        </p>

        {/* Input fields */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
         
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
         
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle password"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-9 cursor-pointer"
          />
        </div>

        {/* Terms + Link */}
        <div className="flex justify-between text-sm mb-6 text-green-700 font-medium">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div>
            Already have an account?{" "}
            <Link to="/" className="underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={signUp}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition-all active:scale-95"
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

        {/* Google Login Only */}
        <div className="flex justify-center">
          <div className="border border-gray-300 py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2">
            <img src={google} alt="Google" className="w-6" />
            <span className="font-medium text-gray-700">Google</span>
          </div>
        </div>

        {/* Footer disclaimer */}
        <p className="text-xs text-gray-500 mt-8 text-center italic">
          "AI is for understanding only, not for medical advice."
          <br />
          <span className="text-green-700">
            “Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.”
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
