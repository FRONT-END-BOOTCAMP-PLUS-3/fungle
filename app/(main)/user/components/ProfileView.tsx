import Button from "@/components/button/Button";
import {
  ErrorMessage,
  InputBox,
  MoreOptionsButtonWrapper,
  NicknameBox,
  NicknameContainer,
  ProfileContainer,
  ProfileSection,
  ProfileWrapper,
} from "./ProfileView.styled";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import ProfileMoreOptions from "./ProfileMoreOptions";
import { UserDeletionModal } from "./UserDeletionModal";
import { useRouter } from "next/navigation";
import useNicknameEdit from "./hooks/useNicknameEdit";
import useProfileImageEdit from "./hooks/useProfileImageEdit";

const ProfileView = () => {
  const { user, setUser } = useAuthStore();
  const profileImage = user?.profileImage || "/image/profile.svg";
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nicknameInput, setNicknameInput] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>(profileImage);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { mutate: updateNickname } = useNicknameEdit(
    setNicknameError,
    setIsEditing,
    setNicknameInput,
    (updatedNickname: string) => {
      if (user) {
        setUser({ ...user, nickname: updatedNickname });
      }
    },
    (error: Error) => {
      alert(
        error instanceof Error
          ? error.message
          : "닉네임 변경 중 알 수 없는 오류가 발생했습니다."
      );
    }
  );

  const { mutate: updateProfileImage } = useProfileImageEdit(
    (updatedProfileImage: string) => {
      if (user) {
        setUser({ ...user, profileImage: updatedProfileImage });
      }
      alert("프로필 이미지가 성공적으로 변경되었습니다!");
    },
    (error: Error) => {
      alert(
        error instanceof Error
          ? error.message
          : "프로필 이미지 변경 중 알 수 없는 오류가 발생했습니다."
      );
    }
  );

  useEffect(() => {
    if (user?.nickname) {
      setNicknameInput(user.nickname);
    }
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user?.nickname, user?.profileImage]);

  // 닉네임 유효성 검사
  const validateNickname = (nickname: string): string | null => {
    if (!/^[a-zA-Z가-힣]{1,6}$/.test(nickname.trim())) {
      return "닉네임은 한글 또는 영어만 사용 가능하며, 1~6자로 입력해주세요.";
    }
    return null;
  };

  const handleEditClick = async () => {
    if (isEditing) {
      // 빈 문자열일 경우 기존 닉네임 유지
      const trimmedNickname = nicknameInput.trim();
      if (trimmedNickname === "" || trimmedNickname === user?.nickname) {
        setNicknameError("");
        setNicknameInput(user?.nickname || "");
        setIsEditing(false);
        return;
      }

      // 닉네임 유효성 검사
      const validationError = validateNickname(trimmedNickname);
      if (validationError) {
        setNicknameError(validationError);
        return;
      }

      updateNickname({ nickname: trimmedNickname });
    } else {
      setIsEditing(true);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    updateProfileImage(file);
  };

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
      <NicknameContainer>
        <NicknameBox>
          {isEditing ? (
            <InputBox>
              <Input
                placeholder="닉네임 수정"
                label="닉네임 수정"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                hideLabel
              />
            </InputBox>
          ) : (
            <h5>{nicknameInput}</h5>
          )}
          <Button buttonSize="xsmall" onClick={handleEditClick}>
            {isEditing ? "확인" : "수정"}
          </Button>
        </NicknameBox>
        <ErrorMessage>{nicknameError}</ErrorMessage>
      </NicknameContainer>
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
