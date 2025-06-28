import React from 'react';
import { useState } from 'react';
import axios from "axios";


const Login = () => {
  const [email,setEmailID] = useState("")
  const [password,setPassword]= useState("")

  const handleLogin = async () =>{
    try{
      const res = await axios.post("http://localhost:7777/login",{email,password},{withCredentials:true});
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
       <div className="card bg-base-300 image-full w-96 shadow-sm">
  <figure>
    <img
      src="/user.jpg"
      alt="user" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Enter Your Registered Email:</legend>
    <input type="text" className="input" value={email} onChange={(e)=>setEmailID(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Password:</legend>
    <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </fieldset>
    <div className="card-actions justify-center">
      <button className="btn btn-primary w-20" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
   
  )
}

export default Login