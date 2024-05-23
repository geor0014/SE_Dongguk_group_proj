import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (username, password) => {
    const response = await authService.login(username, password);
    if (response.user.access_token) {
      const user = {
        username: response.user.username,
        access_token: response.user.access_token,
      };
      setUser(user);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // we need to refresh the page to reflect the changes
    window.location.reload();
  };

  const register = async (username, password) => {
    return authService.register(username, password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
