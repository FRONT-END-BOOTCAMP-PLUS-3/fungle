"use client";

import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

const AuthInitializer = () => {
  const { refreshAuth } = useAuthStore();

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return null;
};

export default AuthInitializer;
