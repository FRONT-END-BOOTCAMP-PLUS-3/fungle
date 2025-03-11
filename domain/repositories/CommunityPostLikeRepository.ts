import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";

export interface CommunityPostLikeRepository {
  toggleLike(
    id: string,
    userId: string
  ): Promise<{ likeCount: number; isLiked: boolean }>;
  getLikedCommunityPostsByUserId(
    userId: string
  ): Promise<PostWithCountAndRecruitmentDto[]>;
}
