import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            setError('Please enter a valid email address.')
            return;
        }
        if(!password) {
            setError('Please enter your password.')
            return;
        }
        else setError('')
            // Login api call
            try {
                const response = await axiosInstance.post("/login",{
                    email:email,
                    password: password
                })
                console.log(response.data)
                if(response.data && response.data.token){
                    localStorage.setItem("token",response.data.token )
                    navigate('/dashboard')
                }
            } catch (error) {
              console.log("Login error:", error.response?.data || error.message);
              setError(error.response?.data?.message || "An unexpected error occurred. Please try again");
}
    }
  return (
    <div>
        <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-4">
  <div className="w-96 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-10 border border-white/20">
    <form onSubmit={handleLogin}>
      {/* Heading */}
      <h4 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Welcome Back
      </h4>
      <p className="text-sm text-gray-700 mb-8 text-center">
        Login to continue managing your notes
      </p>

      {/* Email Input */}
      <input
        type="text"
        placeholder="Email"
        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 
                   focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                   outline-none transition text-sm bg-white/70 backdrop-blur-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password Input */}
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Login Button */}
      <button
        type="submit"
        className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 
                   text-white font-medium shadow-lg hover:scale-[1.02] transition-transform duration-200"
      >
        Login
      </button>

      {/* Signup Link */}
      <p className="text-sm text-center mt-6 text-gray-800">
        Not registered yet?{" "}
        <Link
          to={"/signup"}
          className="font-medium text-purple-700 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  </div>
</div>



    </div>
  )
}

export default Login