"use client";

import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import { disconnectSocket } from "@/lib/socket";
import { getApiErrorMessage } from "@/services/api";
import { logoutUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logoutUser();

      setUser(null);
      disconnectSocket();

      router.replace("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to logout"));
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header
      className="
      h-16
      bg-white
      border-b
      px-6
      flex
      items-center
      justify-between
    "
    >
      <div>Welcome, {user?.name}</div>

      <Button onClick={handleLogout} disabled={loggingOut}>
        {loggingOut ? "Logging out..." : "Logout"}
      </Button>
    </header>
  );
}
