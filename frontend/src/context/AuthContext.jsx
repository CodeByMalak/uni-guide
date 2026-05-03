import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { getToken, setToken, removeToken } from "../utils/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const fetchMe = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/me");
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });
      const { token, ...userData } = response.data;

      if (token) {
        setToken(token);
        setUser(userData);
        navigate("/");
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.post("/register", { name, email, password });
      const { token, ...userData } = response.data;

      if (token) {
        setToken(token);
        setUser(userData);
        navigate("/");
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

