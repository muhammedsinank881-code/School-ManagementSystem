// NoticeBoard.jsx (Single component - no AdminEvents needed)
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { approveEvent, rejectEvent } from "../../../store/eventsSlice";

const NoticeBoard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState("all"); // "all", "pending", "approved", "rejected"
    
    // Get events from Redux store
    const pendingEvents = useSelector((state) => state.events.pendingList || []);
    const approvedEvents = useSelector((state) => state.events.list || []);
    
    // Create a local storage key for rejected events (since we don't store them in Redux)
    const [rejectedEvents, setRejectedEvents] = useState(() => {
        const saved = localStorage.getItem("rejectedEvents");
        return saved ? JSON.parse(saved) : [];
    });

    // Update rejected events in localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("rejectedEvents", JSON.stringify(rejectedEvents));
    }, [rejectedEvents]);

    // Combine all events with their status
    const allEvents = [
        ...pendingEvents.map(event => ({ ...event, status: "pending", displayStatus: "Pending Approval" })),
        ...approvedEvents.map(event => ({ ...event, status: "approved", displayStatus: "Approved" })),
        ...rejectedEvents.map(event => ({ ...event, status: "rejected", displayStatus: "Rejected" }))
    ].sort((a, b) => {
        // Sort by date (newest first)
        const dateA = a.submittedAt || a.approvedAt || a.rejectedAt || a.date;
        const dateB = b.submittedAt || b.approvedAt || b.rejectedAt || b.date;
        return new Date(dateB) - new Date(dateA);
    });

    // Filter events based on selected filter
    const filteredEvents = filter === "all" 
        ? allEvents 
        : allEvents.filter(event => event.status === filter);

    // Show only first 5 if not showing all
    const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 5);

    const handleApprove = (event) => {
        if (window.confirm(`Approve "${event.title}"?`)) {
            dispatch(approveEvent(event));
        }
    };

    const handleReject = (event) => {
        if (window.confirm(`Reject "${event.title}"?`)) {
            // Add to rejected events with timestamp
            const rejectedEvent = {
                ...event,
                status: "rejected",
                rejectedAt: new Date().toISOString()
            };
            setRejectedEvents(prev => [rejectedEvent, ...prev]);
            
            // Remove from pending in Redux
            dispatch(rejectEvent(event.id));
        }
    };

    const getStatusStyles = (status) => {
        switch(status) {
            case "pending":
                return {
                    bg: "bg-yellow-50 border-yellow-200",
                    badge: "bg-yellow-100 text-yellow-800",
                    icon: "⏳",
                    iconBg: "bg-yellow-200",
                    iconColor: "text-yellow-700"
                };
            case "approved":
                return {
                    bg: "bg-green-50 border-green-200",
                    badge: "bg-green-100 text-green-800",
                    icon: "✓",
                    iconBg: "bg-green-200",
                    iconColor: "text-green-700"
                };
            case "rejected":
                return {
                    bg: "bg-red-50 border-red-200",
                    badge: "bg-red-100 text-red-800",
                    icon: "✗",
                    iconBg: "bg-red-200",
                    iconColor: "text-red-700"
                };
            default:
                return {
                    bg: "bg-gray-50 border-gray-200",
                    badge: "bg-gray-100 text-gray-800",
                    icon: "•",
                    iconBg: "bg-gray-200",
                    iconColor: "text-gray-700"
                };
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-150 flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-5">
                <h2 className="font-semibold text-lg">Notice Board & Event Management</h2>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setFilter("all")}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            filter === "all" 
                                ? "bg-gray-800 text-white" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        All ({allEvents.length})
                    </button>
                    <button
                        onClick={() => setFilter("pending")}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            filter === "pending" 
                                ? "bg-yellow-500 text-white" 
                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                    >
                        Pending ({pendingEvents.length})
                    </button>
                    <button
                        onClick={() => setFilter("approved")}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            filter === "approved" 
                                ? "bg-green-500 text-white" 
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                    >
                        Approved ({approvedEvents.length})
                    </button>
                    <button
                        onClick={() => setFilter("rejected")}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            filter === "rejected" 
                                ? "bg-red-500 text-white" 
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                    >
                        Rejected ({rejectedEvents.length})
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-blue-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-blue-600">Total</p>
                    <p className="text-lg font-semibold text-blue-700">{allEvents.length}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-yellow-600">Pending</p>
                    <p className="text-lg font-semibold text-yellow-700">{pendingEvents.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-green-600">Approved</p>
                    <p className="text-lg font-semibold text-green-700">{approvedEvents.length}</p>
                </div>
                <div className="bg-red-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-red-600">Rejected</p>
                    <p className="text-lg font-semibold text-red-700">{rejectedEvents.length}</p>
                </div>
            </div>

            {/* Scrollable List */}
            <div 
                className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-2" 
                style={{ maxHeight: "400px" }}
            >
                {displayedEvents.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-gray-500">No events to display</p>
                    </div>
                ) : (
                    displayedEvents.map((event) => {
                        const styles = getStatusStyles(event.status);
                        
                        return (
                            <div 
                                key={event.id}
                                className={`flex gap-3 p-3 rounded-xl border ${styles.bg} transition-all hover:shadow-md`}
                            >
                                {/* Status Icon */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.iconBg}`}>
                                    <span className={`text-lg ${styles.iconColor}`}>
                                        {styles.icon}
                                    </span>
                                </div>

                                {/* Event Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{event.title}</h3>
                                            <p className="text-xs text-gray-500">
                                                {event.date} • {event.time}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                📍 {event.location}
                                            </p>
                                            <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                                                event.type === "Academic" ? "bg-blue-100 text-blue-700" :
                                                event.type === "Meeting" ? "bg-yellow-100 text-yellow-700" :
                                                event.type === "Sports" ? "bg-green-100 text-green-700" :
                                                "bg-purple-100 text-purple-700"
                                            }`}>
                                                {event.type}
                                            </span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
                                            {event.displayStatus}
                                        </span>
                                    </div>
                                    
                                    {/* Footer with metadata and actions */}
                                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed">
                                        <p className="text-xs text-gray-400">
                                            {event.status === "pending" && `📅 Submitted ${new Date(event.submittedAt).toLocaleDateString()}`}
                                            {event.status === "approved" && `✅ Approved ${new Date(event.approvedAt).toLocaleDateString()}`}
                                            {event.status === "rejected" && `❌ Rejected ${new Date(event.rejectedAt).toLocaleDateString()}`}
                                        </p>
                                        
                                        {event.status === "pending" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApprove(event)}
                                                    className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(event)}
                                                    className="text-xs bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer with view all toggle and stats */}
            <div className="mt-4 pt-3 border-t text-xs text-gray-500 flex justify-between items-center">
                <div className="flex gap-4">
                    <span>📊 Total: {allEvents.length}</span>
                    <span className="text-yellow-600">⏳ Pending: {pendingEvents.length}</span>
                    <span className="text-green-600">✓ Approved: {approvedEvents.length}</span>
                    <span className="text-red-600">✗ Rejected: {rejectedEvents.length}</span>
                </div>
                {filteredEvents.length > 5 && (
                    <button 
                        className="text-blue-500 hover:text-blue-600 font-medium"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less ↑" : `View All (${filteredEvents.length}) ↓`}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoticeBoard;