"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth.service";
import SessionExpiredModal from "@/components/auth/SessionExpiredModal";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();

        setUser(res.data.data);
      } catch (error) {

  if (
    error.response?.status !== 401
  ) {
    console.error(error);
  }

  setUser(null);
} finally {
        setLoading(false);
      }
    };

      console.log("User:", user);
    

    loadUser();
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {

  console.log(
    "SESSION EXPIRED RECEIVED"
  );

  setUser(null);
  setSessionExpired(true);

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
      console.error("Auth check failed:", error.response?.data);

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
      <SessionExpiredModal
        open={sessionExpired}
        onLogin={() => {
          window.location.href = "/login";
        }}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
