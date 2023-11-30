import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

const Noteitem = (props) => {

  const context = useContext(noteContext)
  const{ deleteNote} = context
  const {notes , editNotes} = props

  return (
    <div className='col-md-3'>
      <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
            <p className="card-text">{notes.discription}</p>
            <i className="fa-solid fa-trash mx-2" style={{color: "#06142d"}} onClick={()=>{deleteNote(notes._id); props.showAlert("Deleted the note","success") }}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editNotes(notes)}}></i>
          </div>
      </div>
    </div>
  )
}

export default Noteitem