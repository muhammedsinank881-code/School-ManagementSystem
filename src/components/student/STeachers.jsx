import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoCall, IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

/* ------------------ CARD ------------------ */
const TeacherCard = ({ teacher }) => {
  const { fullName, subject, phone, image } = teacher;

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={fullName}
        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
      />

      <h3 className="text-lg font-semibold">{fullName}</h3>
      <p className="text-gray-600 text-sm">Subject: {subject}</p>
      <p className="text-gray-600 text-sm">Phone: {phone}</p>
      <p className="text-gray-500 text-xs mt-1">ID: {teacher.teacherId}</p>

      <div className="flex justify-center gap-3 mt-4 text-xl">
        <button
          aria-label={`Call ${fullName}`}
          className="shadow-md px-3 py-1 rounded-md hover:bg-white"
        >
          <IoCall />
        </button>
        <button
          aria-label={`WhatsApp ${fullName}`}
          className="shadow-md px-3 py-1 rounded-md hover:bg-white"
        >
          <BsWhatsapp />
        </button>
      </div>
    </div>
  );
};

/* ------------------ MAIN ------------------ */
const STeachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Get teachers from Redux store
  const teachers = useSelector((state) => state.teachers.list);

  // Get unique subjects for filter dropdown
  const uniqueSubjects = [...new Set(teachers.map(t => t.subject).filter(Boolean))];

  // Filter teachers based on search and subject
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="w-full min-h-full bg-gray-100 p-5 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <div className="text-sm text-gray-600">
          Total: {teachers.length} teachers
        </div>
      </div>

      {/* List Container */}
      <div className="bg-white rounded-2xl p-4 flex flex-col min-h-[calc(100vh-200px)]">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">
            All Teachers List {filteredTeachers.length > 0 && `(${filteredTeachers.length})`}
          </h2>

          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                <IoSearch />
              </button>
            </div>
            
            <select 
              className="p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Grid */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {filteredTeachers.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 py-10">
              {teachers.length === 0 ? (
                <>
                  <p className="text-lg">No teachers found</p>
                  <p className="text-sm mt-2">Add teachers from the Teachers page to see them here</p>
                </>
              ) : (
                <p className="text-lg">No teachers match your search criteria</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filteredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default STeachers;