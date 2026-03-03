import React from 'react';
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(state => state.user.user);
  return (
    <div>
      <div className='flex flex-row items-center justify-end px-5 py-2 max-h-min gap-5 mt-3' >  
        <div className='flex flex-col items-end gap-1'>
          <button>
            <img 
          src={user?.profileImage || "/images/default.png"} 
          className="w-10 h-10 rounded-full object-cover"
          />
          </button>
          <span className='text-gray-700 font-medium text-xs whitespace-nowrap'>
            {user?.name|| "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;