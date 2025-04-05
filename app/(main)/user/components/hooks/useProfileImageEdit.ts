import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

const uploadProfileImage = async (file: File): Promise<string> => {
  const { user } = useAuthStore.getState();
  if (!user) {
    throw new Error("로그인 정보가 없습니다.");
  }

  const formData = new FormData();
  formData.append("userId", user.id);
  formData.append("profileImage", file);

  const response = await fetch("/api/user/profile-image", {
    method: "PATCH",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "프로필 이미지 변경에 실패했습니다.");
  }

  return data.profileImage;
};

const useProfileImageEdit = (
  onSuccess: (profileImage: string) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess,
    onError,
  });
};

export default useProfileImageEdit;
