import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {}, // class timetable JSON
};

const classTimetableSlice = createSlice({
  name: "classTimetable",
  initialState,
  reducers: {
    setClassTimetable(state, action) {
      state.data = action.payload;
    }
  },
});

export const { setClassTimetable } = classTimetableSlice.actions;
export default classTimetableSlice.reducer;