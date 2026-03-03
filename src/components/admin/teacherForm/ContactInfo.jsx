import React from "react";

const ContactInfo = ({ formData, handleInputChange }) => {
    return (
        <div className="flex flex-col gap-2 bg-white rounded-2xl py-3">
            <div className="border-b border-[#D4D4D4] pb-2">
                <h1 className="font-bold text-[18px] px-5">Contact Information</h1>
            </div>

            {/* Phone + Email */}
            <div className="flex flex-col md:flex-row justify-center gap-2 px-5">
                <div className="flex flex-col w-full">
                    <h1 className="text-sm">Phone</h1>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Contact Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="flex flex-col w-full">
                    <h1 className="text-sm">Email</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
            </div>

            {/* Address */}
            <div className="flex flex-col px-5">
                <h1 className="text-sm">Address</h1>
                <input
                    type="text"
                    name="address"
                    placeholder="Area and Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Pincode + District */}
            <div className="flex flex-col md:flex-row gap-2 px-5">
                <div className="flex flex-col w-full">
                    <h1 className="text-sm">PinCode</h1>
                    <input
                        type="text"
                        name="pincode"
                        placeholder="PinCode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <h1 className="text-sm">District</h1>
                    <input
                        type="text"
                        name="district"
                        placeholder="District"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            {/* Location */}
            <div className="flex flex-col px-5">
                <h1 className="text-sm">Location</h1>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
        </div>
    );
};

export default ContactInfo;