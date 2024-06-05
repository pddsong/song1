import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios.js";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("blogUser")) || null
  );

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await makeRequest.post("/auth/logout");
    if (res) setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("blogUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
