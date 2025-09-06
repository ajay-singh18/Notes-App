import React from "react";
import { MdSearchOff } from "react-icons/md";

const NoSearchResults = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <MdSearchOff className="text-6xl mb-4 text-gray-400" />
      <h2 className="text-xl font-semibold">No Results Found</h2>
      <p className="text-sm">No notes match “{query}”.</p>
    </div>
  );
};

export default NoSearchResults;
