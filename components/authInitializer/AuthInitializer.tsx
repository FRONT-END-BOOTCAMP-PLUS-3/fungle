"use client";

import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

const AuthInitializer = () => {
  const { refreshAuth } = useAuthStore();

  useEffect(() => {
    refreshAuth();
  }, []);

  return null;
};

export default AuthInitializer;
