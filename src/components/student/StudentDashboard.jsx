import React from "react";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBook,
  FaUserGraduate,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";

const StudentDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-full space-y-6">

      {/* 🔵 Gradient Welcome Card */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome Back, Ayaan 👋
          </h1>
          <p className="opacity-90 mt-2 text-sm md:text-base">
            Stay updated with your academic progress and activities.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-sm opacity-90">
          Monday, February 19, 2026
        </div>
      </div>

      {/* 🟢 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          icon={<FaChalkboardTeacher />}
          title="Total Teachers"
          value="12"
          color="blue"
        />

        <Card
          icon={<FaBook />}
          title="Today’s Classes"
          value="6"
          color="green"
        />

        <Card
          icon={<FaCalendarAlt />}
          title="Upcoming Events"
          value="3"
          color="yellow"
        />

        <Card
          icon={<FaUserGraduate />}
          title="Attendance"
          value="92%"
          color="purple"
        />

      </div>

      {/* 🟣 Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 📅 Today Schedule */}
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Today’s Schedule
          </h2>

          <div className="space-y-4">

            <ScheduleItem
              time="09:00 AM"
              subject="Advanced Mathematics"
              room="Room 204"
              active
            />

            <ScheduleItem
              time="10:00 AM"
              subject="Physics Lab"
              room="Lab A"
            />

            <ScheduleItem
              time="01:30 PM"
              subject="World History"
              room="Room 104"
            />

          </div>
        </div>

        {/* 📢 Announcements */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <IoNotifications className="text-blue-600" />
            <h2 className="text-lg font-semibold">Announcements</h2>
          </div>

          <div className="space-y-4 text-sm">

            <div className="border-l-4 border-blue-500 pl-3">
              Mid-term exams start from March 5.
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              Science Fair participants meeting tomorrow.
            </div>

            <div className="border-l-4 border-yellow-500 pl-3">
              Submit assignment before Friday.
            </div>

          </div>
        </div>
      </div>

      {/* 📊 Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Attendance Progress */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Attendance Overview
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full w-[92%]"></div>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            92% attendance this semester
          </p>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Performance Overview
          </h2>

          <div className="space-y-3 text-sm">

            <Performance subject="Mathematics" score="88%" />
            <Performance subject="Physics" score="91%" />
            <Performance subject="Chemistry" score="84%" />
            <Performance subject="English" score="90%" />

          </div>
        </div>
      </div>

    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Card = ({ icon, title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg text-xl ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{value}</h2>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

const ScheduleItem = ({ time, subject, room, active }) => {
  return (
    <div
      className={`p-4 rounded-xl flex justify-between items-center ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100"
      }`}
    >
      <div>
        <p className={`text-xs ${active ? "opacity-80" : "text-gray-400"}`}>
          {time}
        </p>
        <h4 className="font-medium">{subject}</h4>
        <p className="text-xs">{room}</p>
      </div>

      <MdAccessTime className={`${active ? "" : "text-gray-400"}`} />
    </div>
  );
};

const Performance = ({ subject, score }) => {
  return (
    <div className="flex justify-between">
      <span>{subject}</span>
      <span className="font-medium">{score}</span>
    </div>
  );
};

export default StudentDashboard;