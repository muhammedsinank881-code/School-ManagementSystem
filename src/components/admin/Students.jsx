import React, { useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";
import { IoSearch, IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import StudentForm from './StudentForm';
import { deleteStudent } from "../../store/studentsSlice";

// Student Details Modal - Popup overlay
const StudentDetailsModal = ({ student, onClose, onEdit }) => {
  if (!student) return null;

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
              <h2 className="text-2xl font-bold">Student Details</h2>
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
                  src={student.image || 'https://via.placeholder.com/150'}
                  alt={student.fullName}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
                />
                <h3 className="text-xl font-semibold">{student.fullName}</h3>
                <p className="text-gray-600 bg-blue-50 px-3 py-1 rounded-full text-sm mt-2">
                  ID: {student.studentId}
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  Class: {student.className}{student.division}
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
                      <p className="font-medium">{student.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium">{student.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">{student.gender || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{student.dob || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{student.address || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">District</p>
                      <p className="font-medium">{student.district || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pincode</p>
                      <p className="font-medium">{student.pincode || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Info */}
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2">Parent Information</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Father's Name</p>
                      <p className="font-medium">{student.fatherName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mother's Name</p>
                      <p className="font-medium">{student.motherName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Father's Contact</p>
                      <p className="font-medium">{student.fatherContact || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mother's Contact</p>
                      <p className="font-medium">{student.motherContact || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Father's Occupation</p>
                      <p className="font-medium">{student.fatherJob || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Annual Income</p>
                      <p className="font-medium">{student.income || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2">Account Information</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{student.username || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  onEdit(student);
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
const DeleteConfirmationModal = ({ student, onConfirm, onCancel }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onCancel} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 pointer-events-auto shadow-2xl">
          <h3 className="text-xl font-bold mb-4">Delete Student</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{student?.fullName}</span>? 
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
              onClick={() => onConfirm(student.id)}
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

export const Students = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [studentToEdit, setStudentToEdit] = useState(null)
    const [studentToDelete, setStudentToDelete] = useState(null)
    const [showDetails, setShowDetails] = useState(false)
    
    // Get students from Redux store
    const students = useSelector((state) => state.students.list)
    const dispatch = useDispatch();

    // Get unique classes for filter dropdown
    const uniqueClasses = [...new Set(students.map(s => s.className).filter(Boolean))].sort();

    // Filter students based on search and class filter
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesClass = !selectedClass || student.className === selectedClass
        return matchesSearch && matchesClass
    });

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setShowDetails(true);
        document.body.style.overflow = 'hidden';
    };

    const handleEdit = (student) => {
        setStudentToEdit(student);
        setIsOpen(true);
    };

    const handleDelete = (student) => {
        setStudentToDelete(student);
    };

    const confirmDelete = (id) => {
        dispatch(deleteStudent(id));
        setStudentToDelete(null);
        alert("Student deleted successfully!");
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedStudent(null);
        document.body.style.overflow = 'unset';
    };

    const handleCloseForm = () => {
        setIsOpen(false);
        setStudentToEdit(null);
    };

    return (
        <div className='w-full h-full bg-gray-100 p-5 space-y-5'>
            {!isOpen && (
                <>
                    {/* head */}
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold'>Students</h1>
                        <div className='flex gap-3'>
                            <div className='text-sm text-gray-600 bg-white px-3 py-1 rounded-full'>
                                Total: {students.length} student{students.length !== 1 ? 's' : ''}
                            </div>
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
                                    All Students List ({filteredStudents.length})
                                </h2>
                            </div>
                            <div className='flex flex-col md:flex-row gap-3 items-center mb-2 w-full'>
                                <div className='flex gap-3'>
                                    <input 
                                        type="text" 
                                        className='w-full md:w-100 p-1 bg-gray-100 border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                                        placeholder='Search students...'
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
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                    >
                                        <option value="">All Classes</option>
                                        {uniqueClasses.map(cls => (
                                            <option key={cls} value={cls}>Class {cls}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        {/* list body */}
                        <div className="w-full h-[70%] md:h-[80%] p-3 rounded-md overflow-y-auto no-scrollbar">
                            {filteredStudents.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">
                                    {students.length === 0 ? (
                                        <>
                                            <p className="text-lg">No students found</p>
                                            <p className="text-sm mt-2">Click "Add New +" to add a student.</p>
                                        </>
                                    ) : (
                                        <p className="text-lg">No students match your search criteria</p>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                                    {filteredStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            className="bg-gray-100 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition cursor-pointer hover:scale-105 transform transition-all duration-200"
                                        >
                                            {/* Image */}
                                            <img
                                                src={student.image || 'https://via.placeholder.com/150'}
                                                alt={student.fullName}
                                                className="w-16 h-16 rounded-full bg-amber-300 mx-auto mb-3 object-cover"
                                            />

                                            {/* Details */}
                                            <h2 className="text-lg font-semibold">{student.fullName}</h2>
                                            <p className="text-gray-600">
                                                Class: {student.className}{student.division}
                                            </p>
                                            <p className="text-gray-600">Phone: {student.phone}</p>
                                            <p className="text-gray-600 text-sm">ID: {student.studentId}</p>

                                            {/* Buttons */}
                                            <div className="flex justify-center gap-2 mt-4 text-black text-xl">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(student);
                                                    }}
                                                    className="active:scale-95 px-3 py-1 rounded-md shadow-md hover:bg-blue-100"
                                                    title="Edit Student"
                                                >
                                                    <AiFillEdit />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(student);
                                                    }}
                                                    className="active:scale-95 px-3 py-1 rounded-md shadow-md hover:bg-red-100"
                                                    title="Delete Student"
                                                >
                                                    <AiFillDelete />
                                                </button>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewDetails(student);
                                                    }}
                                                    className="active:scale-95 px-3 py-3 rounded-md shadow-md hover:bg-green-100"
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

            {/* Student Form Modal (for Add/Edit) */}
            {isOpen && (
                <StudentForm 
                    setIsOpen={handleCloseForm} 
                    studentToEdit={studentToEdit}
                />
            )}

            {/* Details Modal */}
            {showDetails && selectedStudent && (
                <StudentDetailsModal 
                    student={selectedStudent} 
                    onClose={handleCloseDetails}
                    onEdit={handleEdit}
                />
            )}

            {/* Delete Confirmation Modal */}
            {studentToDelete && (
                <DeleteConfirmationModal
                    student={studentToDelete}
                    onConfirm={confirmDelete}
                    onCancel={() => setStudentToDelete(null)}
                />
            )}
        </div>
    )
}