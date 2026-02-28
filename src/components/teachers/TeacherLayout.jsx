import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { RiGraduationCapFill } from 'react-icons/ri';
import TeachSidebar from './TeachSidebar';
import Navbar from '../../pages/ProfileNav';

const Layout = () => {


  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden ">
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-5 z-50 lg:hidden text-5xl text-gray-700"
      >
        <RiGraduationCapFill />
      </button>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/60 z-40 md:hidden
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}

          onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-[70%] md:w-[23%] p-3 z-50
        transform transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        ${isOpen ? "translate-x-0 " : "-translate-x-full"}
        md:translate-x-0`}
      >
        <TeachSidebar closeSidebar={() => setIsOpen(false)} />
      </div>
      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Outlet />
        </div>
      </div>

    </div>
  );
};


export default Layout