export interface CommunityPostLikeRepository {
  toggleLike(
    id: string,
    userId: string
  ): Promise<{ likeCount: number; isLiked: boolean }>;
}
