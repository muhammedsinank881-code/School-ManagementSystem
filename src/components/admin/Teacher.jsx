// Teacher.jsx
import React, { useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";
import { IoSearch, IoClose } from "react-icons/io5";
import TeacherForm from './TeacherForm'
import { useSelector, useDispatch } from "react-redux";
import { deleteTeacher, updateTeacher } from "../../store/teachersSlice";

// Teacher Details Modal - Popup overlay
const TeacherDetailsModal = ({ teacher, onClose, onEdit }) => {
  if (!teacher) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar pointer-events-auto shadow-2xl">
          <div className="p-6">
            {/* Header with close button */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold">Teacher Details</h2>
              <button 
                onClick={onClose}
                className="text-3xl hover:text-gray-600 transition-colors"
              >
                <IoClose />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Left - Image & Basic Info */}
              <div className="md:w-1/3 flex flex-col items-center">
                <img
                  src={teacher.image || 'https://via.placeholder.com/150'}
                  alt={teacher.fullName}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
                />
                <h3 className="text-xl font-semibold">{teacher.fullName}</h3>
                <p className="text-gray-600 bg-blue-50 px-3 py-1 rounded-full text-sm mt-2">
                  ID: {teacher.teacherId}
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  Subject: {teacher.subject}
                </p>
              </div>

              {/* Right - Detailed Info */}
              <div className="md:w-2/3 space-y-4">
                {/* Personal Info */}
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="font-medium">{teacher.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium">{teacher.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">{teacher.gender || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{teacher.dob || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{teacher.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{teacher.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{teacher.address || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">District</p>
                      <p className="font-medium">{teacher.district || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pincode</p>
                      <p className="font-medium">{teacher.pincode || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2">Account Information</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{teacher.username || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  onEdit(teacher);
                  onClose();
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <AiFillEdit /> Edit
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ teacher, onConfirm, onCancel }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onCancel} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 pointer-events-auto shadow-2xl">
          <h3 className="text-xl font-bold mb-4">Delete Teacher</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{teacher?.fullName}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(teacher.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Teacher = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [teacherToEdit, setTeacherToEdit] = useState(null)
    const [teacherToDelete, setTeacherToDelete] = useState(null)
    const [showDetails, setShowDetails] = useState(false)

    const teachers = useSelector((state) => state.teachers.list);
    const dispatch = useDispatch();

    // Get unique subjects for filter dropdown
    const uniqueSubjects = [...new Set(teachers.map(t => t.subject).filter(Boolean))].sort();

    // Filter teachers based on search and subject filter
    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSubject = !selectedSubject || teacher.subject === selectedSubject
        return matchesSearch && matchesSubject
    });

    const handleViewDetails = (teacher) => {
        setSelectedTeacher(teacher);
        setShowDetails(true);
        document.body.style.overflow = 'hidden';
    };

    const handleEdit = (teacher) => {
        setTeacherToEdit(teacher);
        setIsOpen(true);
    };

    const handleDelete = (teacher) => {
        setTeacherToDelete(teacher);
    };

    const confirmDelete = (id) => {
        dispatch(deleteTeacher(id));
        setTeacherToDelete(null);
        alert("Teacher deleted successfully!");
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedTeacher(null);
        document.body.style.overflow = 'unset';
    };

    const handleCloseForm = () => {
        setIsOpen(false);
        setTeacherToEdit(null);
    };

    return (
        <div className='w-full h-full bg-gray-100 p-5 space-y-5'>
            {!isOpen && (
                <>
                    {/* head */}
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold'>Teachers</h1>
                        <div className='flex gap-3'>
                            <button 
                                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                                onClick={() => setIsOpen(true)}>
                                Add New +
                            </button>
                        </div>
                    </div>

                    {/* list */}
                    <div className='w-full h-[90%] bg-white rounded-2xl p-3'>
                        {/* list head */}
                        <div className='flex flex-col md:flex-row justify-between p-5 gap-3 w-full'>
                            <div className='flex w-full'>
                                <h2 className='text-xl font-semibold shrink-0'>
                                    All Teachers List ({filteredTeachers.length})
                                </h2>
                            </div>
                            <div className='flex flex-col md:flex-row gap-3 items-center mb-2 w-full'>
                                <div className='flex gap-3'>
                                    <input 
                                        type="text" 
                                        className='w-full md:w-100 p-1 bg-gray-100 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                        placeholder='Search teachers...'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className='bg-gray-200 text-black p-2 rounded-md hover:bg-gray-300'>
                                        <IoSearch />
                                    </button>
                                </div>

                                <div className='flex w-full'>
                                    <select 
                                        className='p-1 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                    >
                                        <option value="">All Subjects</option>
                                        {uniqueSubjects.map(subject => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* list body */}
                        <div className="w-full h-[70%] md:h-[80%] p-3 rounded-md overflow-y-auto no-scrollbar">
                            {filteredTeachers.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">
                                    {teachers.length === 0 ? (
                                        <>
                                            <p className="text-lg">No teachers found</p>
                                            <p className="text-sm mt-2">Click "Add New +" to add a teacher.</p>
                                        </>
                                    ) : (
                                        <p className="text-lg">No teachers match your search criteria</p>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                                    {filteredTeachers.map((teacher) => (
                                        <div
                                            key={teacher.id}
                                            className="bg-gray-100 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition cursor-pointer hover:scale-105 transform transition-all duration-200"
                                        >
                                            {/* Image */}
                                            <img
                                                src={teacher.image || 'https://via.placeholder.com/150'}
                                                alt={teacher.fullName}
                                                className="w-16 h-16 rounded-full bg-amber-300 mx-auto mb-3 object-cover"
                                            />

                                            {/* Details */}
                                            <h2 className="text-lg font-semibold">{teacher.fullName}</h2>
                                            <p className="text-gray-600">Subject: {teacher.subject}</p>
                                            <p className="text-gray-600">Phone: {teacher.phone}</p>
                                            <p className="text-gray-500 text-xs mt-1">ID: {teacher.teacherId}</p>

                                            {/* Buttons */}
                                            <div className="flex justify-center gap-2 mt-4 text-black text-xl">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(teacher);
                                                    }}
                                                    className="px-3 py-1 rounded-md shadow-md active:scale-95 hover:bg-blue-100"
                                                    title="Edit Teacher"
                                                >
                                                    <AiFillEdit />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(teacher);
                                                    }}
                                                    className="px-3 py-1 rounded-md shadow-md active:scale-95 hover:bg-red-100"
                                                    title="Delete Teacher"
                                                >
                                                    <AiFillDelete />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewDetails(teacher);
                                                    }}
                                                    className="px-3 py-3 rounded-md shadow-md active:scale-95 hover:bg-green-100"
                                                    title="View Details"
                                                >
                                                    <HiViewGrid />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Teacher Form Modal (for Add/Edit) */}
            {isOpen && (
                <TeacherForm 
                    setIsOpen={handleCloseForm} 
                    teacherToEdit={teacherToEdit}
                />
            )}

            {/* Details Modal */}
            {showDetails && selectedTeacher && (
                <TeacherDetailsModal 
                    teacher={selectedTeacher} 
                    onClose={handleCloseDetails}
                    onEdit={handleEdit}
                />
            )}

            {/* Delete Confirmation Modal */}
            {teacherToDelete && (
                <DeleteConfirmationModal
                    teacher={teacherToDelete}
                    onConfirm={confirmDelete}
                    onCancel={() => setTeacherToDelete(null)}
                />
            )}
        </div>
    )
}

export default Teacher