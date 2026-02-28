import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {}, // teacher timetable JSON
};

const teacherTimetableSlice = createSlice({
  name: "teacherTimetable",
  initialState,
  reducers: {
    setTeacherTimetable(state, action) {
      state.data = action.payload;
    }
  },
});

export const { setTeacherTimetable } = teacherTimetableSlice.actions;
export default teacherTimetableSlice.reducer;