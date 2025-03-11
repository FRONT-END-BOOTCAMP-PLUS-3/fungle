import { NovelEpisode } from "@prisma/client"; 

export interface NovelEpisodeDto {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  episode:number;
  novelId:number;
  userId:string;
  view: number;
}

export function mapEpisodeToDto(episode: NovelEpisode): NovelEpisodeDto {
  return {
    id: episode.id,
    novelId: episode.novelId,
    userId: episode.userId,
    episode: episode.episode,
    title: episode.title,
    content: episode.content,
    createdAt: new Date(episode.createdAt).toISOString(), 
    view: episode.view
  };
}
