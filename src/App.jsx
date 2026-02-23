import { Routes, Route } from "react-router-dom";

import LandingPage from './pages/LandingPage'
import Login from "./components/Login/LoginPage";

import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import Teacher from "./pages/Teacher";
import { Students } from "./pages/Students";
import Events from "./components/Events/Events";
import ASettings from "./components/settings/ASettings";


import StudentLayout from "./components/student/StudentLayout"
import StudentSettings from "./components/student/StudentSettings";
import SSettings from "./components/settings/SSettings";


const App = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>}/>

      <Route path="/admin-dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="teachers" element={<Teacher/>}/>
        <Route path="students" element={<Students/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path="settings" element={<ASettings/>}/>
      </Route>

     <Route path="/student-dashboard" element ={<StudentLayout/>}>
      
      <Route path="teachers" element={<Teacher/>}/>
      <Route path="settings" element ={<StudentSettings/>}/>
     </Route>

    </Routes>
  );
};

export default App;