import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'


const AddEditNotes = ({onClose ,getAllNotes,type, noteData}) => {
    const [title, setTitle] = useState(noteData?.title || "")
    const [content,setContent] = useState(noteData?.content || "")
    const  [tags,setTags] = useState(noteData?.tags || [])
    const [error,setError] = useState(null)
    // Add Note
    const addNewNote = async ()=>{
       try{
       const response = await axiosInstance.post("/add-note",{
        title,
        content,
        tags
    })
    if(response.data && response.data.note){
      getAllNotes();
      onClose();
    }
  }catch(error){
    if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
    }
  }
}
    // Edit Note
    const editNote = async ()=>{
        const noteId = noteData._id
try{
       const response = await axiosInstance.put("/edit-note/" + noteId,{
        title,
        content,
        tags
    })
    if(response.data && response.data.note){
      getAllNotes();
      onClose();
    }
  }catch(error){
    if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
    }
  }    }
    const handleAddNote = ()=>{
        if(!title){
            setError("Please enter the title")
            return;
        }
        if(!content){
            setError("Plese enter the content")
            return;
        }
        setError("");
        if(type === 'edit') {
            editNote()
        }else{
            addNewNote()
        }
    }
  return (
   <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 animate-fadeIn">
  {/* Close Button */}
  <button
    className="w-9 h-9 rounded-full flex items-center justify-center 
               absolute -top-4 -right-4 bg-gradient-to-br from-gray-100 to-gray-200 
               hover:from-gray-200 hover:to-gray-300 shadow-md 
               transition-all duration-200"
    onClick={onClose}
  >
    <MdClose className="text-lg text-gray-600 hover:text-gray-800 transition" />
  </button>

  {/* Title */}
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
      Title
    </label>
    <input
      type="text"
      className="text-2xl font-semibold text-gray-900 outline-none 
                 border-b border-gray-300 focus:border-purple-500 
                 transition-colors bg-transparent pb-1"
      placeholder="Go To Gym At 5"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  {/* Content */}
  <div className="flex flex-col gap-2 mt-6">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
      Content
    </label>
    <textarea
      className="text-sm text-gray-700 outline-none bg-gradient-to-br from-gray-50 to-gray-100 
                 border border-gray-200 rounded-xl p-4 
                 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 
                 transition resize-none shadow-sm"
      placeholder="Write your note content here..."
      rows={8}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  </div>

  {/* Tags */}
  <div className="mt-5">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
      Tags
    </label>
    <TagInput tags={tags} setTags={setTags} />
  </div>

  {/* Error */}
  {error && <p className="text-red-500 text-xs pt-3">{error}</p>}

  {/* Submit Button */}
  <button
    className="w-full mt-6 py-3 rounded-xl 
               bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500
               text-white font-medium shadow-md hover:shadow-xl 
               hover:scale-[1.02] active:scale-[0.98]
               transition-all duration-200"
    onClick={handleAddNote}
  >
    {type === "edit" ? "Update Note ✏️" : "Add Note ➕"}
  </button>
</div>


  )
}

export default AddEditNotes