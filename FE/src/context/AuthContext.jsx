import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username,password)
      localStorage.setItem("token", data.token);

      setIsAuthenticated(true);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

 
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
