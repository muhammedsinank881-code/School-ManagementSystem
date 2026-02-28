import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: {}, // { "8A": { "2024-02-10": ["present","absent",...] } }
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    saveAttendance(state, action) {
      const { classId, date, data } = action.payload;
      if (!state.records[classId]) state.records[classId] = {};
      state.records[classId][date] = data;
    }
  },
});

export const { saveAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;