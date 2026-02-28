import React from 'react';
import { MdNotifications , MdSearch, MdRefresh } from "react-icons/md"
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(state => state.user.user);
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

        <div className='flex flex-col items-end'>
          <img 
          src={user?.profileImage || "/images/default.png"} 
          className="w-10 h-10 rounded-full object-cover"
          />
          <span className='text-gray-700 font-medium text-xs'>
            {user?.email || "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;