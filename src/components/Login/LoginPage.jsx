import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");

  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [timer, setTimer] = useState(0);

  const roles = ["Admin", "Teacher", "Student"];
  const selectedIndex = roles.indexOf(selectedRole);

  const users = {
    Admin: { email: "admin@edu.com", password: "123456", path: "/admin-dashboard" },
    Teacher: { email: "teacher@edu.com", password: "123456", path: "/admin/teachers" },
    Student: { email: "student@edu.com", password: "123456", path: "/student-dashboard" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[selectedRole];

    if (email === user.email && password === user.password) {
      if (selectedRole === "Admin") {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setShowOtp(true);

        const expires = Date.now() + 30000;
        setOtpExpiry(expires);
        setTimer(30);

        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        emailjs.send(
          "service_fk0pmlk",
          "template_g53uv5c",
          { to_email: email, otp },
          "jJw6AAe6zqUOOq7IO"
        );

        return;
      }

      login(selectedRole);
      navigate(user.path);

    } else {
      alert("Invalid credentials");
    }
  };

  const handleVerifyOtp = () => {
    if (Date.now() > otpExpiry) {
      alert("OTP expired");
      setShowOtp(false);
      return;
    }

    if (enteredOtp === generatedOtp) {
      login("Admin");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 p-10">

          <div className="h-16 w-16 rounded-xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-4">
            🎓
          </div>

          <h1 className="text-2xl font-semibold">EduManage</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">
            School Management System
          </p>

          {/* ROLE SWITCH */}
          <div className="relative mt-6 w-72 p-1 bg-gray-200 rounded-2xl shadow-inner">
            <div
              className="absolute top-1 h-[calc(100%-8px)] w-1/3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl transition-all"
              style={{ transform: `translateX(${selectedIndex * 100}%)` }}
            />
            <div className="relative grid grid-cols-3 text-sm font-semibold">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
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

        {/* RIGHT SECTION */}
        <div className="px-8 py-10">
          <h2 className="text-xl font-semibold text-center mb-6">
            Login to your account
          </h2>

          {!showOtp && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-200"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-200"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          )}

          {/* OTP SECTION */}
          {showOtp && (
            <div className="mt-6 border-t pt-6 space-y-4 text-center">

              <h3 className="text-lg font-semibold">Enter OTP</h3>

              <input
                type="text"
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full border rounded-lg px-4 py-3 text-center text-lg tracking-widest focus:ring-2 focus:ring-green-200"
              />

              <div className="text-sm text-gray-500">
                Expires in: {timer}s
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
              >
                Verify OTP
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;