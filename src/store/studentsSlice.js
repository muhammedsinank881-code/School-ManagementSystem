// store/studentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      return {
        list: JSON.parse(savedStudents)
      };
    }
  } catch (error) {
    console.error("Error loading students from localStorage:", error);
  }
  return {
    list: []
  };
};

const initialState = loadInitialState();

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents(state, action) {
      state.list = action.payload;
      // Save to localStorage whenever state changes
      localStorage.setItem("students", JSON.stringify(state.list));
    },
    addStudent(state, action) {
      state.list.push(action.payload);
      // Save to localStorage whenever state changes
      localStorage.setItem("students", JSON.stringify(state.list));
    },
    updateStudent(state, action) {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        // Save to localStorage whenever state changes
        localStorage.setItem("students", JSON.stringify(state.list));
      }
    },
    deleteStudent(state, action) {
      state.list = state.list.filter(s => s.id !== action.payload);
      // Save to localStorage whenever state changes
      localStorage.setItem("students", JSON.stringify(state.list));
    }
  },
});

export const { setStudents, addStudent, updateStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;