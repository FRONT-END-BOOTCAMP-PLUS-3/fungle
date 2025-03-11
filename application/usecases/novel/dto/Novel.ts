export interface NovelDto {
  id: number;
  title: string;
  image: string | null;
  serialDay: string;
  novelIntroduce: string;
  profile:string | null;
  serialStatus: string;
  author: string;
  userIntroduce: string | null;
  likeCount: number;
  episodes: { id: number; title: string; createdAt: string }[];
  genres: string[];
}
