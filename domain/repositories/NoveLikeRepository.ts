export interface NovelLikeRepository {
  getLikeCountByNovelId(novelId: number): Promise<number>;
}

