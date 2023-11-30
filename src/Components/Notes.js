import React, { useRef } from 'react'
import { useContext, useEffect , useState} from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem'
import {  useNavigate } from 'react-router-dom'



const Notes = (props) => {
  
  const [note , setNote] = useState({etitle : "" , ediscription : "" , etag : ""})
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes , editNote } = context
  
  useEffect(() => {
   if(localStorage.getItem('token'))
   { 
    getNotes()
   }
   else
   {
      navigate('/login')
   }
  }, [])

  const refLaunch = useRef(null)
  const refClose = useRef(null)
  
  const editNotes = (currentNote) => { // When we click on edit so it loads the written value
   refLaunch.current.click()   // ref for Launch model
   setNote({id:currentNote._id   , etitle:currentNote.title , ediscription:currentNote.discription , etag:currentNote.tag} )
  }

  const onChange = (e) =>
  {
      setNote({...note,[e.target.name] : e.target.value}) // name should be equal to value 
  }

  const handleclick=(e)=>
  {
      e.preventDefault(); // so on submitting it does'nt reload
      editNote(note.id , note.etitle , note.ediscription , note.etag)
      refClose.current.click()
      props.showAlert("Updated succefully","success")
  }

  return (
    <>

      <button ref={refLaunch} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div class="mb-3">
                  <label htmlFor="etitle" class="form-label">Title</label>
                  <input type="text" class="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                </div>
                <div class="mb-3">
                  <label htmlFor="ediscription" class="form-label">Discription</label>
                  <input type="text" class="form-control" id="ediscription" name='ediscription' value={note.ediscription} onChange={onChange} />
                </div>
                <div class="mb-3">
                  <label htmlFor="etag" class="form-label">Tag</label>
                  <input type="text" class="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                <button ref={refClose} type="button" className="btn btn-secondary mx-3 d-none" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length < 4 || note.ediscription.length < 5} type="submit" class="btn btn-primary" onClick={handleclick}>UPDATE NOTE</button>
              </form>

            </div>

          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        
        {notes.map((notes) => 
        {
          return <Noteitem key={notes._id} editNotes={editNotes} notes={notes} showAlert={props.showAlert} />
        })}

      </div>
    </>

  )
}

export default Notes