import React from "react";

const BasicInfo = ({ formData, handleInputChange }) => {
    return (
        <>
            <div>
                <h1 className="border-b border-gray-300 font-semibold text-[18px] px-5 py-4">
                    Basic information
                </h1>
            </div>

            <div className="flex flex-col md:grid grid-cols-2 px-5 py-4 gap-3">

                {/* Left side */}
                <div className="flex flex-col gap-6">

                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                        <h1>First Name</h1>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            className="w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98"
                            required
                        />

                        {/* Last name mobile */}
                        <div className="flex flex-col gap-2 md:hidden">
                            <h1>Last Name</h1>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98"
                                required
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-2">
                        <h1>Gender</h1>
                        <div className="flex flex-row">
                            <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleInputChange}
                                />
                                Male
                            </label>

                            <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleInputChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    {/* DOB */}
                    <div className="flex flex-col gap-2">
                        <h1>Date of Birth</h1>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="w-full border border-[#D4D4D4] rounded-md shadow-md text-gray-500 px-2 py-1 active:scale-98"
                            required
                        />
                        {formData.dob && (
                            <p className="text-xs text-gray-400">
                                Username will use: {new Date(formData.dob).toLocaleDateString()}
                            </p>
                        )}
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-full active:scale-98">
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full border border-[#D4D4D4] rounded-md text-gray-700 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    <option value="English">English</option>
                                    <option value="Malayalam">Malayalam</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Urdu">Urdu</option>
                                    <option value="Maths">Maths</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Biology">Biology</option>
                                    <option value="History">History</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Computer">Computer</option>
                                    <option value="PT">PT</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right side */}
                <div className="flex flex-col gap-6">

                    {/* Last Name desktop */}
                    <div className="hidden md:flex flex-col gap-2">
                        <h1>Last Name</h1>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            className="w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98"
                            required
                        />
                    </div>

                </div>

            </div>
        </>
    );
};

export default BasicInfo;