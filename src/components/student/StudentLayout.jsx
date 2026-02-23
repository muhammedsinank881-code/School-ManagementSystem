import React from 'react'
import { useState } from 'react'
import StudentSidebar from '../student/StudentSidebar'
import { Outlet } from 'react-router'
import { RiGraduationCapFill } from 'react-icons/ri';
import Navbar from '../mainPage/ProfileNav';

const StudentLayout = () => {
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
          className="fixed inset-0 bg-black/60 bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}></div>
      )}
      
      {/* Sidebar */}
       <div
        className={`fixed md:static top-0 left-0 h-full w-[70%] md:w-[23%] p-3 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <StudentSidebar closeSidebar={() => setIsOpen(false)} />
      </div>
      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default StudentLayout
