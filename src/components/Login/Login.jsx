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
    try {
      const res = await axios.post(
        "https://hackathon-backend-flax.vercel.app/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify({ email }));

      toast.success("Welcome back!", { autoClose: 1000 });

      setTimeout(() => {
        if (email === "admin@gmail.com") {
          navigate("/Dashboard");
        } else {
          navigate("/Home");
        }
      }, 1000);
    } catch (err) {
      toast.error("Login Failed: " + (err.response?.data || err.message), {
        autoClose: 2000,
      });
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl w-[380px] p-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          HealthMate Login
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Sehat ka Smart Dost 💚<br />
          Login to continue your health journey.
        </p>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? hidepassword : showpassword}
            alt="toggle"
            onClick={togglePassword}
            className="w-5 absolute right-3 top-9 cursor-pointer"
          />
        </div>

        {/* Forgot + Signup Links */}
        <div className="flex justify-between text-sm mb-6 text-green-700 font-medium">
          <Link to="/Forget" className="underline">
            Forgot password?
          </Link>
          <Link to="/SignUp" className="underline">
            Create an account
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition-all active:scale-95"
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

        {/* Google Login Only */}
        <div className="flex justify-center">
          <div className="border border-gray-300 py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2">
            <img src={google} alt="Google" className="w-6" />
            <span className="font-medium text-gray-700">Google</span>
          </div>
        </div>

        {/* Footer */}
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

export default Login;
