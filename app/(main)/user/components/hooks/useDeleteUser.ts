import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const deleteUser = async (): Promise<string> => {
  const response = await fetch("/api/user/delete", { method: "DELETE" });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "회원 탈퇴에 실패했습니다.");
  }

  return data.message;
};

const useDeleteUser = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (message: string) => {
      alert(message);
      setUser(null);
      useAuthStore.setState({ isLoggedIn: false });
      router.replace("/");
    },
    onError: (error: Error) => {
      alert(
        error.message ||
          "회원 탈퇴 중 알 수 없는 오류가 발생해습니다. 다시 시도해주세요."
      );
    },
  });
};

export default useDeleteUser;
