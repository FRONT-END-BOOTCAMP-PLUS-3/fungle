export const GENRES = [
  { value: "romance", label: "로맨스" },
  { value: "horror_thriller", label: "공포/스릴러" },
  { value: "fantasy", label: "판타지" },
  { value: "action", label: "액션" },
  { value: "daily_life", label: "일상" },
  { value: "comedy", label: "개그" },
  { value: "martial_arts", label: "무협/사극" },
  { value: "game_fantasy", label: "게임판타지" },
  { value: "art", label: "예술" },
  { value: "sports", label: "스포츠" },
  { value: "growth", label: "성장물" },
];


export const mapGenresToKorean = (tags: string[]): string[] => {
  return tags.map(tag => GENRES.find(g => g.value === tag)?.label || tag);
};

export const mapKoreanToGenreValue = (koreanGenre: string): string | null => {
  const genre = GENRES.find(g => g.label === koreanGenre);
  return genre ? genre.value : null;
};
