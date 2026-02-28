// store/teachersSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const savedTeachers = localStorage.getItem("teachers");
    if (savedTeachers) {
      return {
        list: JSON.parse(savedTeachers)
      };
    }
  } catch (error) {
    console.error("Error loading teachers from localStorage:", error);
  }
  return {
    list: []
  };
};

const initialState = loadInitialState();

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers(state, action) {
      state.list = action.payload;
      // Save to localStorage whenever state changes
      localStorage.setItem("teachers", JSON.stringify(state.list));
    },
    addTeacher: (state, action) => {
      state.list.push(action.payload);
      // Save to localStorage whenever state changes
      localStorage.setItem("teachers", JSON.stringify(state.list));
    },
    updateTeacher: (state, action) => {
      const index = state.list.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        // Save to localStorage whenever state changes
        localStorage.setItem("teachers", JSON.stringify(state.list));
      }
    },
    deleteTeacher: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
      // Save to localStorage whenever state changes
      localStorage.setItem("teachers", JSON.stringify(state.list));
    },
  },
});

export const { setTeachers, addTeacher, updateTeacher, deleteTeacher } = teachersSlice.actions;
export default teachersSlice.reducer;