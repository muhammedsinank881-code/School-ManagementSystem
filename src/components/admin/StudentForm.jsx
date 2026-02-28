import React, { useState, useEffect } from 'react'
import Doc from '../../assets/document.svg'
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../../store/studentsSlice";
import { v4 as uuidv4 } from "uuid";

const StudentForm = ({ setIsOpen, studentToEdit }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        className: "",
        division: "",
        phone: "",
        email: "",
        address: "",
        pincode: "",
        district: "",
        location: "",
        fatherName: "",
        motherName: "",
        fatherContact: "",
        motherContact: "",
        fatherJob: "",
        income: "",
        image: "",
        username: "",
        password: ""
    });

    const [generatedUsername, setGeneratedUsername] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const dispatch = useDispatch();
    
    // Get all students to check username uniqueness
    const allStudents = useSelector((state) => state.students.list || []);

    // Load student data if editing
    useEffect(() => {
        if (studentToEdit) {
            setFormData({
                firstName: studentToEdit.firstName || "",
                lastName: studentToEdit.lastName || "",
                gender: studentToEdit.gender || "",
                dob: studentToEdit.dob || "",
                className: studentToEdit.className || "",
                division: studentToEdit.division || "",
                phone: studentToEdit.phone || "",
                email: studentToEdit.email || "",
                address: studentToEdit.address || "",
                pincode: studentToEdit.pincode || "",
                district: studentToEdit.district || "",
                location: studentToEdit.location || "",
                fatherName: studentToEdit.fatherName || "",
                motherName: studentToEdit.motherName || "",
                fatherContact: studentToEdit.fatherContact || "",
                motherContact: studentToEdit.motherContact || "",
                fatherJob: studentToEdit.fatherJob || "",
                income: studentToEdit.income || "",
                image: studentToEdit.image || "",
                username: studentToEdit.username || "",
                password: studentToEdit.password || "",
            });
        }
    }, [studentToEdit]);

    const generateStudentId = (cls, div) => {
        if (!cls || !div) return "STU-NEW";
        return `STU-${cls}-${div}-${Math.floor(100 + Math.random() * 900)}`;
    };

    // Check if username is unique
    const isUsernameUnique = (username) => {
        if (!username) return true;
        
        // If editing, exclude the current student from the check
        if (studentToEdit) {
            return !allStudents.some(student => 
                student.username === username && student.id !== studentToEdit.id
            );
        }
        
        // If adding new, check against all students
        return !allStudents.some(student => student.username === username);
    };

    // Auto-generate username when firstName, className, or dob changes
    useEffect(() => {
        if (!studentToEdit && formData.firstName && formData.className && formData.dob) {
            const generateUsername = () => {
                // Full first name
                const firstNamePart = formData.firstName.replace(/\s+/g, '');
                
                // Class code (first 3 letters of class with 'C' prefix)
                const classCode = `C${formData.className}`;
                
                // Date part (MMDD from DOB)
                const date = new Date(formData.dob);
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const datePart = month + day;
                
                return `${firstNamePart}_${classCode}_${datePart}`;
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
    }, [formData.firstName, formData.className, formData.dob, studentToEdit]);

    // Auto-generate password when firstName and phone change
    useEffect(() => {
        if (!studentToEdit && formData.firstName && formData.phone && formData.phone.length >= 4) {
            // Get last 4 digits of phone number
            const last4Phone = formData.phone.slice(-4);
            
            // Create password: firstName@last4Phone
            const newPassword = `${formData.firstName}@${last4Phone}`;
            setGeneratedPassword(newPassword);
            setFormData(prev => ({ ...prev, password: newPassword }));
        }
    }, [formData.firstName, formData.phone, studentToEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

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

    const handleGenderChange = (e) => {
        setFormData({ ...formData, gender: e.target.value });
    };

    const handleReset = () => {
        if (studentToEdit) {
            // If editing, reset to original values
            setFormData({
                firstName: studentToEdit.firstName || "",
                lastName: studentToEdit.lastName || "",
                gender: studentToEdit.gender || "",
                dob: studentToEdit.dob || "",
                className: studentToEdit.className || "",
                division: studentToEdit.division || "",
                phone: studentToEdit.phone || "",
                email: studentToEdit.email || "",
                address: studentToEdit.address || "",
                pincode: studentToEdit.pincode || "",
                district: studentToEdit.district || "",
                location: studentToEdit.location || "",
                fatherName: studentToEdit.fatherName || "",
                motherName: studentToEdit.motherName || "",
                fatherContact: studentToEdit.fatherContact || "",
                motherContact: studentToEdit.motherContact || "",
                fatherJob: studentToEdit.fatherJob || "",
                income: studentToEdit.income || "",
                image: studentToEdit.image || "",
                username: studentToEdit.username || "",
                password: studentToEdit.password || "",
            });
        } else {
            // If adding new, clear all fields
            setFormData({
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                className: "",
                division: "",
                phone: "",
                email: "",
                address: "",
                pincode: "",
                district: "",
                location: "",
                fatherName: "",
                motherName: "",
                fatherContact: "",
                motherContact: "",
                fatherJob: "",
                income: "",
                image: "",
                username: "",
                password: ""
            });
            setGeneratedUsername("");
            setGeneratedPassword("");
            setUsernameError("");
        }
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName) {
            alert("Please enter student's full name");
            return false;
        }
        if (!formData.className || !formData.division) {
            alert("Please select class and division");
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

    const handleSaveStudent = () => {
        if (!validateForm()) return;

        if (studentToEdit) {
            // Update existing student
            const updatedStudent = {
                ...studentToEdit,
                firstName: formData.firstName,
                lastName: formData.lastName,
                fullName: formData.firstName + " " + formData.lastName,
                gender: formData.gender,
                dob: formData.dob,
                className: formData.className,
                division: formData.division,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                pincode: formData.pincode,
                district: formData.district,
                location: formData.location,
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                fatherContact: formData.fatherContact,
                motherContact: formData.motherContact,
                fatherJob: formData.fatherJob,
                income: formData.income,
                image: formData.image || studentToEdit.image,
                username: formData.username,
                password: formData.password,
                studentId: studentToEdit.studentId, // Keep existing student ID
            };

            dispatch(updateStudent(updatedStudent));
            alert("Student Updated Successfully!");
        } else {
            // Add new student
            const newStudent = {
                id: uuidv4(),
                fullName: formData.firstName + " " + formData.lastName,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                dob: formData.dob,
                className: formData.className,
                division: formData.division,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                pincode: formData.pincode,
                district: formData.district,
                location: formData.location,
                image: formData.image || "/default.png",
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                fatherContact: formData.fatherContact,
                motherContact: formData.motherContact,
                fatherJob: formData.fatherJob,
                income: formData.income,
                username: formData.username,
                password: formData.password,
                studentId: generateStudentId(formData.className, formData.division),
            };

            dispatch(addStudent(newStudent));
            alert("Student Added Successfully!");
        }

        setIsOpen(false);
    };

    return (
        <div className='flex flex-col items-center w-full py-3 px-5 bg-gray-100'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex flex-row items-center gap-10'>
                    <button 
                        className='bg-white text-2xl shadow-md px-2 rounded active:scale-98'
                        onClick={() => { setIsOpen(false) }}>
                        ←
                    </button>
                    <h1 className='text-[24px] font-medium'>
                        {studentToEdit ? 'Edit Student' : 'Add New Student'}
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
                        onClick={handleSaveStudent}
                        className='bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md'>
                        {studentToEdit ? 'update' : 'save'}
                    </button>
                </div>
            </div>

            <div className='flex flex-col md:grid grid-cols-2 gap-3 bg-gray-100 w-full pt-10'>
                {/* Left Column - Basic Information & Parent Details */}
                <div className='flex flex-col gap-3'>
                    {/* Basic Information */}
                    <div className='flex flex-col gap-3 bg-white rounded-2xl py-3'>
                        <div>
                            <h1 className='border-b border-gray-300 font-semibold text-[18px] px-5 py-2'>Basic information</h1>
                        </div>

                        <div className='flex flex-col md:grid grid-cols-2 px-5 py-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <h1>First Name</h1>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder='First Name'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                        required
                                    />
                                </div>
                                <div className='flex flex-col md:hidden gap-2'>
                                    <h1>Last Name</h1>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder='Last Name'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                        required
                                    />
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
                                                onChange={handleGenderChange}
                                                className='active:scale-98'
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center gap-2 px-4 py-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === "female"}
                                                onChange={handleGenderChange}
                                                className='active:scale-98'
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Date of Birth</h1>
                                    <input 
                                        type="date" 
                                        name="dob"
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
                                        {/* Class Dropdown */}
                                        <div className="flex flex-col gap-2 w-full active:scale-98">
                                            <select 
                                                name="className"
                                                value={formData.className}
                                                onChange={handleInputChange}
                                                className="w-full border border-[#D4D4D4] rounded-md text-gray-700 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                                                required
                                            >
                                                <option value="">Class</option>
                                                <option value="8">Class 8</option>
                                                <option value="9">Class 9</option>
                                                <option value="10">Class 10</option>
                                            </select>
                                        </div>

                                        {/* Division Dropdown */}
                                        <div className="flex flex-col gap-2 w-full active:scale-98">
                                            <select 
                                                name="division"
                                                value={formData.division}
                                                onChange={handleInputChange}
                                                className="w-full border border-[#D4D4D4] rounded-md text-gray-700 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                                                required
                                            >
                                                <option value="">Division</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='hidden md:flex flex-col gap-2'>
                                    <h1>Last Name</h1>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder='Last Name' 
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                        required
                                    />
                                </div>
                                <div className='flex flex-col items-center justify-center p-5 border-2 border-dashed border-gray-400 mt-4 rounded-xl gap-2'>
                                    {formData.image ? (
                                        <img src={formData.image} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                                    ) : (
                                        <button className='active:scale-95'><img src={Doc} alt="upload" /></button>
                                    )}
                                    <p>drop files to upload</p>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="studentImageUpload"
                                        accept="image/*"
                                    />
                                    <label htmlFor="studentImageUpload" className="cursor-pointer border p-1 rounded-xl">
                                        Select File
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Parent Details */}
                    <div className='flex flex-col gap-3 bg-white rounded-2xl py-3'>
                        <div>
                            <h1 className='border-b border-gray-300 font-semibold text-[18px] px-5 py-2'>Parent Details</h1>
                        </div>
                        <div className='flex flex-col md:grid grid-cols-2 px-5 py-2 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <h1>Father Name</h1>
                                    <input 
                                        type="text" 
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleInputChange}
                                        placeholder='Name'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Father Contact</h1>
                                    <input 
                                        type="text" 
                                        name="fatherContact"
                                        value={formData.fatherContact}
                                        onChange={handleInputChange}
                                        placeholder='Contact'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md appearance-none focus:outline-none active:scale-98' 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Father Occupation</h1>
                                    <input 
                                        type="text" 
                                        name="fatherJob"
                                        value={formData.fatherJob}
                                        onChange={handleInputChange}
                                        placeholder='Ex:Business'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <h1>Mother Name</h1>
                                    <input 
                                        type="text" 
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleInputChange}
                                        placeholder='Name'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md active:scale-98' 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Mother Contact</h1>
                                    <input 
                                        type="text" 
                                        name="motherContact"
                                        value={formData.motherContact}
                                        onChange={handleInputChange}
                                        placeholder='Contact'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md appearance-none focus:outline-none active:scale-98' 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>Annual Income</h1>
                                    <input 
                                        type="text" 
                                        name="income"
                                        value={formData.income}
                                        onChange={handleInputChange}
                                        placeholder='1,00,000'
                                        className='w-full border border-[#D4D4D4] rounded-md text-gray-500 px-2 py-1 shadow-md appearance-none focus:outline-none active:scale-98' 
                                    />
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
                        <div className='flex flex-col gap-4 px-2 justify-center'>
                            {/* Username Field - Disabled/Read-only */}
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm text-gray-600'>Username (Auto-generated, cannot be changed)</label>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder='Username will be auto-generated'
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 bg-gray-100 text-gray-600 cursor-not-allowed'
                                    readOnly
                                    disabled
                                />
                                {generatedUsername && !studentToEdit && (
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

                            {/* Password Field - Editable */}
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm text-gray-600'>
                                    Password 
                                    {!studentToEdit && <span className='text-xs text-gray-400 ml-1'>(Auto-generated, you can change it)</span>}
                                </label>
                                <input 
                                    type="text" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder='Password'
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                {generatedPassword && !studentToEdit && formData.password === generatedPassword && (
                                    <p className='text-xs text-green-600 mt-1'>
                                        ✓ Generated: {formData.firstName}@last4phone
                                    </p>
                                )}
                                {formData.phone && formData.phone.length >= 4 && !studentToEdit && (
                                    <p className='text-xs text-gray-400 mt-1'>
                                        Password format: FirstName@last4digits (e.g., {formData.firstName}@{formData.phone.slice(-4)})
                                    </p>
                                )}
                            </div>

                            {/* Student ID Preview (if new) */}
                            {!studentToEdit && formData.className && formData.division && (
                                <div className='bg-blue-50 p-2 rounded-lg mt-2'>
                                    <p className='text-xs text-blue-700'>
                                        Student ID will be: {generateStudentId(formData.className, formData.division)}
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
                        <div className='flex flex-col md:flex-row justify-center gap-2 px-2'>
                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='px-4 text-sm'>Phone</h1>
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder='Contact Number' 
                                    className='border border-[#D4D4D4] rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <h1 className='px-4 text-sm'>Email</h1>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder='example@gmail.com' 
                                    className='border border-[#D4D4D4] rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col px-2 gap-3'>
                            <h1 className='px-4 text-sm'>Address</h1>
                            <div className='flex'>
                                <input 
                                    type="text" 
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder='Area and Street' 
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                            </div>
                            <div className='flex gap-2 justify-center'>
                                <input 
                                    type="text" 
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder='PinCode' 
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                                <input 
                                    type="text" 
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    placeholder='District' 
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                            </div>
                            <div className='flex gap-2 justify-center'>
                                <input 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder='Location' 
                                    className='border border-[#D4D4D4] rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                                />
                            </div>
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
                    onClick={handleSaveStudent}
                    className='bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md'>
                    {studentToEdit ? 'update' : 'save'}
                </button>
            </div>
        </div>
    )
}

export default StudentForm;