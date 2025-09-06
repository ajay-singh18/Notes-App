import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import {MdAdd} from "react-icons/md"
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal"
import NoNotes from "../../components/Cards/NoNotes";
import NoSearchResults from "../../components/Cards/NoSearchResults";
import Notecard from "../../components/Cards/Notecard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
const Home = () => {
    const [openAddEditModel,setOpenAddEditModel] = useState({
        isShown:false,
        type:"add",
        data:null,
    })
    const [userInfo,setUserInfo] = useState(null)
    const [allNotes,setAllNotes] = useState([])
    const navigate = useNavigate()
    const [isSearch,setIsSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");  


    const getUserInfo = async ()=>{
    try {
      const response = await axiosInstance.get("/get-user")
      console.log(response.data)
      if(response.data ){
        setUserInfo(response.data)
      }
    } catch (error) {
      if(error.response.status == 401){
        localStorage.clear()
        navigate('/login')
      }
    }
  }
  // Get all notes
  const getAllNotes = async ()=>{
    try {
    const response = await axiosInstance.get("/get-all-notes")
    if(response.data && response.data.notes){
      setAllNotes(response.data.notes)
    }
  } catch (error) {
    console.log("An unexpected error occured. Please try again");
  }
  }
  
  const handleEdit = (noteDetails) =>{
    setOpenAddEditModel({
      isShown: true,
      data:noteDetails,
      type: "edit"
    })
  }
  // Delete Note
  const deleteNote = async (data) =>{
     const noteId = data._id
try{
       const response = await axiosInstance.delete("/delete-note/" + noteId)
    if(response.data && response.data.note){
      getAllNotes();
    }
  }catch(error){
    if(error.response && error.response.data && error.response.data.message){
        console.log(error.response.data.message);
    }
  }    
  }

  const onSearchNote = async (query)=>{
    try {
      const response = await axiosInstance.get("/search-note",{
        params:{query}
      })
      if(response.data && response.data.notes){
        setIsSearch(true)
        setSearchQuery(query)
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleClearSearch = async ()=>{
      setIsSearch(false);
      getAllNotes()
  }
  const updatePinned = async(data)=>{
const noteId = data._id
try{
       const response = await axiosInstance.put("/update-note-pinned/" + noteId,{
        isPinned: !data.isPinned
       })
    if(response.data && response.data.note){
      getAllNotes();
    }
  }catch(error){
    if(error.response && error.response.data && error.response.data.message){
        console.log(error.response.data.message);
    }
  }        
  }
  useEffect(()=>{
    getUserInfo()
    getAllNotes()
    return ()=>{}
  },[])
  return (
    <>
      <Navbar userInfo = {userInfo} onSearchNote = {onSearchNote} handleClearSearch = {handleClearSearch} />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
         {allNotes.length > 0 ?(
           allNotes?.map((item)=>(
            <Notecard
            key= {item._id}
            title={item.title}
            date={item.createdOn}
            content= {item.content}
            tags= {item.tags}
            isPinned= {item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => updatePinned(item)}
          />
          ))
          
         ): isSearch ? (
    <NoSearchResults query={searchQuery} /> 
  ) : (
    <NoNotes />
  )} 
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{
        setOpenAddEditModel({
            isShown:true,
            type:"add",
            data:null
        })
      }}>
        <MdAdd className= "text-[32px] text-white " />
      </button>
      <Modal
        isOpen = {openAddEditModel.isShown}
        onRequestClose = {()=>{}}
        style = {{
            overlay:{
                backgroundColor: "rgba(0,0,0,0.2)",
            },
        }}
        contentLabel = ""
        className = "w-[40%] max-h-[550px] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
      <AddEditNotes 
        type = {openAddEditModel.type}
        noteData = {openAddEditModel.data}
        onClose = {()=>{
        setOpenAddEditModel({isShown:false,type:"add", data: null})
      }}
       getAllNotes = {getAllNotes}
      />
      </Modal>
    </>
  );
};

export default Home;
