import React, { useState, useEffect } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/userSlice"; // You'll need to create this action

const TSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    admissionNo: "",
    subject: "",
    profileImage: "",
    avatar: ""
  });

  // Initialize form data with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        admissionNo: user.admissionNo || "TCH-2024-001", // Default if not exists
        subject: user.subject || "",
        profileImage: user.profileImage || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Update user in Redux store
    dispatch(updateUser(formData));
    
    // Log for debugging
    console.log("Saved Teacher Data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        admissionNo: user.admissionNo || "TCH-2024-001",
        subject: user.subject || "",
        profileImage: user.profileImage || "",
        avatar: user.avatar || ""
      });
    }
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({
      ...formData,
      profileImage: "",
      avatar: ""
    });
  };

  // If no user is logged in, show loading or redirect
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

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

            {/* LEFT SIDE - Profile Photo */}
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
                  src={formData.profileImage || formData.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                  alt="teacher profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
                />

                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <div className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                        <FaCamera size={12} />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <p className="mt-3 font-medium text-sm">Profile Photo</p>

              {isEditing && formData.profileImage && (
                <button 
                  onClick={handleRemovePhoto}
                  className="text-red-500 text-sm mt-1 hover:underline"
                >
                  Remove photo
                </button>
              )}
            </div>

            {/* RIGHT SIDE - Form Fields */}
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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your phone number"
                  className={`w-full mt-2 p-3 rounded-md outline-none
                  ${isEditing
                      ? "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-200 cursor-not-allowed"}`}
                />
              </div>

              {/* Subject */}
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
                  placeholder="Enter your subject"
                  className={`w-full mt-2 p-3 rounded-md outline-none
                  ${isEditing
                      ? "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                      : "bg-gray-200 cursor-not-allowed"}`}
                />
              </div>

              {/* ID Number */}
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
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
                    >
                      Save Changes
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