"use client";

import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthInitializer = () => {
  const router = useRouter();
  const { refreshAuth, isLoggedIn } = useAuthStore();

  useEffect(() => {
    refreshAuth();
  }, []);

  return null;
};

export default AuthInitializer;
