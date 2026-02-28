import React from "react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { MdPercent } from "react-icons/md";

const SAttendance = () => {
  const attendanceData = [
    { date: "2026-02-01", status: "Present" },
    { date: "2026-02-02", status: "Present" },
    { date: "2026-02-03", status: "Absent" },
    { date: "2026-02-04", status: "Present" },
    { date: "2026-02-05", status: "Late" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-full space-y-6">

      {/* 🔵 Header */}
      <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Attendance Overview
        </h1>
        <p className="opacity-90 mt-2 text-sm">
          Track your attendance performance and records.
        </p>
      </div>

      {/* 🟢 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <SummaryCard
          icon={<FaUserCheck />}
          title="Present Days"
          value="42"
          color="green"
        />

        <SummaryCard
          icon={<FaUserTimes />}
          title="Absent Days"
          value="3"
          color="red"
        />

        <SummaryCard
          icon={<MdPercent />}
          title="Attendance %"
          value="92%"
          color="blue"
        />

      </div>

      {/* 📊 Monthly Progress */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          February Attendance Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-5">
          <div className="bg-green-500 h-5 rounded-full w-[92%]"></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          You have maintained 92% attendance this month.
        </p>
      </div>

      {/* 📘 Subject-wise Attendance */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Subject-wise Attendance
        </h2>

        <div className="space-y-4">

          <SubjectAttendance subject="Mathematics" percent="95%" />
          <SubjectAttendance subject="Physics" percent="90%" />
          <SubjectAttendance subject="Chemistry" percent="88%" />
          <SubjectAttendance subject="English" percent="93%" />

        </div>
      </div>

      {/* 📅 Attendance History Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Recent Attendance History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

/* ---------- Reusable Components ---------- */

const SummaryCard = ({ icon, title, value, color }) => {
  const colors = {
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
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

const SubjectAttendance = ({ subject, percent }) => {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{subject}</span>
        <span className="font-medium">{percent}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: percent }}
        ></div>
      </div>
    </div>
  );
};

export default SAttendance;