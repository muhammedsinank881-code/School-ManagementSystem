import React, { useState } from "react";
import { MapPin, Clock } from "lucide-react";

const Timetable = () => {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const timetableData = {
    MON: [
      { time: "08:00 AM", subject: "Morning Assembly", duration: "30 mins" },
      { time: "08:30 AM", subject: "Advanced Mathematics", room: "Room 204", duration: "45 mins" },
      { time: "09:30 AM", subject: "Physics", room: "Room 205", duration: "45 mins" },
      { time: "10:30 AM", subject: "Chemistry", room: "Room 201", duration: "45 mins" },
      { time: "11:30 AM", subject: "English", room: "Room 102", duration: "45 mins" },
      { time: "12:30 PM", subject: "Lunch Break", break: true },
      { time: "01:30 PM", subject: "World History", room: "Room 104", duration: "45 mins" },
      { time: "02:30 PM", subject: "Computer Science", room: "Lab B", duration: "60 mins" },
    ],

    TUE: [
      { time: "08:00 AM", subject: "Assembly", duration: "30 mins" },
      { time: "08:30 AM", subject: "Mathematics", room: "Room 204", duration: "45 mins" },
      { time: "09:30 AM", subject: "Biology", room: "Lab C", duration: "60 mins" },
      { time: "10:30 AM", subject: "Tamil", room: "Room 101", duration: "45 mins" },
      { time: "11:30 AM", subject: "Physics Lab", room: "Lab A", duration: "60 mins" },
      { time: "12:30 PM", subject: "Lunch Break", break: true },
      { time: "01:30 PM", subject: "Geography", room: "Room 110", duration: "45 mins" },
      { time: "02:30 PM", subject: "Sports", room: "Ground", duration: "60 mins" },
    ],

    WED: [
      { time: "08:00 AM", subject: "Assembly", duration: "30 mins" },
      { time: "08:30 AM", subject: "Chemistry", room: "Room 201", duration: "45 mins" },
      { time: "09:30 AM", subject: "Mathematics", room: "Room 204", duration: "45 mins" },
      { time: "10:30 AM", subject: "English Literature", room: "Room 102", duration: "45 mins" },
      { time: "11:30 AM", subject: "Computer Science", room: "Lab B", duration: "60 mins" },
      { time: "12:30 PM", subject: "Lunch Break", break: true },
      { time: "01:30 PM", subject: "Social Science", room: "Room 110", duration: "45 mins" },
    ],

    THU: [
      { time: "08:00 AM", subject: "Assembly", duration: "30 mins" },
      { time: "08:30 AM", subject: "Physics", room: "Room 205", duration: "45 mins" },
      { time: "09:30 AM", subject: "Mathematics", room: "Room 204", duration: "45 mins" },
      { time: "10:30 AM", subject: "Biology", room: "Lab C", duration: "60 mins" },
      { time: "11:30 AM", subject: "English", room: "Room 102", duration: "45 mins" },
      { time: "12:30 PM", subject: "Lunch Break", break: true },
      { time: "01:30 PM", subject: "Art", room: "Art Room", duration: "45 mins" },
    ],

    FRI: [
      { time: "08:00 AM", subject: "Assembly", duration: "30 mins" },
      { time: "08:30 AM", subject: "Chemistry Lab", room: "Lab A", duration: "60 mins" },
      { time: "09:30 AM", subject: "Mathematics", room: "Room 204", duration: "45 mins" },
      { time: "10:30 AM", subject: "English", room: "Room 102", duration: "45 mins" },
      { time: "11:30 AM", subject: "Computer Science", room: "Lab B", duration: "60 mins" },
      { time: "12:30 PM", subject: "Lunch Break", break: true },
      { time: "01:30 PM", subject: "Moral Science", room: "Room 103", duration: "45 mins" },
    ],

    SAT: [
      { time: "09:00 AM", subject: "Special Coaching", room: "Room 204", duration: "60 mins" },
      { time: "10:00 AM", subject: "Sports Practice", room: "Ground", duration: "60 mins" },
    ],

    SUN: [] // Holiday
  };

  const [selectedDay, setSelectedDay] = useState("MON");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start md:items-center p-4">
      <div className="relative w-full max-w-md md:max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-b-3xl">
          <h2 className="text-xl font-semibold">My Timetable</h2>

          <div className="flex justify-between mt-6 text-center">
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDay(day)}
                className="flex flex-col items-center flex-1 cursor-pointer"
              >
                <span className="text-xs opacity-80">{day}</span>
                <span
                  className={`mt-2 text-sm font-semibold ${
                    selectedDay === day
                      ? "bg-white text-blue-600 w-9 h-9 flex items-center justify-center rounded-full shadow"
                      : ""
                  }`}
                >
                  {23 + index}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-lg">Schedule</h3>
            <span className="text-sm text-gray-500">{selectedDay}</span>
          </div>

          {selectedDay === "SUN" ? (
            <div className="text-center py-16">
              <h4 className="text-2xl font-semibold text-red-500">Holiday 🎉</h4>
              <p className="text-gray-500 mt-2">Enjoy your Sunday!</p>
            </div>
          ) : (
            timetableData[selectedDay].map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl mb-4 ${
                  item.break
                    ? "bg-yellow-100"
                    : "bg-gray-100 hover:bg-gray-200 transition"
                }`}
              >
                <p className="text-xs text-gray-400">{item.time}</p>
                <h4 className={`font-medium ${item.break ? "text-yellow-700" : ""}`}>
                  {item.subject}
                </h4>

                {!item.break && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {item.room && (
                      <>
                        <MapPin size={14} className="mr-1" />
                        {item.room}
                      </>
                    )}
                    {item.duration && (
                      <span className="ml-auto flex items-center">
                        <Clock size={14} className="mr-1" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;