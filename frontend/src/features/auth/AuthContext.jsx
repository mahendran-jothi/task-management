import { createContext, useState, useEffect } from "react";
import authService from "@/features/auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { username, token } = JSON.parse(storedAuth);
      setUser({
        token: token,
        username: username,
      });
    }
    setInitialized(true);
  }, []);

  const signup = async (payload) => {
    const data = await authService.register(payload);
    const authData = {
      token: data.data.token.accessToken,
      username: data.data.user.name,
    };
    setUser(authData);

    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    const authData = {
      token: data.data.token.accessToken,
      username: data.data.user.name,
    };
    setUser(authData);

    localStorage.setItem("auth", JSON.stringify(authData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
