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
   <div className="bg-white flex flex-col sm:flex-row items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 drop-shadow-2xl">
  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-center sm:text-left 
  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent 
  drop-shadow-md tracking-tight">
  📒 {userInfo ? `${userInfo.fullName.split(" ")[0]}'s Notes` : "Almanaco: Your Personal Digital Notebook"}
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
