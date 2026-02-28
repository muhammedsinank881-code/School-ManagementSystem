import React, { useState } from "react";
import { FaUser, FaCamera } from "react-icons/fa";

const Settings = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "Dr. Alexander Wright",
    email: "alexander.wright@edu-inst.com",
    phone: "+1 (555) 000-1234"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
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
          <h2 className="text-xl md:text-2xl font-semibold">Settings</h2>
          <p className="text-sm text-gray-500 mb-6">
            Manage your institution preferences and account security
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-inner">

          <div className="flex flex-col md:flex-row gap-10">

            {/* LEFT SIDE */}
            <div className="flex flex-col items-center md:w-1/3">

              <div className="flex items-center gap-2 mb-2 font-medium">
                <FaUser className="text-blue-600" />
                <span>Profile Settings</span>
              </div>

              <p className="text-xs text-gray-400 text-center mb-6">
                Update your personal information and photo.
              </p>

              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="profile"
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

              <div>
                <label className="text-sm font-medium block">
                  Admin Full Name
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

              <div>
                <label className="text-sm font-medium block">
                  Email Address
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

export default Settings;