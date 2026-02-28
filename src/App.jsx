import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import { Navigate } from "react-router-dom";

import LandingPage from './pages/LandingPage'
import LoginPage from "./pages/LoginPage";

// Admin imports
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import Teacher from "./components/admin/Teacher";
import { Students } from "./components/admin/Students";
import Events from "./components/Events/Events";
import ASettings from "./components/admin/ASettings";

// Teacher imports
import TeacherLayout from './components/teachers/TeacherLayout'
import TDashboard from "./components/teachers/teachers/TDashboard";
import TStudents from './components/teachers/teachers/TStudents'
import TTimetable from "./components/teachers/teachers/TTimetable";
import TAttendance from "./components/teachers/teachers/TAttendance";
import TSettings from "./components/teachers/teachers/TSettings";


// Student imports
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./components/student/StudentDashboard";
import STeachers from "./components/student/STeachers";
import Timetable from "./components/student/Timetable";
import StudentSettings from "./components/student/StudentSettings";
import SAttendance from "./components/student/SAttendance";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
          <ProtectedRoute allowed={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute> } >
        <Route index element={<AdminDashboard />} />
        <Route path="teachers" element={<Teacher />} />
        <Route path="students" element={<Students />} />
        <Route path="events" element={<Events />} />
        <Route path="settings" element={<ASettings />} />
      </Route>

      {/* Teacher Routes */}
      <Route 
        path="/teachers-dashboard" 
        element={
          <ProtectedRoute allowed={["Teacher", "HOD"]}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TDashboard />} />
        <Route path="students" element={<TStudents />} />
        <Route path="timetable" element={<TTimetable />} />
        <Route path="events" element={<Events />} />
        <Route path="attendance" element={<TAttendance />} />
        <Route path="settings" element={<TSettings />} />
      </Route>

      {/* HOD Routes (if you want separate layout) */}
      <Route 
        path="/hod-dashboard" 
        element={
          <ProtectedRoute allowed={["HOD"]}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TDashboard/>} />
        <Route path="teachers" element={<Teacher />} />
        <Route path="students" element={<Students />} />
        <Route path="timetable" element={<TTimetable />} />
        <Route path="events" element={<Events />} />
        <Route path="attendance" element={<TAttendance />} />
        <Route path="settings" element={<TSettings />} />
      </Route>

      {/* Student Routes */}
      <Route 
        path="/student-dashboard" 
        element={
          <ProtectedRoute allowed={["Student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="teachers" element={<STeachers />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="events" element={<Events />} />
        <Route path="attendance" element={<SAttendance />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;