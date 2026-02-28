import React, { useState } from "react";
import { MapPin, Users, ClipboardCheck, X, Plus, Pencil } from "lucide-react";

const TAttendance = () => {
  const [showAttendance, setShowAttendance] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);
  const [editingClassId, setEditingClassId] = useState(null);

  const [attendance, setAttendance] = useState([]);

  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Grade 10A - Mathematics",
      room: "Room 204",
      time: "08:30 AM",
      students: [
        { id: 1, name: "John Carter" },
        { id: 2, name: "Emily Watson" },
        { id: 3, name: "Michael Brown" },
      ],
    },
  ]);

  // Form states
  const [newClassName, setNewClassName] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newStudents, setNewStudents] = useState("");

  // =============================
  // OPEN ATTENDANCE
  // =============================
  const openAttendance = (classItem) => {
    setSelectedClass(classItem);
    setAttendance(
      classItem.students.map((student) => ({
        ...student,
        status: "Present",
      }))
    );
    setShowAttendance(true);
  };

  // =============================
  // ADD CLASS
  // =============================
  const handleAddClass = () => {
    if (!newClassName || !newRoom || !newTime || !newStudents) {
      alert("Please fill all fields");
      return;
    }

    const studentsArray = newStudents.split(",").map((name, index) => ({
      id: Date.now() + index,
      name: name.trim(),
    }));

    const newClass = {
      id: Date.now(),
      name: newClassName,
      room: newRoom,
      time: newTime,
      students: studentsArray,
    };

    setClasses([...classes, newClass]);
    resetForm();
    setShowAddClass(false);
  };

  // =============================
  // EDIT CLASS
  // =============================
  const openEditModal = (classItem) => {
    setEditingClassId(classItem.id);
    setNewClassName(classItem.name);
    setNewRoom(classItem.room);
    setNewTime(classItem.time);
    setNewStudents(classItem.students.map((s) => s.name).join(", "));
    setShowEditClass(true);
  };

  const handleUpdateClass = () => {
    const updatedStudents = newStudents.split(",").map((name, index) => ({
      id: Date.now() + index,
      name: name.trim(),
    }));

    const updatedClasses = classes.map((cls) =>
      cls.id === editingClassId
        ? {
            ...cls,
            name: newClassName,
            room: newRoom,
            time: newTime,
            students: updatedStudents,
          }
        : cls
    );

    setClasses(updatedClasses);
    resetForm();
    setShowEditClass(false);
  };

  const resetForm = () => {
    setNewClassName("");
    setNewRoom("");
    setNewTime("");
    setNewStudents("");
    setEditingClassId(null);
  };

  // =============================
  // ATTENDANCE FUNCTIONS
  // =============================
  const toggleStatus = (id) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Present" ? "Absent" : "Present",
            }
          : student
      )
    );
  };

  const markAllPresent = () => {
    setAttendance((prev) =>
      prev.map((student) => ({ ...student, status: "Present" }))
    );
  };

  const saveAttendance = () => {
    alert("Attendance saved!");
    setShowAttendance(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center relative">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 relative">

        <h2 className="text-2xl font-semibold mb-8">
          Students Attendance
        </h2>

        {/* Class Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-primary text-white p-6 rounded-2xl shadow-md"
            >
              <p className="text-xs opacity-80">{classItem.time}</p>

              <h4 className="font-semibold text-lg mt-1">
                {classItem.name}
              </h4>

              <div className="flex items-center text-xs mt-2 opacity-90">
                <MapPin size={14} className="mr-1" />
                {classItem.room}

                <span className="ml-auto flex items-center">
                  <Users size={14} className="mr-1" />
                  {classItem.students.length} Students
                </span>
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => openAttendance(classItem)}
                  className="bg-white text-primary px-4 py-2 rounded-lg text-sm flex-1"
                >
                  <ClipboardCheck size={16} className="inline mr-1" />
                  Mark
                </button>

                <button
                  onClick={() => openEditModal(classItem)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm"
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowAddClass(true)}
          className="absolute bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={22} />
        </button>
      </div>

      {/* Add/Edit Modal */}
      {(showAddClass || showEditClass) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={() => {
                setShowAddClass(false);
                setShowEditClass(false);
                resetForm();
              }}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {showEditClass ? "Edit Class" : "Add New Class"}
            </h3>

            <input
              type="text"
              placeholder="Class Name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Room"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Student names (comma separated)"
              value={newStudents}
              onChange={(e) => setNewStudents(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={showEditClass ? handleUpdateClass : handleAddClass}
              className="bg-primary text-white px-6 py-2 rounded-lg w-full"
            >
              {showEditClass ? "Update Class" : "Add Class"}
            </button>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendance && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowAttendance(false)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Mark Attendance - {selectedClass.name}
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {attendance.map((student) => (
                <div
                  key={student.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <span>{student.name}</span>

                  <button
                    onClick={() => toggleStatus(student.id)}
                    className={`px-4 py-1 rounded-full text-sm ${
                      student.status === "Present"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {student.status}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={markAllPresent}
                className="text-primary font-medium"
              >
                Mark All Present
              </button>

              <button
                onClick={saveAttendance}
                className="bg-primary text-white px-6 py-2 rounded-lg"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default  TAttendance;


// import { MapPin, Users, ClipboardCheck, X, Plus, Pencil } from "lucide-react";

// const TAttendance = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center relative">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 relative">

//         <h2 className="text-2xl font-semibold mb-8">
//           Students Attendance
//         </h2>

//         {/* Class Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
//           {/* Static Card */}
//           <div className="bg-primary text-white p-6 rounded-2xl shadow-md">
//             <p className="text-xs opacity-80">08:30 AM</p>

//             <h4 className="font-semibold text-lg mt-1">
//               Grade 10A - Mathematics
//             </h4>

//             <div className="flex items-center text-xs mt-2 opacity-90">
//               <MapPin size={14} className="mr-1" />
//               Room 204

//               <span className="ml-auto flex items-center">
//                 <Users size={14} className="mr-1" />
//                 3 Students
//               </span>
//             </div>

//             <div className="flex gap-2 mt-5">
//               <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm flex-1">
//                 <ClipboardCheck size={16} className="inline mr-1" />
//                 Mark
//               </button>

//               <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm">
//                 <Pencil size={16} />
//               </button>
//             </div>
//           </div>

//         </div>

//         {/* Floating Add Button */}
//         <button className="absolute bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center">
//           <Plus size={22} />
//         </button>

//       </div>

//       {/* Static Attendance Modal */}
//       <div className="hidden fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
//         <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">

//           <button className="absolute top-4 right-4">
//             <X size={20} />
//           </button>

//           <h3 className="text-xl font-semibold mb-4">
//             Mark Attendance - Grade 10A
//           </h3>

//           <div className="space-y-3 max-h-80 overflow-y-auto">
//             <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
//               <span>John Carter</span>
//               <button className="px-4 py-1 rounded-full text-sm bg-green-500 text-white">
//                 Present
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-between mt-6">
//             <button className="text-primary font-medium">
//               Mark All Present
//             </button>

//             <button className="bg-primary text-white px-6 py-2 rounded-lg">
//               Save Attendance
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default TAttendance;