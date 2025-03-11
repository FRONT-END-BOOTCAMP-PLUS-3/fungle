export interface NovelEpisodeWithUserInfo {
  episodeId: number;
  userId: string;
  userNickname: string;
  novelTitle: string;
  episodeTitle: string;
  episodeContent: string;
  createdAt: Date;
  status: string;
}
