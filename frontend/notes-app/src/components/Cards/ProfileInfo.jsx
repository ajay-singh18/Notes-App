import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo,onLogout}) => {
  const name = userInfo?.fullName || "User"
  return (
   <div className="flex items-center gap-4 p-3 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
  {/* Avatar Circle */}
  <div className="w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md">
    {getInitials(name)}
  </div>

  {/* User Info */}
  <div className="flex flex-col">
    <p className="text-sm font-semibold text-gray-900">{name}</p>
    <button
      className="text-xs text-gray-500 hover:text-red-500 hover:underline transition-all duration-200"
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
</div>

  )
}

export default ProfileInfo