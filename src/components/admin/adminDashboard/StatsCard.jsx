import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StatsCards = () => {
  const navigate = useNavigate();
  
  // Get real data from Redux stores
  const students = useSelector((state) => state.students.list || []);
  const teachers = useSelector((state) => state.teachers.list || []);
  
  // For employees - you might have an employees slice, using mock data for now
  const employees = 30; // This could come from an employees slice if you have one

  return (
    <div className="w-fit md:w-full space-y-4 gap-4">
      {/* Students Card */}
      <div 
        className="bg-yellow-200 p-6 rounded-xl cursor-pointer hover:bg-yellow-300 transition-colors"
        onClick={() => navigate("/admin-dashboard/students")}
      >
        <p className="text-gray-700">Students</p>
        <h1 className="text-3xl font-bold">{students.length.toLocaleString()}</h1>
        <p className="text-xs text-gray-600 mt-1">
          {students.length} enrolled students
        </p>
      </div>

      {/* Teachers Card */}
      <div 
        className="bg-purple-200 p-6 rounded-xl cursor-pointer hover:bg-purple-300 transition-colors"
        onClick={() => navigate("/admin-dashboard/teachers")}
      >
        <p className="text-gray-700">Teachers</p>
        <h1 className="text-3xl font-bold">{teachers.length}</h1>
        <p className="text-xs text-gray-600 mt-1">
          {teachers.length} active teachers
        </p>
      </div>

      {/* Employees Card */}
      <div className="bg-yellow-200 p-6 rounded-xl">
        <p className="text-gray-700">Employees</p>
        <h1 className="text-3xl font-bold">{employees}</h1>
        <p className="text-xs text-gray-600 mt-1">
          Staff & administration
        </p>
      </div>
    </div>
  );
};

export default StatsCards;