import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowed }) => {
  const user = useSelector((state) => state.user.user);

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed, redirect to appropriate dashboard
  if (allowed && !allowed.includes(user.role)) {
    // Redirect based on actual role
    if (user.role === "Admin") return <Navigate to="/admin-dashboard" replace />;
    if (user.role === "Teacher") return <Navigate to="/teachers-dashboard" replace />;
    if (user.role === "HOD") return <Navigate to="/hod-dashboard" replace />;
    if (user.role === "Student") return <Navigate to="/student-dashboard" replace />;
    
    // Default fallback
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;