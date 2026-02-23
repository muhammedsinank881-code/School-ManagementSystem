import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CalendarCard = () => {
  const navigate = useNavigate()
  const today = new Date();

  // State for current visible month/year
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  // First day of this month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Number of days in this month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = [];

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // Days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // PREV MONTH
  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // NEXT MONTH
  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={handlePrev}
        >
          ◀
        </button>

        <h2 className="font-semibold text-lg">
          {monthName} {currentYear}
        </h2>

        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={handleNext}
        >
          ▶
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-600 text-sm">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <p key={d}>{d}</p>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-3 text-center">
        {daysArray.map((day, index) =>
          day === null ? (
            <div key={index}></div>
          ) : (
            <div
              key={index}
              className={`p-2 rounded-full ${
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
                  ? "bg-red-500 text-white font-bold"
                  : "text-gray-700"
              }`}
            >
              {day}
            </div>
          )
        )}
      </div>

      <button className="mt-4 bg-gray-200 px-4 py-2 rounded-lg text-sm w-full active:scale-95 
      shadow-md transition-all duration-200"
      onClick={() => navigate("/admin-dashboard/events") }>
        Manage Calendar
      </button>
    </div>
  );
};

export default CalendarCard;