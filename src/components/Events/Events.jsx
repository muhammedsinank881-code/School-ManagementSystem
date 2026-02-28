// Events.jsx (for teachers/staff - adds pending events)
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPendingEvent } from "../../store/eventsSlice";
import { v4 as uuidv4 } from "uuid";
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

    // Get approved events from Redux store
    const events = useSelector((state) => state.events.list);
    const dispatch = useDispatch();

    // ---------------- STATE ----------------
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set selected day to today when component mounts
    useEffect(() => {
        setSelectedDay(today.getDate());
    }, []);

    // ---------------- CALENDAR LOGIC ----------------
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarCells = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarCells.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarCells.push(day);
    }

    // ---------------- CHECK IF DAY HAS EVENTS ----------------
    const hasEventOnDay = (day) => {
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return events.some(event => event.date === dateString);
    };

    // ---------------- CHECK IF DAY IS TODAY ----------------
    const isToday = (day) => {
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    // ---------------- EVENT FILTER ----------------
    const selectedDateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

    const filteredEvents = events.filter(
        (event) => event.date === selectedDateString
    );

    // ---------------- MONTH NAVIGATION ----------------
    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // ---------------- EVENT HANDLERS ----------------
    const handleAddEvent = () => {
        if (!formData.title || !formData.date || !formData.time) {
            alert("Please fill in all required fields");
            return;
        }

        const newEvent = {
            id: uuidv4(),
            ...formData,
            submittedBy: "Teacher", // You can get this from auth context
            submittedAt: new Date().toISOString(),
            status: "pending"
        };

        // Add to pending events (needs admin approval)
        dispatch(addPendingEvent(newEvent));
        
        // Reset form and close modal
        setFormData({
            title: "",
            date: "",
            time: "",
            location: "",
            type: "Academic",
        });
        setIsOpen(false);
        
        alert("Event submitted for approval! Admin will review it shortly.");
    };

    // ---------------- UI ----------------
    return (
        <div className="h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Events</h1>
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95 hover:bg-blue-700"
                >
                    + Add Event
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* CALENDAR */}
                <div className="bg-white rounded-xl shadow p-4 h-90 w-full flex flex-col">
                    {/* Month Navigation */}
                    <div className="flex justify-between items-center mb-4">
                        <button 
                            onClick={prevMonth} 
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
                            ←
                        </button>
                        <h2 className="text-base font-semibold">
                            {currentDate.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                            })}
                        </h2>
                        <button 
                            onClick={nextMonth} 
                            className="px-2 py-1 hover:bg-gray-100 rounded"
                        >
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
                                className={`
                                    rounded-lg cursor-pointer flex flex-col items-center justify-center py-1
                                    relative
                                    ${day ? 'hover:bg-gray-200 hover:text-black' : ''}
                                    ${day === selectedDay ? 'bg-blue-600 text-white font-semibold' : ''}
                                    ${isToday(day) && day !== selectedDay ? 'border-2 border-blue-400 font-bold' : ''}
                                `}
                            >
                                <span>{day ?? ""}</span>
                                {/* Green dot for approved events */}
                                {day && hasEventOnDay(day) && (
                                    <span className={`
                                        absolute bottom-0 w-1 h-1 rounded-full
                                        ${day === selectedDay ? 'bg-white' : 'bg-red-500'}
                                    `}></span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* EVENTS LIST */}
                <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">
                        Events for {currentDate.toLocaleString("default", { month: "short" })} {selectedDay}, {year}
                        {isToday(selectedDay) && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                Today
                            </span>
                        )}
                    </h2>

                    <div className="space-y-4 overflow-y-auto max-h-75 pr-2">
                        {filteredEvents.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-sm text-gray-500">No approved events for this day</p>
                                <button 
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            date: selectedDateString
                                        });
                                        setIsOpen(true);
                                    }}
                                    className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    + Submit event for this day
                                </button>
                            </div>
                        )}

                        {filteredEvents.map((event) => (
                            <div key={event.id} className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm text-gray-500">{event.time}</p>
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full
                                                ${
                                                    event.type === "Academic"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : event.type === "Meeting"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : event.type === "Sports"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-purple-100 text-purple-700"
                                                }`}
                                        >
                                            {event.type}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p className="text-sm text-gray-600">📍 {event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mini stats */}
                    {filteredEvents.length > 0 && (
                        <div className="mt-4 pt-3 border-t text-xs text-gray-500">
                            {filteredEvents.length} event{filteredEvents.length > 1 ? 's' : ''} scheduled
                        </div>
                    )}
                </div>
            </div>

            {/* Add Event Modal */}
            <AddEventModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setFormData({
                        title: "",
                        date: "",
                        time: "",
                        location: "",
                        type: "Academic",
                    });
                }}
                onAddEvent={handleAddEvent}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};

export default Events;