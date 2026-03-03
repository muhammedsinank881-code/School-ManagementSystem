import React from "react";

const LoginDetails = ({
    formData,
    teacherToEdit,
    generatedUsername,
    usernameError,
    generatedPassword,
    handleInputChange,
    generateTeacherId
}) => {
    return (
        <div className="flex flex-col gap-2 bg-white rounded-2xl py-3">
            <div className="border-b border-[#D4D4D4] pb-2">
                <h1 className="font-bold text-[18px] px-5">Login/Account Details</h1>
            </div>

            <div className="flex flex-col gap-4 px-5">

                {/* Username */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Username (Auto-generated)</label>

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                        readOnly
                        disabled
                    />

                    {generatedUsername && !teacherToEdit && (
                        <p className="text-xs text-green-600 mt-1">✓ Generated: {generatedUsername}</p>
                    )}

                    {usernameError && <p className="text-xs text-orange-600 mt-1">⚠️ {usernameError}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">
                        Password {!teacherToEdit && (
                            <span className="text-xs text-gray-400 ml-1">(Auto-generated, you can change it)</span>
                        )}
                    </label>

                    <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {generatedPassword && !teacherToEdit && formData.password === generatedPassword && (
                        <p className="text-xs text-green-600 mt-1">✓ Generated: {formData.firstName}@last4phone</p>
                    )}
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Teacher Role</label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="teacher">Teacher</option>
                        <option value="hod">Head of Department (HOD)</option>
                    </select>

                    <p className="text-xs text-gray-400 mt-1">
                        HODs get additional privileges and access to HOD dashboard
                    </p>
                </div>

                {/* Teacher ID Preview */}
                {!teacherToEdit && formData.subject && (
                    <div className="bg-blue-50 p-2 rounded-lg mt-2">
                        <p className="text-xs text-blue-700">Teacher ID will be: {generateTeacherId(formData.subject)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginDetails;