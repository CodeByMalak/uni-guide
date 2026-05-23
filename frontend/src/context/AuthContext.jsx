import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { getToken, setToken, removeToken } from "../utils/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(null);
  const navigate = useNavigate();

  // Check backend connection on mount using the dedicated health endpoint
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.get("/health");
        setBackendConnected(true);
      } catch (err) {
        // If we get any HTTP response (even an error), the server is reachable
        if (err.response) {
          setBackendConnected(true);
        } else {
          // Network error — server is truly unreachable
          setBackendConnected(false);
          console.warn("⚠️ Backend unreachable. Check that the server is running on port 5000.");
        }
      }
    };
    checkConnection();
  }, []);

  // Check if user is already logged in on mount
  useEffect(() => {
    const fetchMe = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
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
      const response = await api.post("/auth/login", { email, password });
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
      const response = await api.post("/auth/register", { name, email, password });
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

  const toggleFavorite = async (universityId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isFavorited = user.favorites?.some(id => id.toString() === universityId.toString());
    
    try {
      if (isFavorited) {
        await api.delete(`/favorites/${universityId}`);
      } else {
        await api.post(`/favorites/${universityId}`);
      }
      
      // Re-fetch user data to keep favorites populated and in sync
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, error, login, register, logout, backendConnected, toggleFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

