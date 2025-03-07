import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required!");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    toast.loading("Signing up...");

    try {
      const response = await fetch("https://audiobook.shellcode.cloud/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Sign up successful!");
        // Optionally, you can store the token in local storage or a context provider
        // localStorage.setItem('token', data.token);
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to sign up");
      }
    } catch (error) {
      toast.error("Network error or invalid API endpoint");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1F1F1F] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-200 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={signUpHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-400 text-sm mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 rounded bg-[#151515] text-gray-200 outline-none focus:ring-2 focus:ring-gray-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-200 text-black font-semibold rounded hover:bg-gray-300">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          {`Already have an account? `}
          <Link to="/login" className="text-gray-200 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;