import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/LikedCommuityPostDto";

export interface CommunityPostLikeRepository {
  toggleLike(
    id: string,
    userId: string
  ): Promise<{ likeCount: number; isLiked: boolean }>;
  getLikedCommunityPostsByUserId(
    userId: string
  ): Promise<PostWithCountAndRecruitmentDto[]>;
}
