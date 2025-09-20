import React, { useEffect, useState } from 'react'
import {useAuth} from "./AuthContext";
import { useNavigate } from 'react-router-dom';
function NavBar({handle_login_click}) {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();
  const handle_logout_click = async() =>{
    try{
      const res = await fetch("http://localhost:5000/api/logout",{
        method : "POST",
        credentials: "include"
      });
      setAuth({email: null,logged: false});
      navigate("/");
    }
    catch(err){
      console.log("logout failed");
    }
  }
  return (
    <div className='nav-bar'>
      <ul className='flex py-4 px-[10vw]'>
        <li className='text-white font-bold text-[1.7rem] cursor-pointer'>Intervue<span>X</span></li>
        {!auth.logged && <li className='w-[100vw] flex justify-end'><button className='bg-[#7971ea] text-white font-bold text-[1.1rem] py-2 rounded-3xl
          px-4 cursor-pointer border-none hover:bg-[#433e85] transition-colors duration-500 delay-[40]
        ' onClick={handle_login_click}>Login</button></li>}
        {auth.logged && <li className='w-[100vw] flex justify-end'><button className='bg-[#7971ea] text-white font-bold text-[1.1rem] py-2 rounded-3xl
          px-4 cursor-pointer border-none hover:bg-[#433e85] transition-colors duration-500 delay-[40]
        ' onClick={handle_logout_click}>Logout</button></li>}

      </ul>
      <div className="line w-[100%] h-[0.1vh] my-[0.3rem] bg-white"></div>
    </div>
  )
}
export default NavBar
