import { BiHomeAlt2 } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { MdClass, MdEventAvailable } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";
import { RiGraduationCapFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
import { FaUserCheck } from "react-icons/fa";


const TeachSidebar= ({ closeSidebar }) => {
  const SidebarIcons = [
    { id: 1, name: "Dashboard", icon: <BiHomeAlt2 />, path: "/teachers-dashboard" },
    { id: 2, name: "Students", icon: <IoMdContacts />, path: "/teachers-dashboard/students" },
    { id: 3, name: "Timetable", icon: <MdClass />, path: "/teachers-dashboard/timetable" },
    { id: 4, name: "Events", icon: <MdEventAvailable />, path: "/teachers-dashboard/events" },
    { id: 5, name: "Attendace", icon: <FaUserCheck/>, path: "/teachers-dashboard/attendace" },  
    { id: 6, name: "settings", icon: <IoMdSettings />, path: "/teachers-dashboard/settings" },  
  ];
  return (
    <div className="flex flex-col justify-between  p-3 bg-gray-700 text-white h-full w-full rounded-2xl">
      <div className=" ">
        <div className="flex items-center gap-3  py-5"> 
          <span className="text-4xl"><RiGraduationCapFill />
          </span><h1 className="text-2xl">EduManage</h1>
        </div>
        <hr className="border-gray-500 mb-4" />
        <div className="space-y-1 ">
          {SidebarIcons.map((items) => (
            <NavLink
              key={items.id}
              to={items.path}
              end={items.path === '/teachers-dashboard'}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 w-full rounded-md 
                ${isActive ? "bg-blue-600" : "hover:bg-blue-600/60"}`
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

export default TeachSidebar;