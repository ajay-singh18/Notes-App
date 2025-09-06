import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from "react-router-dom";


export const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {
  const [searchQuery,setSearchQuery] = useState("");
  const navigate = useNavigate()
  const onLogout = ()=>{
    localStorage.clear()
    navigate("/login");
  }
  const handleSearch = ()=>{
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }
  const onClearSearch = ()=>{
    setSearchQuery("")
    handleClearSearch()
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl'>     
<h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">
  📒 {userInfo ? `${userInfo.fullName.split(" ")[0]}'s Notes` : "Notes"}
</h1>

        {userInfo && (
          <>
         <SearchBar value = {searchQuery} onChange={(e)=>{
          setSearchQuery(e.target.value)
          if(e.target.value == "") {
            handleClearSearch();
          }
        }}
        handleSearch ={handleSearch}
        onClearSearch={onClearSearch}
        />
      <ProfileInfo userInfo = {userInfo} onLogout={onLogout}/>
          </>
        )}
    </div>
  )
}
