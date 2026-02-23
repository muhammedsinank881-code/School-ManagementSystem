import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoCall, IoSearch } from "react-icons/io5";

/* ------------------ DATA ------------------ */
const teachers = [
  { id: 1, name: "John Doe", subject: "Physics", phone: "123-456-7890", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jane Smith", subject: "Mathematics", phone: "098-765-4321", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Bob Johnson", subject: "Chemistry", phone: "555-123-4567", image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, name: "John Doe", subject: "Biology", phone: "123-456-7890", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 5, name: "Jane Smith", subject: "English", phone: "098-765-4321", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 6, name: "Bob Johnson", subject: "Computer", phone: "555-123-4567", image: "https://randomuser.me/api/portraits/men/3.jpg" },
];

/* ------------------ CARD ------------------ */
const TeacherCard = ({ teacher }) => {
  const { name, subject, phone, image } = teacher;

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full mx-auto mb-3"
      />

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 text-sm">Subject: {subject}</p>
      <p className="text-gray-600 text-sm">Phone: {phone}</p>

      <div className="flex justify-center gap-3 mt-4 text-xl">
        <button
          aria-label={`Call ${name}`}
          className="bg-white px-3 py-1 rounded-md hover:bg-gray-200"
        >
          <IoCall />
        </button>
        <button
          aria-label={`WhatsApp ${name}`}
          className="bg-white px-3 py-1 rounded-md hover:bg-gray-200"
        >
          <BsWhatsapp />
        </button>
      </div>
    </div>
  );
};

/* ------------------ MAIN ------------------ */
const Teachers = () => {
  return (
    <div className="w-full min-h-full bg-gray-100 p-5 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teachers</h1>
        
      </div>

      {/* List Container */}
      <div className="bg-white rounded-2xl p-4 flex flex-col">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">All Teachers List</h2>

          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <input
              type="text"
              placeholder="Search teachers..."
              className="w-full md:w-64 p-2 bg-gray-100 border border-gray-200 rounded-md"
            />
            <button className="bg-gray-200 p-2 rounded-md">
              <IoSearch />
            </button>
            <select className="p-2 bg-gray-100 border border-gray-200 rounded-md">
              <option>All Subjects</option>
              <option>Physics</option>
              <option>Mathematics</option>
              <option>Chemistry</option>
              <option>Biology</option>
              <option>English</option>
              <option>Computer</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;