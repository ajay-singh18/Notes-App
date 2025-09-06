import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");
    // Signup api call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again"
      );
    }
  };
  return (
    <div>
      <Navbar />
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 px-4">
  <div className="w-96 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-10 border border-white/20">
    <form onSubmit={handleSignUp}>
      {/* Heading */}
      <h4 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Create Account
      </h4>
      <p className="text-sm text-gray-700 mb-8 text-center">
        Join us and start managing your notes smarter ✨
      </p>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 
                   focus:border-pink-500 focus:ring-2 focus:ring-pink-200 
                   outline-none transition text-sm bg-white/70 backdrop-blur-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email Input */}
      <input
        type="text"
        placeholder="Email"
        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 
                   focus:border-pink-500 focus:ring-2 focus:ring-pink-200 
                   outline-none transition text-sm bg-white/70 backdrop-blur-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password Input */}
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 
                   text-white font-medium shadow-lg hover:scale-[1.02] 
                   transition-transform duration-200"
      >
        Create New Account
      </button>

      {/* Already have account */}
      <p className="text-sm text-center mt-6 text-gray-800">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="font-medium text-pink-700 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

    </div>
  );
};

export default SignUp;
