"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Initial auth check
  useEffect(() => {
    const publicRoutes = ["/login", "/register"];

    if (publicRoutes.includes(window.location.pathname)) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await getCurrentUser();

        setUser(res.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Session expired listener
  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);

      localStorage.clear();
      sessionStorage.clear();

      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.replace("/login");
      }
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);

  const refreshUser = async () => {
    try {
      const res = await getCurrentUser();

      setUser(res.data.data);
    } catch (error) {
      console.log("REFRESH USER FAILED", error);

      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
