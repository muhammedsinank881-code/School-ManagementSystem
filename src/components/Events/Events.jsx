import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addPendingEvent } from "../../store/eventsSlice";

const StudentEvent = () => {
  const dispatch = useDispatch();
  
  // Get approved events from Redux store
  const approvedEvents = useSelector((state) => state.events.list || []);
  
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    studentClass: "",
    title: "",
    date: "",
    time: "",
    location: "",
    type: "Academic",
  });

  const today = new Date().toISOString().split("T")[0];

  // Filter events based on date
  const upcomingEvents = approvedEvents.filter(e => e.date >= today);
  const pastEvents = approvedEvents.filter(e => e.date < today);

  const handleSubmit = () => {
    const { studentName, studentClass, title, date } = form;

    if (!studentName || !studentClass || !title || !date) {
      alert("Please fill all required fields.");
      return;
    }

    // Create new event object with pending status
    const newEvent = {
      id: uuidv4(),
      ...form,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    // Dispatch to add to pending events in Redux store
    dispatch(addPendingEvent(newEvent));

    alert("✅ Event request submitted! Waiting for admin approval.");

    // Reset form
    setForm({
      studentName: "",
      studentClass: "",
      title: "",
      date: "",
      time: "",
      location: "",
      type: "Academic",
    });

    setIsOpen(false);
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold mb-1 text-lg">{event.title}</h3>

      <p className="text-xs text-gray-600 mb-1">
        👤 {event.studentName} • Class {event.studentClass}
      </p>

      <p className="text-sm text-gray-500">
        📅 {new Date(event.date).toLocaleDateString()} {event.time && `• ${event.time}`}
      </p>

      <p className="text-sm mb-2">📍 {event.location || "TBD"}</p>

      <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        {event.type}
      </span>

      {/* Show approved date for past events */}
      {event.approvedAt && (
        <p className="text-xs text-gray-400 mt-2">
          Approved on: {new Date(event.approvedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Student Events</h1>
          <p className="text-sm text-gray-500 mt-1">
            View upcoming events or request new ones
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span>+</span>
          Request Event
        </button>
      </div>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Upcoming Events</h2>

        {upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            <p className="text-lg mb-2">No upcoming events</p>
            <p className="text-sm">
              Check back later for new events or request one using the button above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Past Events</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 opacity-80">
            {pastEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Request Event Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
              Request New Event
            </h2>

            {/* Student Info */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Student Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.studentName}
                onChange={e =>
                  setForm({ ...form, studentName: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Class *</label>
              <input
                type="text"
                placeholder="e.g., 10-A"
                value={form.studentClass}
                onChange={e =>
                  setForm({ ...form, studentClass: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Event Info */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Event Title *</label>
              <input
                type="text"
                placeholder="Enter event title"
                value={form.title}
                onChange={e =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e =>
                  setForm({ ...form, date: e.target.value })
                }
                min={today}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={e =>
                  setForm({ ...form, time: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Location</label>
              <input
                type="text"
                placeholder="Event location"
                value={form.location}
                onChange={e =>
                  setForm({ ...form, location: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Event Type</label>
              <select
                value={form.type}
                onChange={e =>
                  setForm({ ...form, type: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Academic">Academic</option>
                <option value="Meeting">Meeting</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setForm({
                    studentName: "",
                    studentClass: "",
                    title: "",
                    date: "",
                    time: "",
                    location: "",
                    type: "Academic",
                  });
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              * Required fields. Your request will be reviewed by an admin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEvent;