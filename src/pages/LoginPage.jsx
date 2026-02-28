import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login states
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");

  // OTP states
  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [timer, setTimer] = useState(0);

  // Get data from Redux
  const teachers = useSelector((state) => state.teachers.list || []);
  const students = useSelector((state) => state.students.list || []);

  const roles = ["Admin", "Teacher", "Student"];
  const selectedIndex = roles.indexOf(selectedRole);

  // Admin credentials (hardcoded for now - you can move to a slice later)
  const admins = [
    { username: "admin", password: "admin123", email: "sinankalathingal208@gmail.com", name: "Super Admin" },
    { username: "Hithul", password: "123456", email: "muhammedsinank881@gmail.com", name: "Super Admin"}
  ];

  // Common OTP sender
  const sendOtp = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(otp);
    setShowOtp(true);

    const expiryTime = Date.now() + 60000;
    setOtpExpiry(expiryTime);
    setTimer(60);

    // Countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Send Email
    emailjs
      .send(
        "service_fk0pmlk",
        "template_g53uv5c",
        {
          to_email: email,
          otp: otp,
        },
        "jJw6AAe6zqUOOq7IO"
      )
      .then(() => {
        alert("OTP sent to your email");
        console.log(otp);
        
      })
      .catch(() => {
        alert("Failed to send OTP");
      });
  };

  // Login submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // ---------- ADMIN LOGIN ----------
    if (selectedRole === "Admin") {
      const admin = admins.find(a => a.username === userId && a.password === password);
      
      if (admin) {
        sendOtp(admin.email);
      } else {
        alert("Invalid Admin credentials");
      }
      return;
    }

    // ---------- TEACHER LOGIN ----------
    if (selectedRole === "Teacher") {
      const teacher = teachers.find(t => t.username === userId && t.password === password);

      if (teacher) {
        // Save to user slice
        dispatch(login({
          role: teacher.role === "hod" ? "HOD" : "Teacher",
          id: teacher.id,
          username: teacher.username,
          name: teacher.fullName,
          email: teacher.email,
          subject: teacher.subject,
          teacherId: teacher.teacherId,
          profileImage: teacher.image || "/default-teacher.png",
          phone: teacher.phone,
          role_type: teacher.role || "teacher"
        }));
        
        // Redirect HOD to different dashboard if needed
        if (teacher.role === "hod") {
          navigate("/hod-dashboard");
        } else {
          navigate("/teachers-dashboard");
        }
      } else {
        alert("No teacher found with this User ID or Password");
      }
      return;
    }

    // ---------- STUDENT LOGIN ----------
    if (selectedRole === "Student") {
      const student = students.find(s => s.username === userId && s.password === password);

      if (student) {
        // Save to user slice
        dispatch(login({
          role: "Student",
          id: student.id,
          username: student.username,
          name: student.fullName,
          email: student.email,
          className: student.className,
          division: student.division,
          studentId: student.studentId,
          profileImage: student.image || "/default-student.png",
          phone: student.phone,
          fatherName: student.fatherName,
          motherName: student.motherName
        }));
        
        navigate("/student-dashboard");
      } else {
        alert("No student found with this User ID or Password");
      }
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (Date.now() > otpExpiry) {
      alert("OTP expired");
      setShowOtp(false);
      return;
    }

    if (enteredOtp === generatedOtp) {
      // Admin login after OTP
      const admin = admins.find(a => a.username === userId);
      
      dispatch(login({
        role: "Admin",
        username: userId,
        email: admin?.email,
        name: admin?.name || "Administrator",
        profileImage: "/images/admin.png"
      }));
      
      navigate("/admin-dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-gray-100 md:items-center md:justify-center px-0 md:px-4">
        <div className="w-full md:max-w-4xl bg-white md:rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
          {/* Left Branding (Desktop only) */}
          <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 p-10">
            <div className="h-16 w-16 rounded-xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-4">
              🎓
            </div>
            <h1 className="text-2xl font-semibold">EduManage</h1>
            <p className="text-sm text-gray-500 mt-2 text-center">
              School Management System
            </p>

            {/* Role Switch */}
            <div className="relative mt-6 w-72 p-1 bg-gray-200 rounded-2xl shadow-inner">
              <div
                className="absolute top-1 h-[calc(100%-8px)] w-1/3 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl transition-all"
                style={{ transform: `translateX(${selectedIndex * 96}%)` }}
              />
              <div className="relative grid grid-cols-3 text-sm font-semibold">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setShowOtp(false);
                      setUserId("");
                      setPassword("");
                    }}
                    className={`py-2 rounded-xl z-10 ${
                      selectedRole === role ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10">
            {/* Mobile Header */}
            <div className="flex flex-col items-center text-center mb-8 md:hidden">
              <div className="h-14 w-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl mb-3">
                🎓
              </div>
              <h1 className="text-xl font-semibold">EduManage</h1>
              <p className="text-sm text-gray-500">School Management System</p>

              <div className="relative mt-5 w-full max-w-xs p-1 bg-gray-200 rounded-2xl shadow-inner">
                <div
                  className="absolute top-1 h-[calc(100%-8px)] w-1/3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl transition-all"
                  style={{ transform: `translateX(${selectedIndex * 96}%)` }}
                />
                <div className="relative grid grid-cols-3 text-sm font-semibold">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setShowOtp(false);
                        setUserId("");
                        setPassword("");
                      }}
                      className={`py-2 rounded-xl z-10 ${
                        selectedRole === role ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center mb-6">
              Login as {selectedRole}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={selectedRole === "Admin" ? "Username" : "Username"}
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />

              {!showOtp && (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </button>
              )}
            </form>

            {/* OTP Section */}
            {showOtp && (
              <div className="mt-6 border-t pt-6 space-y-4 text-center">
                <h3 className="text-lg font-semibold">Enter OTP</h3>

                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full border rounded-lg px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-200"
                />

                <div className="text-sm text-gray-500">Expires in: {timer}s</div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>

                <button
                  onClick={() => {
                    const admin = admins.find(a => a.username === userId);
                    if (admin) sendOtp(admin.email);
                  }}
                  disabled={timer > 0}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition ${
                    timer > 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>

                <button
                  onClick={() => {
                    setShowOtp(false);
                    setEnteredOtp("");
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;