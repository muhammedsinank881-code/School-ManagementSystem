import React from "react";
import { FaUser, FaCamera } from "react-icons/fa";

const StudentSettings = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-lg w-full 
                      max-w-md md:max-w-6xl 
                      p-6 md:p-10">

        {/* Header */}
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold">Student Settings</h2>
          <p className="text-sm text-gray-500 mb-6">
            View and manage your student profile information
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-inner">

          <div className="flex flex-col md:flex-row gap-10">

            {/* LEFT SIDE */}
            <div className="flex flex-col items-center md:w-1/3">

              <div className="flex items-center gap-2 mb-2 font-medium">
                <FaUser className="text-blue-600" />
                <span>Student Profile</span>
              </div>

              <p className="text-xs text-gray-400 text-center mb-6">
                Your profile photo and basic identity.
              </p>

              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/48.jpg"
                  alt="student profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                  <FaCamera size={12} />
                </div>
              </div>

              <p className="mt-3 font-medium text-sm">Profile Photo</p>

              <button className="text-red-500 text-sm mt-1 hover:underline">
                Remove photo
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-2/3 space-y-6">

              <div>
                <label className="text-sm font-medium block">
                  Student Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Ayaan Rahman"
                  className="w-full mt-2 p-3 bg-gray-200 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium block">
                  Student Email
                </label>
                <input
                  type="email"
                  defaultValue="ayaan.rahman@student.edu"
                  className="w-full mt-2 p-3 bg-gray-200 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium block">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+91 98765 43210"
                  className="w-full mt-2 p-3 bg-gray-200 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium block">
                  Class / Grade
                </label>
                <input
                  type="text"
                  defaultValue="Grade 10 – Science"
                  className="w-full mt-2 p-3 bg-gray-200 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium block">
                  Admission Number
                </label>
                <input
                  type="text"
                  defaultValue="STU-2024-0198"
                  className="w-full mt-2 p-3 bg-gray-200 rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Buttons – UI only */}
              <div className="pt-4 flex gap-3">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition">
                  Edit
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;