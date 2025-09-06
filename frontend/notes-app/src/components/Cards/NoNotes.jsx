import React from "react";
import { MdNoteAdd } from "react-icons/md";

const NoNotes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <MdNoteAdd className="text-6xl mb-4 text-gray-400" />
      <h2 className="text-xl font-semibold">No Notes Yet</h2>
      <p className="text-sm">Start by adding your first note!</p>
    </div>
  );
};

export default NoNotes;
