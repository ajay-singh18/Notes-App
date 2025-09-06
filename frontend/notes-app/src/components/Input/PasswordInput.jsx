import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput = ({value,onChange,placeholder}) => {
    const [isShowPassword,setIsShowPassword] = useState(false)
    const toggleShowPassword = ()=>{
        setIsShowPassword(!isShowPassword);
    }
  return (
   <div className="flex items-center bg-white/70 border border-gray-300 
                px-4 rounded-lg mb-4 shadow-sm focus-within:border-pink-500 
                focus-within:ring-2 focus-within:ring-pink-200 transition">
  <input
    value={value}
    onChange={onChange}
    type={isShowPassword ? "text" : "password"}
    placeholder={placeholder || "Password"}
    className="w-full text-sm bg-transparent py-3 mr-3 outline-none text-gray-700 placeholder-gray-400"
  />
  {isShowPassword ? (
    <FaRegEye
      size={20}
      className="text-pink-500 hover:text-pink-600 cursor-pointer transition"
      onClick={toggleShowPassword}
    />
  ) : (
    <FaRegEyeSlash
      size={20}
      className="text-gray-400 hover:text-gray-600 cursor-pointer transition"
      onClick={toggleShowPassword}
    />
  )}
</div>

  )
}

export default PasswordInput