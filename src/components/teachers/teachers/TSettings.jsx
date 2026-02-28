import React, { useState } from "react";
import { FaUser, FaCamera } from "react-icons/fa";

const TSettings = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "Walter White",
    email: "Walter.White@Teacher.edu",
    phone: "+91 98765 43210",
    admissionNo: "STU-2024-0198",
    subject: "Chemistry"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log("Saved Student Data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-lg w-full 
                      max-w-md md:max-w-6xl 
                      p-6 md:p-10">

        {/* Header */}
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold">Teacher Settings</h2>
          <p className="text-sm text-gray-500 mb-6">
            Manage your profile information
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-inner">

          <div className="flex flex-col md:flex-row gap-10">

            {/* LEFT SIDE */}
            <div className="flex flex-col items-center md:w-1/3">

              <div className="flex items-center gap-2 mb-2 font-medium">
                <FaUser className="text-blue-600" />
                <span>Teacher Profile</span>
              </div>

              <p className="text-xs text-gray-400 text-center mb-6">
                Update your personal details and profile photo.
              </p>

              <div className="relative">
                <img
                  src="https://user-images.githubusercontent.com/122842611/233790179-4d505e04-a9f8-4e86-8fb1-1c36c99836f3.jpg"
                  alt="student profile"
                  className="w-28 h-28 rounded-full object-cover"
                />

                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                    <FaCamera size={12} />
                  </div>
                )}
              </div>

              <p className="mt-3 font-medium text-sm">Profile Photo</p>

              {isEditing && (
                <button className="text-red-500 text-sm mt-1 hover:underline">
                  Remove photo
                </button>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-2/3 space-y-6">

              {/* Name */}
              <div>
                <label className="text-sm font-medium block">
                  Teacher Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full mt-2 p-3 rounded-md outline-none
                  ${isEditing
                      ? "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-200 cursor-not-allowed"}`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium block">
                  Teacher Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full mt-2 p-3 rounded-md outline-none
                  ${isEditing
                      ? "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-200 cursor-not-allowed"}`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium block">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full mt-2 p-3 rounded-md outline-none
                  ${isEditing
                      ? "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-200 cursor-not-allowed"}`}
                />
              </div>

              {/* Grade */}
              <div>
                <label className="text-sm font-medium block">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full mt-2 p-3 rounded-md outline-none
                  ${isEditing
                      ? "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-200 cursor-not-allowed"}`}
                />
              </div>

              {/* Admission Number */}
              <div>
                <label className="text-sm font-medium block">
                  ID Number
                </label>
                <input
                  type="text"
                  name="admissionNo"
                  value={formData.admissionNo}
                  disabled
                  className="w-full mt-2 p-3 bg-gray-200 rounded-md cursor-not-allowed"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 flex gap-3">

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TSettings;