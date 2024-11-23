import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.svg";
function Header() {
  return (
    <div className='w-full flex justify-between sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
        <img src={logo} className='w-28 object-contain'/>
        </Link>
        <Link to="/createPost">
            <button className='bg-[#6964ff] text-white rounded-md px-4 py-2'>create</button>
        </Link>
    </div>
  )
}

export default Header
