export class SearchNovelDTO {
  id: number;
  title: string;
  image: string; 
  author: string; 
  genres: string[]; 
  fundingStatus: string; 

  constructor(novel: any, author: string, genres: string[]) {
    this.id = novel.id;
    this.title = novel.title;
    this.image = novel.image;
    this.author = author;
    this.genres = genres;
    this.fundingStatus = "1단계 ⭐"; 
  }
}
