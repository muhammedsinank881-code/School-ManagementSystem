import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaCalendarAlt, FaBook } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { useSelector } from "react-redux";
import { CalendarDays, Clock, MapPin } from "lucide-react";


const StudentDashboard = () => {

  const user = useSelector(state => state.user.user);
  const teachers = useSelector(state => state.teachers.list);
  const events = useSelector(state => state.events.list);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Formatted date & time
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const greeting = (() => {
    const hour = currentDateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  // Upcoming events (future only)
  const upcomingEvents = events.filter(event => {
    return new Date(event.date) >= new Date();
  });

  // Check if a class is active
  const isClassActive = (classTime) => {
    const now = new Date();
    let [time, period] = classTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const classStart = hour * 60 + minute;
    const classEnd = classStart + 60;
    const current = now.getHours() * 60 + now.getMinutes();

    return current >= classStart && current <= classEnd;
  };

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-full flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-full space-y-6">

      {/* 🔵 Welcome Card */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{greeting}, {user.name?.split(" ")[0]} 👋</h1>
          <p className="opacity-90 mt-2 text-sm md:text-base">Stay updated with your academic activities.</p>
        </div>

        <div className="mt-4 md:mt-0 text-right opacity-90 text-sm">
          <div>{formattedDate}</div>
          <div className="text-xs mt-1">{formattedTime}</div>
        </div>
      </div>

      {/* 🟢 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card icon={<FaChalkboardTeacher />} title="Total Teachers" value={teachers.length} color="blue" />
        <Card icon={<FaBook />} title="Today's Classes" value={6} color="green" />
        <Card icon={<FaCalendarAlt />} title="Upcoming Events" value={upcomingEvents.length} color="yellow" />
      </div>

      {/* 🟣 Today's Schedule */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        
        {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-400">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <h4 className="font-medium">{event.title}</h4>

                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      <span>{event.date}</span>
                    </div>

                    {event.time && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>

                  {event.location && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

/* ------------------------------------ */
/* ❤️ Reusable Components               */
/* ------------------------------------ */

const Card = ({ icon, title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg text-xl ${colors[color]}`}>{icon}</div>

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
      className={`p-4 rounded-xl flex justify-between items-center transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-md scale-[1.02]"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <div>
        <p className={`text-xs ${active ? "opacity-80" : "text-gray-400"}`}>{time}</p>
        <h4 className="font-medium">{subject}</h4>
        <p className="text-xs">{room}</p>
      </div>

      <MdAccessTime className={`${active ? "text-white" : "text-gray-400"}`} />
    </div>
  );
};

export default StudentDashboard;