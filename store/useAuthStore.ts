import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  nickname: string;
  introduce: string;
  profileImage: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
    }),
    { name: "user-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAuthStore;
