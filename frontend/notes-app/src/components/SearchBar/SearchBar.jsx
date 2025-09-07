import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";

const SearchBar = ({ value, onChange, onClearSearch, handleSearch }) => {
  return (
    <div
      className="relative flex items-center bg-white rounded-full shadow-md px-4 py-2 
                 transition-all duration-300 hover:shadow-lg focus-within:ring-2 
                 focus-within:ring-indigo-400 w-full sm:w-40 md:w-96"
    >
      {/* Search Icon inside input */}
      <IoSearch
        className="absolute left-4 text-gray-400 hover:text-indigo-500 transition-all duration-200 cursor-pointer"
        onClick={handleSearch}
        size={20}
      />

      {/* Input with padding-left for icon */}
      <input
        type="text"
        placeholder="Search notes..."
        className="flex-1 text-sm sm:text-base bg-transparent outline-none 
                   placeholder-gray-400 pl-10 py-1"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Clear Button */}
      {value && (
        <MdClear
          className="text-gray-500 hover:text-red-500 cursor-pointer ml-2 
                     transition-transform duration-150 hover:scale-110"
          onClick={onClearSearch}
          size={18}
        />
      )}
    </div>
  );
};

export default SearchBar;
