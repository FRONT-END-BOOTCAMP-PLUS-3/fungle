"use client";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: { id: string } | null;
  refreshAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const pathname = usePathname();

  const fetchUser = async () => {
    // 로그인 없이 접근 가능한 route 리스트 추가
    const publicRoutes = ["/", "/login", "/signup"];
    if (publicRoutes.includes(pathname)) {
      return; // public route에서는 로그인 상태를 확인하지 않음
    }
    try {
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });
      if (!response.ok) {
        setUser(null);
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]); // pathname이 변경될 때마다 로그인 여부 확인

  return (
    <AuthContext.Provider value={{ user, refreshAuth: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
