import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
 
  const [ credentials , setCredentials] = useState({Name:"" , email:"", password:"" , Cpassword:""})
  const navigate = useNavigate()

  const onchange=(e)=>
  {
    setCredentials({...credentials , [e.target.name]:e.target.value})
  }

  const handlesubmit=async(e)=>
  {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/api/auth/create',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.Name , email:credentials.email , password :credentials.password , Cpassword : credentials.Cpassword})
      
    })
    const json = await response.json()
    console.log(json)

    if(json.success)
    {
        //redirect
        localStorage.setItem('token' , json.authtoken)
        navigate("/")
        props.showAlert("SignUp in Succesfully","success")
    }
    else
    {
      props.showAlert("Invalid Credentials","danger")
    }  
  }

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label for="Name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onchange} value={credentials.Name} name='Name' id="Name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={credentials.email} className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" name='password' value={credentials.password} className="form-control" id="password" onChange={onchange}/>
        </div>
        <div className="mb-3">
          <label for="Cpassword" className="form-label">Confirm Password</label>
          <input type="password" name='Cpassword' value={credentials.Cpassword} className="form-control" id="Cpassword" onChange={onchange}/>
        </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup