import {
  CommentWithRelations,
  CommunityCommentRepository,
} from "@/domain/repositories/CommunityCommentRepository";
import { prisma } from "../config/prisma";

export class PrCommunityCommentRepository implements CommunityCommentRepository {
  async findAll(id: string, userId?: string): Promise<CommentWithRelations[]> {
    const postId = Number(id);
    try {
      const comments = await prisma.communityComment.findMany({
        where: { postId: postId },
        orderBy: { createdAt: "desc" },
        include: {
          replies: true,
          user: {
            select: {
              nickname: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              communityCommentLikes: true,
            },
          },
          communityCommentLikes: userId
            ? {
                where: { userId },
                select: { userId: true },
              }
            : false,
        },
      });

      return comments;
    } catch {
      throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
    }
  }

  async commentCount(id: string): Promise<number> {
    const postId = Number(id);
    try {
      const count = await prisma.communityComment.count({
        where: { postId: postId },
      });

      return count;
    } catch {
      throw new Error("댓글 개수를 가져오는 데 실패했습니다.");
    }
  }

  async create(
    id: string,
    userId: string,
    comment: string,
    parentId: string,
  ): Promise<boolean> {
    const postId = Number(id);
    const parent = Number(parentId);

    try {
      const newData = await prisma.communityComment.create({
        data: {
          comment: comment,
          postId: postId,
          userId: userId,
          parentId: parent,
        },
      });

      return !!newData;
    } catch {
      throw new Error("infra : 댓글을 작성하는 데 실패했습니다.");
    }
  }

  async commentUpdate(
    id: string,
    userId: string,
    content: string,
  ): Promise<boolean> {
    const commentId = Number(id);
    try {
      const existingComment = await prisma.communityComment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      if (existingComment.userId !== userId) {
        throw new Error("댓글 작성자만 수정할 수 있습니다.");
      }

      await prisma.communityComment.update({
        where: { id: commentId },
        data: { comment: content },
      });

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("infra: 알 수 없는 오류가 발생했습니다.");
      }
    }
  }

  async commentDelete(id: string, userId: string): Promise<boolean> {
    const commentId = Number(id);

    try {
      const existingComment = await prisma.communityComment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      if (existingComment.userId !== userId) {
        throw new Error("댓글 작성자만 삭제할 수 있습니다.");
      }

      const isDeleted = await prisma.communityComment.delete({
        where: { id: commentId },
      });

      return !!isDeleted;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("infra: 알 수 없는 오류가 발생했습니다.");
      }
    }
  }
}
