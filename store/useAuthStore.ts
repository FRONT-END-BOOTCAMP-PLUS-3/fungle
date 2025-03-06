import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  nickname: string;
  introduce: string;
  profileImage: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  refreshAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user: User) => set({ user, isLoggedIn: !!user }),
      refreshAuth: async () => {
        try {
          const response = await fetch("/api/auth/verify", {});

          if (!response.ok) {
            set({ user: null, isLoggedIn: false });
            return;
          }

          const data = await response.json();
          set({ user: data.user, isLoggedIn: true });
        } catch (error) {
          console.error("인증 확인 실패:", error);
          set({ user: null, isLoggedIn: false });
        }
        // 로그아웃 로직 추가 예정
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
