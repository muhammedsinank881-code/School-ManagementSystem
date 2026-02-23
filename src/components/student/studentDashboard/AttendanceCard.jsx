import React from "react";

const AttendanceCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Attendance</h2>
        <span className="text-gray-500 text-xl">⋯</span>
      </div>

      {/* Chart Circle */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#60a5fa"
              strokeWidth="10"
              strokeDasharray="280"
              strokeDashoffset="56"
              fill="transparent"
              strokeLinecap="round"
              transform="rotate(-90 64 64)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold">80%</span>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex gap-6 mt-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-400 rounded-full" />
            <p className="text-gray-600 text-sm">Present</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <p className="text-gray-600 text-sm">Absent</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="bg-gray-100 px-3 py-1 rounded-md">📅 April 2023</div>
        <div className="bg-gray-100 px-3 py-1 rounded-md">🏫 Class 10th</div>
      </div>
    </div>
  );
};

export default AttendanceCard;