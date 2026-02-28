import { Menu, Bell, Plus } from "lucide-react";

function ScheduleCard({ status, time, title, room, bg }) {
  return (
    <div
      className={`min-w-65 ${bg} p-6 rounded-2xl hover:shadow-md transition`}
    >
      {status && (
        <p className="text-xs font-semibold text-green-600">{status}</p>
      )}
      <p className="mt-3 font-semibold">{time}</p>
      <p className="font-medium text-lg">{title}</p>
      <p className="text-sm text-gray-600">{room}</p>
    </div>
  );
}

function ActivityCard({ name, action, subject, time }) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl hover:shadow-sm transition">
      <p className="text-sm">
        <span className="font-semibold">{name}</span> {action}
      </p>
      <p className="text-xs text-gray-400">
        {subject} • {time}
      </p>
    </div>
  );
}

export default function TDashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center relative ">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl bg-white min-h-screen relative shadow-lg rounded-xl overflow-hidden">

        {/* Greeting */}
        <div className="flex items-center gap-4 px-6 py-6">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-xl">Hello, Sarah!</h2>
            <p className="text-sm text-gray-500">{today}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
          
          {/* Attendance */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <p className="text-xs text-gray-400">ATTENDANCE</p>
            <div className="flex items-end gap-2 mt-3">
              <h3 className="text-3xl font-bold">94%</h3>
              <span className="text-green-500 text-sm">+2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-green-500 h-2 rounded-full w-[94%]"></div>
            </div>
          </div>

          {/* Ungraded */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <p className="text-xs text-gray-400">UNGRADED</p>
            <h3 className="text-3xl font-bold mt-3">12</h3>
            <span className="text-sm text-gray-400">Items</span>
          </div>

        </div>

        {/* Schedule */}
        <div className="mt-10 px-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Today's Schedule</h3>
            <button className="text-blue-500 text-sm hover:underline">
              View All
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            <ScheduleCard
              status="ACTIVE NOW"
              time="9:00 AM - 10:15 AM"
              title="Geometry Honors"
              room="Room 302"
              bg="bg-green-100"
            />

            <ScheduleCard
              time="10:30 AM - 11:45 AM"
              title="Algebra II"
              room="Room 101"
              bg="bg-gray-100"
            />

            <ScheduleCard
              time="1:30 PM - 2:45 PM"
              title="Sciences Quiz"
              room="Room 12"
              bg="bg-gray-100"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10 px-6 pb-28">
          <h3 className="font-semibold text-lg mb-4">
            Recent Student Activity
          </h3>

          <div className="space-y-4">
            <ActivityCard
              name="Liam Johnson"
              action="submitted homework"
              subject="Geometry Honors"
              time="10m ago"
            />

            <ActivityCard
              name="Emma Davis"
              action="marked absent"
              subject="Algebra II"
              time="45m ago"
            />

            <ActivityCard
              name="Noah Smith"
              action="aced Quiz #3"
              subject="Calculus BC"
              time="2h ago"
            />
          </div>
        </div>

      </div>
    </div>
  );
}