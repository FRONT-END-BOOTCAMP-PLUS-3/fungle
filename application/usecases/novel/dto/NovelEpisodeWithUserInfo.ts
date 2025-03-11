export interface NovelEpisodeWithUserInfo {
  userId: string;
  userNickname: string;
  novelTitle: string;
  episodeTitle: string;
  episodeContent: string;
  createdAt: Date;
  status: string;
}
