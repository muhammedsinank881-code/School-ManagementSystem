import React from 'react'
import Doc from '../assets/document.svg'

const TeacherForm = ({ setIsOpen }) => {
    return (
        <div className='flex flex-col items-center w-full py-3 px-5 bg-gray-100'>
            <div className='flex flex-col md:flex-row items-center md:justify-between  w-full' >
                <div className='flex flex-row items-center justify-between gap-5 md:gap-10'>
                    <button className='bg-white text-2xl shadow-md px-2 rounded active:scale-98'
                        onClick={() => { setIsOpen(false) }}>←</button>
                    <h1 className='text-[24px] font-medium'>Add New Teacher</h1>
                </div>
                <div className='hidden md:flex gap-3'>
                    <button className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95  shadow-md'>cancel</button>
                    <button className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md'>reset</button>
                    <button className='bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md'>save</button>

                </div>
            </div>
            <div className='flex flex-col md:grid grid-cols-2 gap-3 bg-gray-100 w-full pt-10'>
                <div className='flex flex-col gap-6  '>
                    <div className='flex flex-col gap-6 bg-white rounded-2xl py-3 '>
                        <div >
                            <h1 className='border-b border-gray-300 font-semibold text-[18px] px-5 py-4'> Basic information</h1>
                        </div>

                        <div className='flex flex-col md:grid grid-cols-2 px-5 py-4 gap-3'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <h1>First Name</h1>
                                    <input type="text" placeholder='First Name '
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' />
                                    <div className='flex flex-col gap-2   md:hidden'>
                                        <h1>Last Name</h1>
                                        <input type="text" placeholder='First Name '
                                            className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' /></div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Gender</h1>
                                    <div className='flex flex-row'>
                                        <label className="flex items-center gap-2  px-4 py-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                className='active:scale-98'
                                            />
                                            Male
                                        </label>

                                        <label className="flex items-center gap-2  px-4 py-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                className='active:scale-98'
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Date of Birth</h1>
                                    <input type="date" placeholder='First Name ' className='w-full border border-[#D4D4D4] rounded-md shadow-md text-gray-500 px-2 py-1 active:scale-98' />
                                </div>
                                <div className='flex flex-col gap-2' >
                                    <div className="flex gap-4">

                                        {/* Class Dropdown */}
                                        <div className="flex flex-col gap-2 w-full active:scale-98 ">

                                            <select className="w-full border border-[#D4D4D4] rounded-md text-gray-700 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md">
                                                <option value="">Subject</option>
                                                <option value="1">English</option>
                                                <option value="2">Malayalam</option>
                                                <option value="3">Hindi</option>
                                                <option value="4">Arabic</option>
                                                <option value="5">Maths</option>
                                                <option value="6">Physis</option>
                                                <option value="7">Chemstry</option>
                                                <option value="8">Biology</option>
                                                <option value="9">Social Science</option>
                                                <option value="10">IT</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='hidden md:flex flex-col gap-2'>
                                    <h1>Last Name</h1>
                                    <input type="text" placeholder='Last Name ' className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' />
                                </div>
                                <div
                                    //onclick here -->
                                    className='flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-400 mt-4 rounded-xl gap-3'>
                                    <button className='active:scale-95 '><img src={Doc} /></button>
                                    <p>drop files to upload</p>
                                    <button className=' border border-gray-400 text-sm p-1 rounded-xl hover:bg-gray-100 active:scale-95'>Select Files</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className='bg-gray-100 flex flex-col gap-3'>
                    <div className='flex flex-col gap-2 bg-white rounded-2xl py-3 '>
                        <div className='border-b border-[#D4D4D4] pb-2'>
                            <h1 className='font-bold text-[18px] px-5 '>Login/Account Details</h1></div>
                        <div className='flex flex-col md:flex-row gap-2 justify-center px-5'>
                            <input type="text" placeholder='User Name' className='border border-[#D4D4D4] rounded-md w-full py-2 md:m-3 pl-5 shadow-md active:scale-98' />
                            <input type="text" placeholder='password' className='border border-[#D4D4D4] rounded-md w-full py-2 md:m-3 pl-5 shadow-md active:scale-98' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 bg-white rounded-2xl py-3 '>
                        <div className='border-b border-[#D4D4D4] pb-2'>
                            <h1 className='font-bold text-[18px] px-5 '>Contact Information</h1></div>
                        <div className='flex flex-col md:flex-row justify-center gap-2'>

                            <div className='flex flex-col w-full'>
                                <h1 className='px-4'>Phone</h1>
                                <input type="text" placeholder='Contact Number' className='border border-[#D4D4D4] rounded-md  py-2 m-3 pl-5 shadow-md active:scale-98' />

                            </div>
                            <div className='flex flex-col w-full '>
                                <h1 className='px-4'>Email</h1>
                                <input type="text" placeholder='example@gmail.com' className='border border-[#D4D4D4] rounded-md  py-2 m-3 pl-5 shadow-md active:scale-98' />

                            </div>
                        </div>
                        <div className='flex flex-col '>
                            <h1 className=' px-4 '>Address</h1>
                            <div className='flex'>
                                <input type="text" placeholder='Area and Street' className='border border-[#D4D4D4] rounded-md w-full py-2 m-3 pl-5 shadow-md active:scale-98' />
                            </div>
                            <div className='flex gap-2 justify-center'>
                                <input type="text" placeholder='PinCode' className='border border-[#D4D4D4] rounded-md w-full py-2 m-3 pl-5 shadow-md active:scale-98' />
                                <input type="text" placeholder='District' className='border border-[#D4D4D4] rounded-md w-full py-2 m-3 pl-5 shadow-md active:scale-98' />
                            </div>
                            <div className='flex gap-2 justify-start'>
                                <input type="text" placeholder='Location' className='border border-[#D4D4D4] rounded-md w-full py-2 m-3 pl-5 shadow-md active:scale-98' />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex md:hidden py-10 gap-3'>
                <button className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95  shadow-md'
                onClick={() => setIsOpen(false)}>cancel</button>
                <button className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md'>reset</button>
                <button className='bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md'>save</button>
            </div>
        </div>
    )
}

export default TeacherForm
