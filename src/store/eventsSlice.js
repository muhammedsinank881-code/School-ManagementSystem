// store/eventsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadInitialState = () => {
    try {
        const savedEvents = localStorage.getItem("events");
        const savedPendingEvents = localStorage.getItem("pendingEvents");
        
        return {
            list: savedEvents ? JSON.parse(savedEvents) : [],
            pendingList: savedPendingEvents ? JSON.parse(savedPendingEvents) : []
        };
    } catch (error) {
        console.error("Error loading events from localStorage:", error);
    }
    return {
        list: [],
        pendingList: []
    };
};

const initialState = loadInitialState();

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        // Approved events
        setEvents(state, action) {
            state.list = action.payload;
            localStorage.setItem("events", JSON.stringify(state.list));
        },
        addEvent(state, action) {
            state.list.push(action.payload);
            localStorage.setItem("events", JSON.stringify(state.list));
        },
        deleteEvent(state, action) {
            state.list = state.list.filter(e => e.id !== action.payload);
            localStorage.setItem("events", JSON.stringify(state.list));
        },
        updateEvent(state, action) {
            const index = state.list.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
                localStorage.setItem("events", JSON.stringify(state.list));
            }
        },
        
        // Pending events (awaiting approval)
        setPendingEvents(state, action) {
            state.pendingList = action.payload;
            localStorage.setItem("pendingEvents", JSON.stringify(state.pendingList));
        },
        addPendingEvent(state, action) {
            state.pendingList.unshift(action.payload); // Add to top (newest first)
            localStorage.setItem("pendingEvents", JSON.stringify(state.pendingList));
        },
        removePendingEvent(state, action) {
            state.pendingList = state.pendingList.filter(e => e.id !== action.payload);
            localStorage.setItem("pendingEvents", JSON.stringify(state.pendingList));
        },
        
        // Approve event (move from pending to approved)
        approveEvent(state, action) {
            // Remove from pending
            state.pendingList = state.pendingList.filter(e => e.id !== action.payload.id);
            
            // Add to approved events
            state.list.push({
                ...action.payload,
                approvedAt: new Date().toISOString()
            });
            
            // Save both to localStorage
            localStorage.setItem("pendingEvents", JSON.stringify(state.pendingList));
            localStorage.setItem("events", JSON.stringify(state.list));
        },
        
        // Reject event (just remove from pending)
        rejectEvent(state, action) {
            state.pendingList = state.pendingList.filter(e => e.id !== action.payload);
            localStorage.setItem("pendingEvents", JSON.stringify(state.pendingList));
        }
    },
});

export const { 
    setEvents, 
    addEvent, 
    deleteEvent, 
    updateEvent,
    setPendingEvents,
    addPendingEvent,
    removePendingEvent,
    approveEvent,
    rejectEvent
} = eventsSlice.actions;

export default eventsSlice.reducer;