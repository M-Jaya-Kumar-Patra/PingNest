"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

export default function PublicRoute({ children }) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  return children;
}
