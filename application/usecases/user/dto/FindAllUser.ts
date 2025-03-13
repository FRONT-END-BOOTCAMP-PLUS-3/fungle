export interface FindAllUserDto {
  id: string;
  userEmail: string;
  nickname: string;
  type: string;
  introduce: string;
  profileImage: string | null;
  fundingStatus: boolean;
}
