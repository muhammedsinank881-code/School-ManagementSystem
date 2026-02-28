import React, { useState, useEffect } from 'react'
import Doc from '../../assets/document.svg'
import { useDispatch, useSelector } from "react-redux";
import { addTeacher, updateTeacher } from "../../store/teachersSlice";
import { v4 as uuidv4 } from "uuid";

const TeacherForm = ({ setIsOpen, teacherToEdit }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        subject: "",
        role: "teacher", // Add this line - default to "teacher"
        username: "",
        password: "",
        phone: "",
        email: "",
        address: "",
        pincode: "",
        district: "",
        location: "",
        image: "",
    });

    const [generatedUsername, setGeneratedUsername] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const dispatch = useDispatch();
    
    // Get all teachers to check username uniqueness
    const allTeachers = useSelector((state) => state.teachers.list || []);

    // Load teacher data if editing
    useEffect(() => {
        if (teacherToEdit) {
            setFormData({
                firstName: teacherToEdit.firstName || "",
                lastName: teacherToEdit.lastName || "",
                gender: teacherToEdit.gender || "",
                dob: teacherToEdit.dob || "",
                subject: teacherToEdit.subject || "",
                role: teacherToEdit.role || "teacher", // Add this line
                username: teacherToEdit.username || "",
                password: teacherToEdit.password || "",
                phone: teacherToEdit.phone || "",
                email: teacherToEdit.email || "",
                address: teacherToEdit.address || "",
                pincode: teacherToEdit.pincode || "",
                district: teacherToEdit.district || "",
                location: teacherToEdit.location || "",
                image: teacherToEdit.image || "",
            });
        }
    }, [teacherToEdit]);

    const generateTeacherId = (subject) => {
        const map = {
            English: "ENG",
            Malayalam: "MAL",
            Hindi: "HIN",
            Arabic: "ARB",
            Urdu: "URD",
            Maths: "MTH",
            Physics: "PHY",
            Chemistry: "CHE",
            Biology: "BIO",
            History: "HIS",
            Geography: "GEO",
            Computer: "COM",
            PT: "P.T"
        };

        if (!subject || !map[subject]) return "TCH-NEW";
        
        // Generate a unique ID with random number
        const randomNum = Math.floor(100 + Math.random() * 900);
        return `${map[subject]}-T-${randomNum}`;
    };

    // Check if username is unique
    const isUsernameUnique = (username) => {
        if (!username) return true;
        
        // If editing, exclude the current teacher from the check
        if (teacherToEdit) {
            return !allTeachers.some(teacher => 
                teacher.username === username && teacher.id !== teacherToEdit.id
            );
        }
        
        // If adding new, check against all teachers
        return !allTeachers.some(teacher => teacher.username === username);
    };

    // Auto-generate username when firstName, subject, or dob changes
    useEffect(() => {
        if (!teacherToEdit && formData.firstName && formData.subject && formData.dob) {
            const generateUsername = () => {
                // Full first name
                const firstNamePart = formData.firstName.replace(/\s+/g, '');
                
                // Subject code (first 3 letters of subject)
                const subjectMap = {
                    "English": "ENG",
                    "Malayalam": "MAL",
                    "Hindi": "HIN",
                    "Arabic": "ARB",
                    "Urdu": "URD",
                    "Maths": "MTH",
                    "Physics": "PHY",
                    "Chemistry": "CHE",
                    "Biology": "BIO",
                    "History": "HIS",
                    "Geography": "GEO",
                    "Computer": "COM",
                    "PT": "PT"
                };
                
                const subjectCode = subjectMap[formData.subject] || formData.subject.substring(0, 3).toUpperCase();
                
                // Date part (MMDD from DOB)
                const date = new Date(formData.dob);
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const datePart = month + day;
                
                return `${firstNamePart}_${subjectCode}_${datePart}`;
            };
            
            const newUsername = generateUsername();
            
            // Check if username is unique
            if (isUsernameUnique(newUsername)) {
                setGeneratedUsername(newUsername);
                setFormData(prev => ({ ...prev, username: newUsername }));
                setUsernameError("");
            } else {
                // If not unique, add a number at the end
                let counter = 1;
                let uniqueUsername = newUsername;
                while (!isUsernameUnique(uniqueUsername)) {
                    uniqueUsername = `${newUsername}_${counter}`;
                    counter++;
                }
                setGeneratedUsername(uniqueUsername);
                setFormData(prev => ({ ...prev, username: uniqueUsername }));
                setUsernameError(`Username adjusted to ensure uniqueness: ${uniqueUsername}`);
            }
        }
    }, [formData.firstName, formData.subject, formData.dob, teacherToEdit]);

    // Auto-generate password when firstName and phone change
    useEffect(() => {
        if (!teacherToEdit && formData.firstName && formData.phone && formData.phone.length >= 4) {
            // Get last 4 digits of phone number
            const last4Phone = formData.phone.slice(-4);
            
            // Create password: firstName@last4Phone
            const newPassword = `${formData.firstName}@${last4Phone}`;
            setGeneratedPassword(newPassword);
            setFormData(prev => ({ ...prev, password: newPassword }));
        }
    }, [formData.firstName, formData.phone, teacherToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear generated values when user manually types
        if (name === 'username' && value !== generatedUsername) {
            setGeneratedUsername('');
            // Check uniqueness of manually entered username
            if (value && !isUsernameUnique(value)) {
                setUsernameError("This username is already taken. Please choose another.");
            } else {
                setUsernameError("");
            }
        }
        if (name === 'password' && value !== generatedPassword) {
            setGeneratedPassword('');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        if (teacherToEdit) {
            // If editing, reset to original values
            setFormData({
                firstName: teacherToEdit.firstName || "",
                lastName: teacherToEdit.lastName || "",
                gender: teacherToEdit.gender || "",
                dob: teacherToEdit.dob || "",
                subject: teacherToEdit.subject || "",
                role: teacherToEdit.role || "teacher",
                username: teacherToEdit.username || "",
                password: teacherToEdit.password || "",
                phone: teacherToEdit.phone || "",
                email: teacherToEdit.email || "",
                address: teacherToEdit.address || "",
                pincode: teacherToEdit.pincode || "",
                district: teacherToEdit.district || "",
                location: teacherToEdit.location || "",
                image: teacherToEdit.image || "",
            });
        } else {
            // If adding new, clear all fields
            setFormData({
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                subject: "",
                role: "teacher",
                username: "",
                password: "",
                phone: "",
                email: "",
                address: "",
                pincode: "",
                district: "",
                location: "",
                image: "",
            });
            setGeneratedUsername("");
            setGeneratedPassword("");
            setUsernameError("");
        }
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName) {
            alert("Please enter teacher's full name");
            return false;
        }
        if (!formData.subject) {
            alert("Please select a subject");
            return false;
        }
        if (!formData.phone || !formData.email) {
            alert("Please enter contact information");
            return false;
        }
        if (!formData.dob) {
            alert("Please enter date of birth");
            return false;
        }
        
        // Validate username uniqueness
        if (!isUsernameUnique(formData.username)) {
            alert("This username is already taken. Please use a different username.");
            return false;
        }
        
        return true;
    };

    const handleSaveTeacher = () => {
        if (!validateForm()) return;

        if (teacherToEdit) {
            // Update existing teacher
            const updatedTeacher = {
                ...teacherToEdit,
                firstName: formData.firstName,
                lastName: formData.lastName,
                fullName: formData.firstName + " " + formData.lastName,
                gender: formData.gender,
                dob: formData.dob,
                subject: formData.subject,
                role: formData.role,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                pincode: formData.pincode,
                district: formData.district,
                location: formData.location,
                image: formData.image || teacherToEdit.image,
                username: formData.username,
                password: formData.password,
            };

            dispatch(updateTeacher(updatedTeacher));
            alert("Teacher Updated Successfully!");
        } else {
            // Add new teacher
            const newTeacher = {
                id: uuidv4(),
                fullName: formData.firstName + " " + formData.lastName,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dob: formData.dob,
                subject: formData.subject,
                role: formData.role,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                pincode: formData.pincode,
                district: formData.district,
                location: formData.location,
                image: formData.image || "/default-teacher.png",
                username: formData.username,
                password: formData.password,
                teacherId: generateTeacherId(formData.subject),
            };

            dispatch(addTeacher(newTeacher));
            alert("Teacher Added Successfully!");
        }

        setIsOpen(false);
    };

    return (
        <div className='flex flex-col items-center w-full py-3 px-5 bg-gray-100'>
            <div className='flex flex-col md:flex-row items-center md:justify-between w-full'>
                <div className='flex flex-row items-center justify-between gap-5 md:gap-10'>
                    <button 
                        className='bg-white text-2xl shadow-md px-2 rounded active:scale-98'
                        onClick={() => { setIsOpen(false) }}>
                        ←
                    </button>
                    <h1 className='text-[24px] font-medium'>
                        {teacherToEdit ? 'Edit Teacher' : 'Add New Teacher'}
                    </h1>
                </div>
                <div className='hidden md:flex gap-3'>
                    <button 
                        className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md'
                        onClick={() => { setIsOpen(false) }}>
                        cancel
                    </button>
                    <button 
                        className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md'
                        onClick={handleReset}>
                        reset
                    </button>
                    <button
                        onClick={handleSaveTeacher}
                        className='bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md'>
                        {teacherToEdit ? 'update' : 'save'}
                    </button>
                </div>
            </div>

            {/* Form Fields */}
            <div className='flex flex-col md:grid grid-cols-2 gap-3 bg-gray-100 w-full pt-10'>
                {/* Left Column - Basic Information */}
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-6 bg-white rounded-2xl py-3'>
                        <div>
                            <h1 className='border-b border-gray-300 font-semibold text-[18px] px-5 py-4'>Basic information</h1>
                        </div>

                        <div className='flex flex-col md:grid grid-cols-2 px-5 py-4 gap-3'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <h1>First Name</h1>
                                    <input 
                                        type="text" 
                                        name='firstName' 
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder='First Name'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                        required
                                    />
                                    <div className='flex flex-col gap-2 md:hidden'>
                                        <h1>Last Name</h1>
                                        <input 
                                            type="text" 
                                            name='lastName' 
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder='Last Name'
                                            className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h1>Gender</h1>
                                    <div className='flex flex-row'>
                                        <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === "male"}
                                                onChange={handleInputChange}
                                                className="active:scale-98"
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
                                                className="active:scale-98"
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <h1>Date of Birth</h1>
                                    <input 
                                        type="date" 
                                        name='dob'
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className='w-full border border-[#D4D4D4] rounded-md shadow-md text-gray-500 px-2 py-1 active:scale-98' 
                                        required
                                    />
                                    {formData.dob && (
                                        <p className="text-xs text-gray-400">
                                            Username will use: {new Date(formData.dob).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className="flex gap-4">
                                        {/* Subject Dropdown */}
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

                            <div className='flex flex-col gap-6'>
                                <div className='hidden md:flex flex-col gap-2'>
                                    <h1>Last Name</h1>
                                    <input 
                                        type="text" 
                                        name='lastName' 
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder='Last Name'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                        required
                                    />
                                </div>

                                <div className='flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-400 mt-4 rounded-xl gap-3'>
                                    {formData.image ? (
                                        <img 
                                            src={formData.image} 
                                            alt="Preview" 
                                            className="w-20 h-20 rounded-full object-cover" 
                                        />
                                    ) : (
                                        <button onClick={() => document.getElementById("imageUpload").click()}>
                                            <img src={Doc} alt="upload" />
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="imageUpload"
                                    />
                                    <p>drop files to upload</p>
                                    <label 
                                        htmlFor="imageUpload" 
                                        className="cursor-pointer border p-1 rounded-xl bg-gray-100 hover:bg-gray-200"
                                    >
                                        Select File
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Login & Contact Information */}
                <div className='bg-gray-100 flex flex-col gap-3'>
                    {/* Login/Account Details */}
                    <div className='flex flex-col gap-2 bg-white rounded-2xl py-3'>
                        <div className='border-b border-[#D4D4D4] pb-2'>
                            <h1 className='font-bold text-[18px] px-5'>Login/Account Details</h1>
                        </div>
                        <div className='flex flex-col gap-4 px-5'>
                            {/* Username Field */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm text-gray-600'>Username (Auto-generated)</label>
                                <input 
                                    type="text" 
                                    name='username'
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder='Username will be auto-generated'
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 bg-gray-100 text-gray-600 cursor-not-allowed'
                                    readOnly
                                    disabled
                                />
                                {generatedUsername && !teacherToEdit && (
                                    <p className='text-xs text-green-600 mt-1'>
                                        ✓ Generated: {generatedUsername}
                                    </p>
                                )}
                                {usernameError && (
                                    <p className='text-xs text-orange-600 mt-1'>
                                        ⚠️ {usernameError}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm text-gray-600'>
                                    Password 
                                    {!teacherToEdit && <span className='text-xs text-gray-400 ml-1'>(Auto-generated, you can change it)</span>}
                                </label>
                                <input 
                                    type="text" 
                                    placeholder='Password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                {generatedPassword && !teacherToEdit && formData.password === generatedPassword && (
                                    <p className='text-xs text-green-600 mt-1'>
                                        ✓ Generated: {formData.firstName}@last4phone
                                    </p>
                                )}
                                {formData.phone && formData.phone.length >= 4 && !teacherToEdit && (
                                    <p className='text-xs text-gray-400 mt-1'>
                                        Password format: FirstName@last4digits (e.g., {formData.firstName}@{formData.phone.slice(-4)})
                                    </p>
                                )}
                            </div>

                            {/* Role Selection - ADD THIS SECTION */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm text-gray-600'>Teacher Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                >
                                    <option value="teacher"> Teacher</option>
                                    <option value="hod"> Head of Department (HOD)</option>
                                </select>
                                <p className='text-xs text-gray-400 mt-1'>
                                    HODs get additional privileges and access to HOD dashboard
                                </p>
                            </div>

                            {/* Teacher ID Preview */}
                            {!teacherToEdit && formData.subject && (
                                <div className='bg-blue-50 p-2 rounded-lg mt-2'>
                                    <p className='text-xs text-blue-700'>
                                        Teacher ID will be: {generateTeacherId(formData.subject)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className='flex flex-col gap-2 bg-white rounded-2xl py-3'>
                        <div className='border-b border-[#D4D4D4] pb-2'>
                            <h1 className='font-bold text-[18px] px-5'>Contact Information</h1>
                        </div>
                        
                        <div className='flex flex-col md:flex-row justify-center gap-2 px-5'>
                            <div className='flex flex-col w-full'>
                                <h1 className='text-sm'>Phone</h1>
                                <input 
                                    type="tel" 
                                    placeholder='Contact Number'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className='border border-[#D4D4D4] rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className='text-sm'>Email</h1>
                                <input 
                                    type="email" 
                                    placeholder='example@gmail.com'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='border border-[#D4D4D4] rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex flex-col px-5'>
                            <h1 className='text-sm'>Address</h1>
                            <input 
                                type="text" 
                                placeholder='Area and Street'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row gap-2 px-5'>
                            <div className='flex flex-col w-full'>
                                <h1 className='text-sm'>PinCode</h1>
                                <input 
                                    type="text" 
                                    placeholder='PinCode'
                                    name='pincode'
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className='text-sm'>District</h1>
                                <input 
                                    type="text" 
                                    placeholder='District'
                                    name='district'
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col px-5'>
                            <h1 className='text-sm'>Location</h1>
                            <input 
                                type="text" 
                                placeholder='Location'
                                name='location'
                                value={formData.location}
                                onChange={handleInputChange}
                                className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Buttons */}
            <div className='flex md:hidden py-10 gap-3'>
                <button 
                    className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md'
                    onClick={() => setIsOpen(false)}>
                    cancel
                </button>
                <button 
                    className='bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md'
                    onClick={handleReset}>
                    reset
                </button>
                <button
                    onClick={handleSaveTeacher}
                    className='bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md'>
                    {teacherToEdit ? 'update' : 'save'}
                </button>
            </div>
        </div>
    )
}

export default TeacherForm;