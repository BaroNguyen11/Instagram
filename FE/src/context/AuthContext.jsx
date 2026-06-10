import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);

      setUser(decoded);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);

      setIsAuthenticated(true);
      const decoded = jwtDecode(data.token);
      console.log(decoded);
      setUser(decoded);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
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
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
