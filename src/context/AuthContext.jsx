import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (role) => {
    setRole(role);
    setToken("logged-in");

    localStorage.setItem("role", role);
    localStorage.setItem("token", "logged-in");
  };

  const logout = () => {
    setRole(null);
    setToken(null);

    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
