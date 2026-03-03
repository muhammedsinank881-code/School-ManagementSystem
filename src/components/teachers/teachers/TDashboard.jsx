import React from "react";
import { useSelector } from "react-redux";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const TDashboard = () => {
  const teacher = useSelector((state) => state.user.user);
  const events = useSelector((state) => state.events.list);

  // Today label
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Filter upcoming events (future dates only)
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate >= today;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-4 px-6 py-6 border-b">
          <img
            src={teacher?.profileImage || "/images/default.png"}
            alt={teacher?.name}
            className="w-14 h-14 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-lg font-semibold">
              Hello, {teacher?.name} 👋
            </h1>
            <p className="text-sm text-gray-500">{todayLabel}</p>
            <p className="text-xs text-gray-400">
              Subject: {teacher?.subject}
            </p>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-6">
          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-xs text-gray-400">PHONE</p>
            <h3 className="text-lg font-semibold mt-2">
              {teacher?.phone || "—"}
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-xs text-gray-400">STATUS</p>
            <h3 className="text-lg font-semibold mt-2 text-green-600">
              Active
            </h3>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-xs text-gray-400">UPCOMING EVENTS</p>
            <h3 className="text-lg font-semibold mt-2">
              {upcomingEvents.length}
            </h3>
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="px-6 pb-10">
          <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>

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
    </div>
  );
};

export default TDashboard;