import Image from "next/image";
import { ProfileContainer } from "./ProfileImage.styled";
import useProfileImageEdit from "./hooks/useProfileImageEdit";
import useAuthStore from "@/store/useAuthStore";

interface ProfileImageProps {
  previewImage: string;
  setPreviewImage: (image: string) => void;
}

const ProfileImage = ({ previewImage, setPreviewImage }: ProfileImageProps) => {
  const { user, setUser } = useAuthStore();

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    updateProfileImage(file);
  };

  return (
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
  );
};

export default ProfileImage;
