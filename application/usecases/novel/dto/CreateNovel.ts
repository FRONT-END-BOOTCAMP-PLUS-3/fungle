export interface CreateNovelDto {
  title: string;
  description: string;
  serialDay: string;
  userId: string;
  genres: string[];
  coverImage?: File | null;
}
