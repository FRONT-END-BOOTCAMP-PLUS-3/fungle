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
import ProfileImage from "./ProfileImage";
import useDeleteUser from "./hooks/useDeleteUser";

const ProfileView = () => {
  const { user } = useAuthStore();
  const profileImage = user?.profileImage || "/image/profile.svg";
  const [nicknameInput, setNicknameInput] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>(profileImage);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const { mutate: deleteUser } = useDeleteUser();

  useEffect(() => {
    if (user?.nickname) {
      setNicknameInput(user.nickname);
    }
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user?.nickname, user?.profileImage]);

  return (
    <ProfileSection>
      <ProfileWrapper>
        <MoreOptionsButtonWrapper>
          <ProfileMoreOptions
            onDeleteClick={() => setIsDeleteModalOpen(true)}
          />
        </MoreOptionsButtonWrapper>
        <ProfileImage
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </ProfileWrapper>

      <ProfileNickname
        nicknameInput={nicknameInput}
        setNicknameInput={setNicknameInput}
      />

      {isDeleteModalOpen && (
        <UserDeletionModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteUser}
        />
      )}
    </ProfileSection>
  );
};

export default ProfileView;
