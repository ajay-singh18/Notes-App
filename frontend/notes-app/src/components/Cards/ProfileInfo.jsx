import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo,onLogout}) => {
  const name = userInfo?.fullName || "User"
  return (
   <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 
    bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl 
    transition-all duration-300 cursor-pointer hover:-translate-y-1">
  
  {/* Avatar Circle */}
  <div className="w-12 h-12 flex items-center justify-center rounded-full 
      text-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
      text-white shadow-lg ring-2 ring-white/50">
    {getInitials(name)}
  </div>

  {/* User Info */}
  <div className="flex flex-col">
    <p className="text-sm font-semibold text-gray-800 tracking-wide">
      {name}
    </p>
    <button
      className="text-xs mt-0.5 text-gray-500 hover:text-red-500 font-medium 
        transition-colors duration-200"
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
</div>


  )
}

export default ProfileInfo