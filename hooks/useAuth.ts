import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

interface AuthUser {
  userId: string;  
  nickname: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
}

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

