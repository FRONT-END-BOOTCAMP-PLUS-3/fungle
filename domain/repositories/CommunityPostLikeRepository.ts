export interface CommunityPostLikeRepository {
  toggleLike(id: string, userId: string): Promise<number>;
}
