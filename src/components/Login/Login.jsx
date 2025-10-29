import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import showpassword from "../../assets/showpassword.svg";
import hidepassword from "../../assets/hidepassword.svg";
import google from "../../images/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "https://hackathon-backend-flax.vercel.app/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify({ email }));

      toast.success("Welcome back!", { autoClose: 1000 });

      setTimeout(() => {
        if (email === "admin@gmail.com") navigate("/Dashboard");
        else navigate("/Home");
      }, 1000);
    } catch (err) {
      toast.error("Login Failed: " + (err.response?.data || err.message), {
        autoClose: 2000,
      });
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-teal-200 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-teal-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl w-[400px] p-8 text-gray-800 dark:text-white transition-all hover:shadow-green-200/50">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 dark:text-green-400 drop-shadow-md mb-2">
          HealthMate
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-8 text-sm">
          Sehat ka Smart Dost 💚  
          <br />Login to continue your health journey.
        </p>

        {/* Email Input */}
        <div className="mb-5">
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

        {/* Password Input */}
        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-2 text-green-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none bg-white/60 pr-10 placeholder-gray-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-10 cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm mb-6 text-green-700 font-medium">
          <Link to="/Forget" className="underline hover:text-green-900">
            Forgot password?
          </Link>
          <Link to="/SignUp" className="underline hover:text-green-900">
            Create an account
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 active:scale-95"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-xs text-gray-500 font-semibold">
            or continue with
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <div className="flex justify-center">
          <div className="border border-gray-300 bg-white/70 py-2 px-6 rounded-xl cursor-pointer hover:bg-white/90 active:scale-95 flex items-center gap-2 shadow-sm transition-all">
            <img src={google} alt="Google" className="w-6" />
            <span className="font-medium text-gray-700">Google</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-600 mt-8 text-center italic leading-relaxed">
          “AI is for understanding only, not for medical advice.”  
          <br />
          <span className="text-green-700">
            “Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.”
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
