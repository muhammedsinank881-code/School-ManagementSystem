import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const StudentCharts = () => {
  // Get real student data from Redux
  const students = useSelector((state) => state.students.list || []);
  
  // Calculate gender statistics
  const [genderStats, setGenderStats] = useState({
    boys: 0,
    girls: 0,
    other: 0,
    boysPercentage: 0,
    girlsPercentage: 0,
    otherPercentage: 0
  });

  useEffect(() => {
    // Count students by gender
    const boys = students.filter(s => s.gender?.toLowerCase() === "male").length;
    const girls = students.filter(s => s.gender?.toLowerCase() === "female").length;
    const other = students.filter(s => s.gender && !["male", "female"].includes(s.gender?.toLowerCase())).length;
    
    const total = students.length || 1; // Prevent division by zero
    
    setGenderStats({
      boys,
      girls,
      other,
      boysPercentage: Math.round((boys / total) * 100),
      girlsPercentage: Math.round((girls / total) * 100),
      otherPercentage: Math.round((other / total) * 100)
    });
  }, [students]);

  // If no students, show empty state
  if (students.length === 0) {
    return (
      <div className="bg-white p-7 rounded-xl shadow-sm w-full flex flex-col items-center justify-center min-h-[250px]">
        <p className="text-gray-500 text-center">No student data available</p>
        <p className="text-xs text-gray-400 mt-2">Add students to see gender ratio</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-7 rounded-xl shadow-sm w-full flex flex-col justify-center gap-10">
      {/* Boys Stats */}
      <div className="text-center">
        <div className="relative w-28 h-28 mx-auto">
          {/* Circular Progress for Boys */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - genderStats.boysPercentage / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{genderStats.boysPercentage}%</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-sm">
          {genderStats.boys.toLocaleString()} Boy{genderStats.boys !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Girls Stats */}
      <div className="text-center">
        <div className="relative w-28 h-28 mx-auto">
          {/* Circular Progress for Girls */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - genderStats.girlsPercentage / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{genderStats.girlsPercentage}%</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-sm">
          {genderStats.girls.toLocaleString()} Girl{genderStats.girls !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Other Stats (if any) */}
      {genderStats.other > 0 && (
        <div className="text-center text-xs text-gray-500">
          <span>{genderStats.other} other ({genderStats.otherPercentage}%)</span>
        </div>
      )}
    </div>
  );
};

export default StudentCharts;