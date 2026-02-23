import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const TimetableCard = () => {
  // Days except weekend
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Timetable data (5 periods)
  const timetable = {
    Monday: ["Tamil", "English", "Math", "Science", "CS"],
    Tuesday: ["English", "Tamil", "Science", "Math", "Social"],
    Wednesday: ["Math", "Social", "English", "Tamil", "Science"],
    Thursday: ["Science", "Math", "CS", "English", "Tamil"],
    Friday: ["Social", "CS", "Math", "English", "Science"],
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDay = () => {
    setCurrentIndex((prev) => (prev + 1) % days.length);
  };

  const prevDay = () => {
    setCurrentIndex((prev) => (prev - 1 + days.length) % days.length);
  };

  const currentDay = days[currentIndex];
  const isHoliday = currentDay === "Saturday" || currentDay === "Sunday";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevDay}>
          <IoChevronBack className="text-xl text-gray-600" />
        </button>

        <h2 className="text-lg font-semibold">{currentDay}</h2>

        <button onClick={nextDay}>
          <IoChevronForward className="text-xl text-gray-600" />
        </button>
      </div>

      {/* Divider line */}
      <div className="w-10 h-1 bg-pink-400 rounded-full mx-auto mb-4"></div>

      {/* Holiday Message */}
      {isHoliday ? (
        <div className="flex flex-col items-center justify-center h-56 text-gray-500">
          <p className="text-md font-medium bg-gray-100 px-4 py-2 rounded-xl">
            This day is off 🎉
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-center">
          {timetable[currentDay].map((sub, index) => (
            <p key={index} className="text-gray-700 text-md font-medium">
              {sub}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimetableCard;