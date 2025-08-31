import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import {MdAdd} from "react-icons/md"
import Notecard from "../../components/Cards/Notecard";
import AddEditNotes from "./AddEditNotes";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Notecard
            title="Meeting on 14th August"
            date="11 Aug 2025"
            content="Meeting on 14 august"
            tags="#meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{}}>
        <MdAdd className= "text-[32px] text-white " />
      </button>
      <AddEditNotes/>
    </>
  );
};

export default Home;
