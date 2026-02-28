import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import teachersReducer from "./teachersSlice";
import studentsReducer from "./studentsSlice";
import classTimetableReducer from "./classTimetableSlice";
import teacherTimetableReducer from "./teacherTimetableSlice";
import eventsReducer from "./eventsSlice";
import attendanceReducer from "./attendanceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teachers: teachersReducer,
    students: studentsReducer,
    classTimetable: classTimetableReducer,
    teacherTimetable: teacherTimetableReducer,
    events: eventsReducer,
    attendance: attendanceReducer,
  },
});