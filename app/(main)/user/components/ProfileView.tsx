import {
  MoreOptionsButtonWrapper,
  ProfileSection,
  ProfileWrapper,
} from "./ProfileView.styled";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import ProfileMoreOptions from "./ProfileMoreOptions";
import { UserDeletionModal } from "./UserDeletionModal";
import { useRouter } from "next/navigation";
import ProfileNickname from "./ProfileNickname";

const ProfileView = () => {
  const { user, setUser } = useAuthStore();
  const profileImage = user?.profileImage || "/image/profile.svg";
  const [nicknameInput, setNicknameInput] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>(profileImage);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.nickname) {
      setNicknameInput(user.nickname);
    }
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user?.nickname, user?.profileImage]);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch("/api/user/delete", { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "회원 탈퇴에 실패했습니다.");
        return;
      }

      alert(data.message);
      setUser(null);
      useAuthStore.setState({ isLoggedIn: false });
      router.replace("/");
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : "서버 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <ProfileSection>
      <ProfileWrapper>
        <MoreOptionsButtonWrapper>
          <ProfileMoreOptions
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />
        </MoreOptionsButtonWrapper>
        <ProfileContainer>
          <Image
            src={previewImage}
            alt="프로필 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
          <label htmlFor="image-upload" />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ProfileContainer>
      </ProfileWrapper>

      <ProfileNickname
        nicknameInput={nicknameInput}
        setNicknameInput={setNicknameInput}
      />

      {isDeleteModalOpen && (
        <UserDeletionModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteUser}
        />
      )}
    </ProfileSection>
  );
};

export default ProfileView;
