import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("crm_token"),
    user: null,
    tenant: null,
    loading: true,
  });

  useEffect(() => {
    const bootstrap = async () => {
      if (!auth.token) {
        setAuth((current) => ({ ...current, loading: false }));
        return;
      }

      try {
        const data = await apiRequest("/auth/me");
        setAuth((current) => ({ ...current, user: data.user, tenant: data.tenant, loading: false }));
      } catch {
        localStorage.removeItem("crm_token");
        setAuth({ token: null, user: null, tenant: null, loading: false });
      }
    };

    bootstrap();
  }, [auth.token]);

  const login = async (credentials) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    localStorage.setItem("crm_token", data.token);
    setAuth({ token: data.token, user: data.user, tenant: data.tenant, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("crm_token");
    setAuth({ token: null, user: null, tenant: null, loading: false });
  };

  return <AuthContext.Provider value={{ ...auth, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
