import React from "react";

const MobileButtons = ({ setIsOpen, handleReset, handleSaveTeacher, teacherToEdit }) => {
    return (
        <div className="flex md:hidden py-10 gap-3">
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
    );
};

export default MobileButtons;