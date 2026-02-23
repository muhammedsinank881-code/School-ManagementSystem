import React, { useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import StudentForm from './StudentForm';




export const Students = () => {

    const [isOpen , setIsOpen] = useState (false)


    const students = [
        { id: 1, name: 'John Doe', class: 'Class 1', phone: '123-456-7890', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', class: 'Class 2', phone: '098-765-4321', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Bob Johnson', class: 'Class 3', phone: '555-123-4567', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'John Doe', class: 'Class 1', phone: '123-456-7890', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 5, name: 'Jane Smith', class: 'Class 2', phone: '098-765-4321', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 6, name: 'Bob Johnson', class: 'Class 3', phone: '555-123-4567', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 7, name: 'John Doe', class: 'Class 1', phone: '123-456-7890', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 8, name: 'Jane Smith', class: 'Class 2', phone: '098-765-4321', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 9, name: 'Bob Johnson', class: 'Class 3', phone: '555-123-4567', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ]
    return (
        <div className='w-full h-full bg-gray-100 p-5 space-y-5'>

           {!isOpen && (
            <>
             {/* head */}
            <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>Students</h1>
                <button className='bg-white text-black px-4 py-2 rounded-md '
                onClick={()=>setIsOpen(true)}>Add New +</button>
            </div>

            {/* list */}
            <div className='w-full h-[90%] bg-white rounded-2xl p-3'>

                {/* list head */}
                 <div className='flex flex-col md:flex-row justify-between p-5 gap-3 w-full'>
                                            <div className='flex w-full'>
                                                <h2 className='text-xl font-semibold shrink-0'>All Teachers List</h2>
                                            </div>
                                            <div className='flex flex-col md:flex-row gap-3  items-center mb-2 w-full'>
                                                <div className='flex gap-3'>
                                                    <input type="text" className='w-full md:w-100 p-1 bg-gray-100 border border-gray-200 rounded-md  px-3' placeholder='Search teachers...' />
                                                    <button className='bg-gray-200 text-black p-2 rounded-md'><IoSearch /></button>
                                                </div>
                
                                                <div className='flex w-full '>
                                                    <select className='p-1 bg-gray-100 border border-gray-200 rounded-md'>
                                                    <option>All Classes</option>
                                                    <option>Class 1</option>
                                                    <option>Class 2</option>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                {/* list body */}
                <div className="w-full h-[70%] md:h-[80%] p-3 rounded-md overflow-y-auto no-scrollbar">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">

                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="bg-gray-100 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition"
                            >

                                {/* Image */}
                                <img
                                    src={student.image}
                                    alt={student.name}
                                    className="w-16 h-16 rounded-full bg-amber-300 mx-auto mb-3"
                                />

                                {/* Details */}
                                <h2 className="text-lg font-semibold">{student.name}</h2>
                                <p className="text-gray-600">Class: {student.class}</p>
                                <p className="text-gray-600">Phone: {student.phone}</p>

                                {/* Buttons */}
                                <div className="flex justify-center gap-2 mt-4  text-black text-xl">
                                    <button className="bg-white  px-3 py-1 rounded-md">
                                        <AiFillEdit/>
                                    </button>
                                    <button className="bg-white  px-3 py-1 rounded-md">
                                        <AiFillDelete/>
                                    </button>
                                    <button className="bg-white px-3 py-3 rounded-md">
                                        <HiViewGrid/>
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
                </div>
                </>
           )}

            {isOpen && <StudentForm setIsOpen={setIsOpen}/>}
        </div>
    )
}