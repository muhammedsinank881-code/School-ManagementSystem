import React, { useState, useEffect } from 'react'
import Doc from '../../../assets/document.svg'
import { useDispatch, useSelector } from "react-redux";
import { addTeacher, updateTeacher } from "../../../store/teachersSlice";
import { v4 as uuidv4 } from "uuid";

import HeaderActions from "./HeaderActions";
import BasicInfo from "./BasicInfo";
import ImageUpload from "./ImageUpload";
import LoginDetails from "./LoginDetails";
import ContactInfo from "./ContactInfo";
import MobileButtons from "./MobileButtons";

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
         <div className="flex flex-col items-center w-full py-3 px-5 bg-gray-100">

        {/* HEADER */}
        <HeaderActions
            setIsOpen={setIsOpen}
            teacherToEdit={teacherToEdit}
            handleReset={handleReset}
            handleSaveTeacher={handleSaveTeacher}
        />

        {/* BODY */}
        <div className="flex flex-col md:grid grid-cols-2 gap-3 bg-gray-100 w-full pt-10">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6 bg-white rounded-2xl py-3">

                    {/* Basic Fields */}
                    <BasicInfo
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />

                    {/* Image Upload */}
                    <ImageUpload
                        formData={formData}
                        handleImageChange={handleImageChange}
                        Doc={Doc}
                    />
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="bg-gray-100 flex flex-col gap-3">

                {/* Login */}
                <LoginDetails
                    formData={formData}
                    teacherToEdit={teacherToEdit}
                    generatedUsername={generatedUsername}
                    usernameError={usernameError}
                    generatedPassword={generatedPassword}
                    handleInputChange={handleInputChange}
                    generateTeacherId={generateTeacherId}
                />

                {/* Contact */}
                <ContactInfo
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            </div>
        </div>

        {/* MOBILE BUTTONS */}
        <MobileButtons
            setIsOpen={setIsOpen}
            handleReset={handleReset}
            handleSaveTeacher={handleSaveTeacher}
            teacherToEdit={teacherToEdit}
        />

    </div>
    )
}

export default TeacherForm;