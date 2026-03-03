import React from "react";

const HeaderActions = ({ setIsOpen, teacherToEdit, handleReset, handleSaveTeacher }) => {
    return (
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
            <div className="flex flex-row items-center justify-between gap-5 md:gap-10">
                <button
                    className="bg-white text-2xl shadow-md px-2 rounded active:scale-98"
                    onClick={() => setIsOpen(false)}
                >
                    ←
                </button>
                <h1 className="text-[24px] font-medium">
                    {teacherToEdit ? "Edit Teacher" : "Add New Teacher"}
                </h1>
            </div>

            <div className="hidden md:flex gap-3">
                <button
                    className="bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md"
                    onClick={() => setIsOpen(false)}
                >
                    cancel
                </button>

                <button
                    className="bg-white rounded-2xl hover:bg-blue-600 hover:text-white w-20 h-7 active:scale-95 shadow-md"
                    onClick={handleReset}
                >
                    reset
                </button>

                <button
                    onClick={handleSaveTeacher}
                    className="bg-blue-600 rounded-2xl text-white w-20 h-7 hover:bg-blue-400 active:scale-95 shadow-md"
                >
                    {teacherToEdit ? "update" : "save"}
                </button>
            </div>
        </div>
    );
};

export default HeaderActions;