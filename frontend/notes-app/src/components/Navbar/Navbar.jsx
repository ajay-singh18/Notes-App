import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from "react-router-dom";


export const Navbar = ({userInfo}) => {
  const [searchQuery,setSearchQuery] = useState("");
  const navigate = useNavigate()
  const onLogout = ()=>{
    localStorage.clear()
    navigate("/login");
  }
  const handleSearch = ()=>{

  }
  const onClearSearch = ()=>{
    setSearchQuery("")
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl'>
        <h1 className='text-xl font-medium text-black py-2 '>Notes</h1>
        <SearchBar value = {searchQuery} onChange={(e)=>{
          setSearchQuery(e.target.value)
        }}
        handleSearch ={handleSearch}
        onClearSearch={onClearSearch}
        />
      <ProfileInfo userInfo = {userInfo} onLogout={onLogout}/>
    </div>
  )
}
