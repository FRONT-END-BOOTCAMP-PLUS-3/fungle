import { Novel } from "@prisma/client"; 

export class SearchNovelDTO {
  id: number;
  title: string;
  image: string; 
  author: string; 
  genres: string[]; 
  fundingStatus: string; 

  constructor(novel: Pick<Novel, "id" | "title" | "image">, author: string, genres: string[]) {
    this.id = novel.id;
    this.title = novel.title;
    this.image = novel.image || "/image/book.svg"; 
    this.author = author;
    this.genres = genres;
    this.fundingStatus = "1단계 ⭐"; 
  }
}
