import { CommunityPostLikeRepository } from "@/domain/repositories/CommunityPostLikeRepository";
import { prisma } from "../config/prisma";
import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";

export class PrCommunityPostLikeRepository
  implements CommunityPostLikeRepository
{
  async toggleLike(
    id: string,
    userId: string
  ): Promise<{ likeCount: number; isLiked: boolean }> {
    const postId = Number(id);
    try {
      const existingLike = await prisma.communityPostLike.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });
      let isLiked: boolean;
      if (existingLike) {
        await prisma.communityPostLike.delete({
          where: {
            userId_postId: { userId, postId },
          },
        });
        isLiked = false;
      } else {
        await prisma.communityPostLike.create({
          data: {
            userId,
            postId,
          },
        });
        isLiked = true;
      }

      const likeCount = await prisma.communityPostLike.count({
        where: {
          postId,
        },
      });

      return { likeCount, isLiked };
    } catch {
      throw new Error("좋아요를 불러오는 중 오류가 발생했습니다.");
    }
  }

  async getLikedCommunityPostsByUserId(
    userId: string
  ): Promise<PostWithCountAndRecruitmentDto[]> {
    const likedPosts = await prisma.communityPostLike.findMany({
      where: { userId },
      select: {
        communityPosts: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            status: true,
            view: true,
            userId: true,
            _count: {
              select: { communityPostLikes: true, communityComments: true },
            },
            PostRecruitments: {
              select: {
                RecruitmentCategory: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            user: {
              select: {
                nickname: true,
              },
            },
          },
        },
      },
      orderBy: {
        communityPosts: {
          createdAt: "desc",
        },
      },
    });

    return likedPosts.map((like) => ({
      id: like.communityPosts.id,
      title: like.communityPosts.title,
      content: like.communityPosts.content,
      createdAt: like.communityPosts.createdAt,
      userNickname: like.communityPosts.user.nickname,
      recruitmentNames: like.communityPosts.PostRecruitments.map(
        (r) => r.RecruitmentCategory.name
      ),
      communityPostLikeCount: like.communityPosts._count.communityPostLikes,
      communityCommentCount: like.communityPosts._count.communityComments,
      view: like.communityPosts.view,
      userId: like.communityPosts.userId,
      status: like.communityPosts.status,
      views: like.communityPosts.view,
    }));
  }
}
