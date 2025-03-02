import { Novel } from "@prisma/client";

export class NovelResponseDto {
  id: number;
  title: string;
  description: string;
  serialDay: string;
  userId: string;
  genres: string[];
  imageUrl: string | null;
  createdAt: string;

  constructor(novel: Novel, genres: string[]) { 
    this.id = novel.id;
    this.title = novel.title;
    this.description = novel.novelIntroduce;
    this.serialDay = novel.serialDay;
    this.userId = novel.userId;
    this.imageUrl = novel.image;
    this.genres = genres;
    this.createdAt = novel.createdAt.toISOString();
  }
}
