import { useState } from "react";
import AddEventModal from "./AddEventModal";

const Events = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
  title: "",
  date: "",
  time: "",
  location: "",
  type: "Academic",
});

  // ---------------- DATA ----------------
  const events = [
    {
      id: 1,
      title: "Science Fair Setup",
      date: "2026-02-19",
      time: "09:00 AM",
      type: "Academic",
      location: "Main Hall – 2nd Floor",
    },
    {
      id: 2,
      title: "Staff Meeting",
      date: "2026-02-19",
      time: "02:30 PM",
      type: "Meeting",
      location: "Conference Room A",
    },
  ];

  // ---------------- STATE ----------------
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
  const [selectedDay, setSelectedDay] = useState(19);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // ---------------- CALENDAR LOGIC ----------------
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // ---------------- EVENT FILTER ----------------
  const selectedDateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

  const filteredEvents = events.filter(
    (event) => event.date === selectedDateString
  );

  // ---------------- MONTH NAVIGATION ----------------
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  // ---------------- UI ----------------
  return (
    <div className="h-screen bg-gray-100 p-6">

            <>  
             {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Events</h1>
        <button onClick={()=>setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95">
          + Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* CALENDAR (FIXED SIZE) */}
<div className="bg-white rounded-xl shadow p-4 h-90 w-full flex flex-col">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="px-2 py-1 hover:bg-gray-100 rounded">
              ←
            </button>
            <h2 className="text-base font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={nextMonth} className="px-2 py-1 hover:bg-gray-100 rounded">
              →
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
            <div>Sun</div><div>Mon</div><div>Tue</div>
            <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm flex-1">
            {calendarCells.map((day, index) => (
              <div
                key={index}
                onClick={() => day && setSelectedDay(day)}
                className={`rounded-lg cursor-pointer flex items-center justify-center
                  ${
                    day === selectedDay
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-gray-100"
                  }`}
              >
                {day ?? ""}
              </div>
            ))}
          </div>
        </div>

        {/* EVENTS LIST (SCROLLABLE) */}
        <div className=" bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">
            Scheduled for {currentDate.toLocaleString("default", { month: "short" })} {selectedDay}
          </h2>

          <div className="space-y-4 overflow-y-auto max-h-75 pr-2">
            {filteredEvents.length === 0 && (
              <p className="text-sm text-gray-500">No events for this day</p>
            )}

            {filteredEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{event.time}</p>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">📍 {event.location}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full
                    ${
                      event.type === "Academic"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      </>
<AddEventModal
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  onClose={() => setIsOpen(false)}
  formData={formData}
  setFormData={setFormData}
/>

    </div>
  );
};

export default Events;