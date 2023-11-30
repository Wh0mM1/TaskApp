import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context
    const [note , setNote] = useState({title : "" , discription : "" , tag : ""})

    const onChange = (e) =>
    {
        setNote({...note,[e.target.name] : e.target.value}) // name should be equal to value 
    }
    
    const handleclick=(e)=>
    {
        e.preventDefault(); // so on submitting it does'nt reload
        addNote(note.title , note.discription , note.tag)
        setNote({title : "" , discription : "" , tag : ""})
        props.showAlert("Added a new note succefully","success")
    }

    return (
        <>
      <h2>Add Notes</h2>
      <form>
        <div class="mb-3">
          <label htmlFor="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={3}/>
        </div>
        <div class="mb-3">
          <label htmlFor="discription" class="form-label">Discription</label>
          <input type="text" class="form-control" id="discription" name='discription' value={note.discription} onChange={onChange} minLength={4} />
        </div>
        <div class="mb-3">
            <label htmlFor="tag" class="form-label">Tag</label>
            <input type="text" class="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
        </div>
        <button disabled={note.title.length < 4 || note.discription.length < 5} type="submit" class="btn btn-primary" onClick={handleclick}>ADD NOTE</button>
      </form>

    </>
  )
}

export default AddNote