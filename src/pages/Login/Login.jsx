import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required!");
      return false;
    }
    return true;
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    toast.loading("Logging in...");

    try {
      const response = await fetch("https://audiobook.shellcode.cloud/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("API Response:", data); // Log the API response for debugging

      if (response.ok) {
        toast.success("Login successful!");
        // Save the token in local storage
        localStorage.setItem('token', data.token);
        navigate("/profile"); // Navigate to the profile or another appropriate route
      } else {
        toast.error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("API Request Error:", error); // Log any errors for debugging
      toast.error("Network error or invalid API endpoint");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1F1F1F] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-200 text-center mb-6">
          Login
        </h2>
        <form onSubmit={loginHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-400 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-200 text-black font-semibold rounded hover:bg-gray-300">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          {`Don't have an account? `}
          <Link to="/signup" className="text-gray-200 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;