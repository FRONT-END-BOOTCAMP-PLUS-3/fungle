import { NovelEpisodeWithUserInfo } from "./NovelEpisodeWithUserInfo";

export interface EpisodeWithUserInfo extends NovelEpisodeWithUserInfo {
  statusLabel: string;
}
