
import Notes from './Notes';
import AddNote from './AddNote'


const Home = (props) => {
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <div className='container my-3'>
      <Notes showAlert={props.showAlert}  />
    </div>
   </>
  )
}

export default Home