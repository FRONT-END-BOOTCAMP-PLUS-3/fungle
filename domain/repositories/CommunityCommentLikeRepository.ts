export interface CommunityCommentLikeRepository {
  toggleLike(id: string, userId: string): Promise<boolean>;
}
