import { NovelEpisode } from "@prisma/client"; 

export interface NovelEpisodeDto {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  episode:number;
}

export function mapEpisodeToDto(episode: NovelEpisode): NovelEpisodeDto { 
  return {
    id: episode.id,
    title: episode.title,
    content: episode.content,
    episode:episode.episode,
    createdAt: new Date(episode.createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, ".").replace(/\.$/, ""), 
  };
}
