"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const { user, loading, sessionExpired } = useAuth();

  useEffect(() => {
    if (!loading && !user && !sessionExpired) {
      router.replace("/login");
    }
  }, [user, loading, sessionExpired, router]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return children;
}
