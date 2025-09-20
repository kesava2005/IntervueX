import React, { useState } from 'react'
import "./Signup.css"
function Login() {
  const [usermail,setUsermail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [err,setErr] = useState(null);
  const handle_change = (e) =>{
    e.preventDefault();
    if(e.target.name == "usermail") setUsermail(e.target.value);
    else if(e.target.name == "password") setPassword(e.target.value); 
    else if(e.target.name == "confirm_password") setConfirm(e.target.value); 
  }
  const hanndle_submit = (e) =>{
    e.preventDefault();
    console.log(usermail);
    console.log(password);
    console.log(confirm);
  }
  return (
    <div className='login-panel'>
      <form className="form">
      <span className="signup">Log-In</span>

      <input 
        type="email" 
        placeholder="Email address" 
        className="form--input" 
        name = "usermail"
        onChange={handle_change}
      />

      <input 
        type="password" 
        placeholder="Password" 
        className="form--input" 
        name = "password"
        onChange={handle_change}
      />
      <div className = "label2">
        <label>Dont have an account? <span className='text-gray-600 underline mx-[0.2rem] cursor-pointer'>Signup</span></label>
      </div>

      <button className="form--submit" onClick={hanndle_submit}>
        Log-In
      </button>
    </form>
    </div>
  )
}

export default Login
