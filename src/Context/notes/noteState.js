import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) =>
{
const host = 'http://localhost:8080'
const intialState = []
  
 const [notes , setNotes] = useState(intialState)

 //GET NOTES
 const getNotes=async(title,discription,tag)=>
{
  const response = await fetch( `${host}/api/notes/fetchnotes` , {
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
    },
  
  });
   const json = await response.json();
   console.log(json)
   setNotes(json)
}

//------------------------ADD NOTES-------------------------------------//

const addNote=async(title,discription,tag)=>
{
  const response = await fetch( `${host}/api/notes/upload` , {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
    },
    body:JSON.stringify({title , discription , tag})
  
  });

  const note = await response.json()
  setNotes(notes.concat(note)) // concat return an array whereas push updates an array
}

 //----------------------DELETE NOTES--------------------------------------//

 const deleteNote=async(id)=>
 {
  const newNotes =  notes.filter( (note)=>{return note._id !== id } )
  const response = await fetch(`${host}/api/notes/delete/${id}` ,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'auth-token':localStorage.getItem('token')
    },
  })
  const json = await response.json()
  console.log(json)
  setNotes(newNotes)
 }

//---------------------------EDIT NOTES-------------------------------------//
 const editNote = async(id , title , discription , tag)=>
 {

 const response = await fetch(`${host}/api/notes/update/${id}` ,  {
  method:'PUT',
  headers:{
    'Content-Type':'application/json',
    'auth-token':localStorage.getItem('token')
  },
  body:JSON.stringify({title , discription , tag})
});

   const json = await response.json();
   console.log(json)

  let newNote = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < notes.length; index++) {
    const element = newNote[index];
    if(element._id === id)
    {
      newNote[index].title = title
      newNote[index].discription = discription
      newNote[index].tag = tag
      break;
    }

  } 
  setNotes(newNote)
 }

    return (
        <noteContext.Provider value={{notes , setNotes , addNote , getNotes ,deleteNote , editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState