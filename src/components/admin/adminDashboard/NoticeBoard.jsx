import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
  const navigate = useNavigate()
  const notices = [
    {
      title: "Sports Day Announcement",
      message: "Annual Sports Day will be held on May 12, 2024.",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-700",
      icon: "notifications",
    },
    {
      title: "Summer Break Start Date",
      message: "Summer break starts on May 25, 2024.",
      bg: "bg-blue-100",
      iconColor: "text-blue-700",
      icon: "event",
    },
    {
      title: "PTA Meeting",
      message: "Parent–Teacher meeting is scheduled for June 10.",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-700",
      icon: "groups",
    },
    {
      title: "Fee Reminder",
      message: "Last date to pay school fee is May 30.",
      bg: "bg-blue-100",
      iconColor: "text-blue-700",
      icon: "payments",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-80 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Notice Board</h2>
        <button className="text-sm text-blue-500 hover:text-blue-600"
        onClick={()=> navigate("/admin-dashboard/events")}>view all</button>
      </div>

      {/* Scrollable List */}
      <div 
        className="mt-4 space-y-3 overflow-y-auto no-scrollbar pr-2" 
        style={{ maxHeight: "290px" }}
      >
        {notices.map((item, index) => (
          <div 
            key={index}
            className={`flex gap-3 p-3 rounded-xl ${item.bg}`}
          >
            <span className={`material-icons ${item.iconColor}`}>
              {item.icon}
            </span>

            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NoticeBoard;