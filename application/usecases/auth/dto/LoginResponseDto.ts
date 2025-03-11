export interface LoginResponseDto {
  id: string;
  userEmail: string;
  nickname: string;
  introduce: string;
  profileImage: string | null;
  accessToken: string;
  refreshToken: string;
}
