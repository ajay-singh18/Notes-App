import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
const SearchBar = ({ value, onChange, onClearSearch,handleSearch }) => {
  return (
   <div className="w-80 relative flex items-center bg-white rounded-full shadow-xl px-4 py-2 transition-all duration-300 hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400">

  {/* Search Icon inside input */}
  <IoSearch
    className="absolute left-4 text-gray-400 hover:text-blue-500 transition-all duration-200"
    onClick={handleSearch}
  />

  {/* Input with padding-left for icon */}
  <input
    type="text"
    placeholder="Search Notes..."
    className="flex-1 text-sm bg-transparent outline-none placeholder-gray-400 pl-10 py-2 rounded-full"
    value={value}
    onChange={onChange}
  />

  {/* Clear Button */}
  {value && (
    <MdClear
      className="text-gray-500 hover:text-red-500 cursor-pointer ml-2 transition-transform duration-150 hover:scale-125"
      onClick={onClearSearch}
    />
  )}
</div>




  );
};

export default SearchBar;
