export interface NovelCommentLikeRepository {
  toggleLike(id: string, userId: string): Promise<boolean>;
}
