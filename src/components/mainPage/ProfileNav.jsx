import React from 'react'
import { MdNotifications , MdSearch, MdRefresh } from "react-icons/md"


const Navbar = () => {
  return (
    <div>
        
        <div className='flex flex-row items-center justify-end px-5 py-2 max-h-min gap-5 mt-3' >
            <div className='hidden md:flex flex-row items-center w-full bg-white p-2 rounded-xl gap-5'>
                <button><MdSearch className='text-gray-400 text-xl '/></button>
                <input type="text" className='w-full text-gray-400 outline-none ' placeholder='Search...' />
                <button><MdRefresh className='text-gray-400 text-xl'/></button>
            </div>
            <button className='p-2 rounded-full hover:bg-gray-200 transition-all duration-400 ease-in-out'>
              <MdNotifications className='text-2xl' />
              </button>
            <img src="#" alt="name" 
            className='w-10 h-10 rounded-full bg-amber-300 ' />
            

        </div>
    </div>
  )
}

export default Navbar