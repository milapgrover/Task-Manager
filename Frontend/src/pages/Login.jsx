import { useState } from "react";
import { loginUser } from "../services/authService";
import { setToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-16">

        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-md"></div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-2">Welcome Back !</h2>
        <p className="text-gray-500 mb-8">Please enter your details</p>

        {/* Form */}
        <div className="w-full max-w-sm">

          {/* Email */}
          <label className="text-sm text-gray-600">Email Address</label>
          <input
            type="email"
            className="w-full mt-1 mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full mt-1 mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="text-blue-600 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login →
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            By creating an account, you agree to our{" "}
            <span className="text-blue-600">Terms of Service</span> and{" "}
            <span className="text-blue-600">Privacy Policy</span>
          </p>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer">Sign Up</span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-[350px] text-white text-center">

          {/* Image */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="illustration"
            className="w-40 mx-auto mb-6"
          />

          {/* Text */}
          <h3 className="text-xl font-semibold mb-2">
            Seamless work experience
          </h3>
          <p className="text-sm text-gray-200">
            Everything you need in an easily customizable dashboard
          </p>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}