"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth.service";
import SessionExpiredModal from "@/components/auth/SessionExpiredModal";
import { disconnectSocket } from "@/lib/socket";
import { resetSessionExpiredNotice } from "@/services/api";

const AuthContext = createContext();
const sessionCheckIntervalMs =
  Number(process.env.NEXT_PUBLIC_SESSION_CHECK_INTERVAL_MS) || 60000;

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const userId = user?._id;
  const isAuthRoute =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");
  const showSessionExpiredModal = sessionExpired && !isAuthRoute;

  const expireSession = useCallback(() => {
    setUser(null);
    disconnectSocket();

    if (!isAuthRoute) {
      setSessionExpired(true);
    }
  }, [isAuthRoute]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();

        setUser(res.data.data);
        setSessionExpired(false);
        resetSessionExpiredNotice();
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      expireSession();
    };

    window.addEventListener("session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, [expireSession]);

  useEffect(() => {
    if (!userId || isAuthRoute) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const res = await getCurrentUser();

        setUser(res.data.data);
        resetSessionExpiredNotice();
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }
      }
    }, sessionCheckIntervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthRoute, userId]);

  const refreshUser = async () => {
    try {
      const res = await getCurrentUser();

      setUser(res.data.data);
      setSessionExpired(false);
      resetSessionExpiredNotice();

      return res.data.data;
    } catch (error) {
      console.error("Auth check failed:", error.response?.data);

      setUser(null);

      throw error;
    }
  };

  const handleLoginRedirect = () => {
    setSessionExpired(false);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshUser,
        sessionExpired,
        expireSession,
      }}
    >
      {children}
      <SessionExpiredModal
        open={showSessionExpiredModal}
        onLogin={handleLoginRedirect}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
