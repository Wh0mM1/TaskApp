import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {

    const [credentials , setCredentials] = useState({email:"" , password:""})
    const navigate = useNavigate();

    const handleCLick=async(e)=>
    {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/auth/login',
        {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });  

        const json = await response.json()
        console.log(json)
        if(json.success)
        {
            //redirect
            localStorage.setItem('token' , json.authtoken)
            navigate("/")
            props.showAlert("Logged in Succesfully","success")

        }
        else{
            props.showAlert("Failed to login","danger")
        }
    }

    const onChange =(e)=>
    {
         setCredentials({...credentials , [e.target.name] : e.target.value})
    }
    
    return (
        <>
            <form onSubmit={handleCLick}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" name='email' value={credentials.email}/>
                        <div id="email" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name='password' onChange={onChange} id="exampleInputPassword1"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>


        </>
    )
}

export default Login