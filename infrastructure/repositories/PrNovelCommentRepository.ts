import {
  CommentWithRelations,
  NovelCommentRepository,
} from "@/domain/repositories/NovelCommentRepository";
import { prisma } from "../config/prisma";

export class PrNovelCommentRepository implements NovelCommentRepository {
  async findAll(id: string, userId?: string): Promise<CommentWithRelations[]> {
    const episodeId = Number(id);
    try {
      const comments = await prisma.novelComment.findMany({
        where: { episodeId: episodeId },
        orderBy: { createdAt: "desc" },
        include: {
          replies: {
            select: {
              id: true,
              comment: true,
              createdAt: true,
              userId: true,
              episodeId: true,
              novelId: true,
              parentId: true,
            },
          },
          user: {
            select: {
              nickname: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              novelCommentLike: true,
            },
          },
          novelCommentLike: userId
            ? {
                where: { userId },
                select: { userId: true },
              }
            : undefined,
        },
      });

      return comments;
    } catch {
      throw new Error("댓글 데이터를 가져오는 데 실패했습니다.");
    }
  }

  async commentCount(id: string): Promise<number> {
    const episodeId = Number(id);
    try {
      const count = await prisma.novelComment.count({
        where: { episodeId: episodeId },
      });

      return count;
    } catch {
      throw new Error("댓글 개수를 가져오는 데 실패했습니다.");
    }
  }

  async create(
    episodeId: string,
    userId: string,
    comment: string,
    parentId: string | null,
    novelId: number,
  ): Promise<boolean> {
    const epId = Number(episodeId);
    const parent = parentId ? Number(parentId) : null;

    try {
      const newData = await prisma.novelComment.create({
        data: {
          comment: comment,
          episodeId: epId,
          novelId: novelId,
          userId: userId,
          parentId: parent,
        },
      });

      return !!newData;
    } catch (error) {
      throw new Error("infra : 댓글을 작성하는 데 실패했습니다.");
    }
  }

  async commentUpdate(
    id: string,
    userId: string,
    comment: string,
  ): Promise<boolean> {
    const commentId = Number(id);
    try {
      const existingComment = await prisma.novelComment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      if (existingComment.userId !== userId) {
        throw new Error("댓글 작성자만 수정할 수 있습니다.");
      }

      await prisma.novelComment.update({
        where: { id: commentId },
        data: { comment: comment },
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
      const existingComment = await prisma.novelComment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      if (existingComment.userId !== userId) {
        throw new Error("댓글 작성자만 삭제할 수 있습니다.");
      }

      await prisma.novelComment.delete({
        where: { id: commentId },
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
}
