import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
const SearchBar = ({ value, onChange, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      { value && <MdClear className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />}
      <IoSearch
        className=" text-slate-400 cursor-pointer hover:text-black "
        onClick={onClearSearch}
      />
    </div>
  );
};

export default SearchBar;
