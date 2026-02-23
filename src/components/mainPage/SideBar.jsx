import React from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { MdEventAvailable } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";
import { RiGraduationCapFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";


const Sidebar = () => {
  const SidebarIcons = [
    { id: 1, name: "Dashboard", icon: <BiHomeAlt2 /> , path: "/admin"},
    { id: 2, name: "Teachers", icon: <IoMdContacts />, path: "/teachers"},
    { id: 3, name: "Students", icon: <PiStudentFill />, path: "/students"},
    { id: 4, name: "Events", icon: <MdEventAvailable />, path: "/events"},  
    { id: 5, name: "Settings", icon: <IoMdSettings />, path: "/settings"},  
  ];
  return (
    <div className="flex flex-col justify-between  p-3 bg-gray-700 text-white h-full w-full rounded-2xl">
      <div className=" ">
        <div className="flex items-center gap-3  py-5"> <span className="text-4xl"><RiGraduationCapFill /></span><h1 className="text-2xl">EduManage</h1>
        </div>
        <hr className="border-gray-500 mb-4" />
        <div className="space-y-1">
          {SidebarIcons.map((items) => (
            <NavLink
              key={items.id}
              to={items.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 w-full rounded-md transition
                ${isActive ? "bg-blue-600" : "hover:bg-blue-600"}`
              }
            >
              {items.icon}
              <span>{items.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full p-2 hover:bg-blue-600 rounded-md"><LuLogOut />Logout</div>
    </div>
  );
};

export default Sidebar;