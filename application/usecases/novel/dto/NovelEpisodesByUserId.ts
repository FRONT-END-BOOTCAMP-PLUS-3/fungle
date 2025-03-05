import { EPISODE_STATUS } from "@/constants/EPISODE_STATUS";
import { NovelEpisode } from "@prisma/client";

export interface NovelEpisodesByUserIdDto {
  id: number;
  title: string;
  episode: number;
  novelId: number;
  status: string;
  statusLabel: string;
}

export function mapEpisodeByUserIdToDto(
  episode: NovelEpisode
): NovelEpisodesByUserIdDto {
  return {
    id: episode.id,
    novelId: episode.novelId,
    episode: episode.episode,
    title: episode.title,
    status: episode.status,
    statusLabel:
      EPISODE_STATUS.find((s) => s.value === episode.status)?.label ||
      "알 수 없음",
  };
}
