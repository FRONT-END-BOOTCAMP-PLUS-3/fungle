"use client";

import useAuthStore from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthInitializer = () => {
  const { refreshAuth } = useAuthStore();
  const pathname = usePathname();

  const excludedPaths = ["/", "/login", "/register"];
  const shouldSkipAuthCheck = excludedPaths.includes(pathname);

  useEffect(() => {
    if (!shouldSkipAuthCheck) {
      refreshAuth();
    }
  }, [refreshAuth, shouldSkipAuthCheck]);

  return null;
};

export default AuthInitializer;
