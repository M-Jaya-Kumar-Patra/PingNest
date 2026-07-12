"use client";

import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}

    setUser(null);

    router.replace("/login");
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

      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
}
