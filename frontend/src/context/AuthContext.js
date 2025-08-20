import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user profile
  const [loading, setLoading] = useState(true);

  // Attach token to axios if present
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Fetch current user (Profile API)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("users/me/");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Login function (with JWT storage)
  const login = async (username, password) => {
    try {
      const res = await axios.post("users/login/", { username, password });
      
      // Save token in localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Set Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

      // Fetch user profile
      const profile = await axios.get("users/me/");
      setUser(profile.data);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  // ✅ Register function
  const register = async (username, email, password) => {
    try {
      await axios.post("users/register/", { username, email, password });
      return true;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axios.post("users/logout/");
    } catch (err) {
      console.warn("Logout failed, but clearing local data...");
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
