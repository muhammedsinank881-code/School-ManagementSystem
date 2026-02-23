import { useNavigate } from "react-router-dom";

const StatsCards = () => {
  const navigate = useNavigate()
  return (
    <div className="w-fit md:w-full md:space-y-4 gap-4">

      {/* Students */}
      <div className="bg-yellow-200 p-6 rounded-xl"
      onClick={() => navigate("/admin-dashboard/students")}>
        <p className="text-gray-700">Students</p>
        <h1 className="text-3xl font-bold">5,909</h1>
      </div>

      {/* Teachers */}
      <div className="bg-purple-200 p-6 rounded-xl"
      onClick={() => navigate("/admin-dashboard/teachers")}>
        <p className="text-gray-700">Teachers</p>
        <h1 className="text-3xl font-bold">60</h1>
      </div>

      {/* Employees */}
      <div className="bg-yellow-200 p-6 rounded-xl">
        <p className="text-gray-700">Employee</p>
        <h1 className="text-3xl font-bold">100</h1>
      </div>

    </div>
  );
};
export default StatsCards;