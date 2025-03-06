import {
  CommunityPostRepository,
  PostWithPostLikes,
  PostWithRelations,
  PostWithRecruitments,
} from "@/domain/repositories/CommunityPostRepository";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

export class PrCommunityPostRepository implements CommunityPostRepository {
  async findAll(params: {
    limit: number;
    offset: number;
    filter?: string;
    sort: string;
    searchField: string;
    search?: string;
    recruitment?: string;
  }): Promise<PostWithRelations[]> {
    const whereClause: Prisma.CommunityPostWhereInput = {};

    if (params.filter !== "all") {
      whereClause.status = params.filter;
    }

    if (params.search?.trim() !== "") {
      if (params.searchField === "author") {
        whereClause.user = {
          nickname: { contains: params.search, mode: "insensitive" },
        };
      } else if (params.searchField === "title") {
        whereClause.title = { contains: params.search, mode: "insensitive" };
      } else if (params.searchField === "content") {
        whereClause.content = { contains: params.search, mode: "insensitive" };
      } else {
        whereClause.OR = [
          { title: { contains: params.search, mode: "insensitive" } },
          { content: { contains: params.search, mode: "insensitive" } },
        ];
      }
    }

    if (params.recruitment?.trim() !== "") {
      whereClause.PostRecruitments = {
        some: {
          RecruitmentCategory: {
            name: { contains: params.recruitment, mode: "insensitive" },
          },
        },
      };
    }

    let orderBy = {};
    if (params.sort === "latest") {
      orderBy = { createdAt: "desc" };
    } else if (params.sort === "likes") {
      orderBy = {
        communityPostLikes: {
          _count: "desc",
        },
      };
    } else if (params.sort === "comments") {
      orderBy = {
        communityComments: {
          _count: "desc",
        },
      };
    }

    try {
      const posts = await prisma.communityPost.findMany({
        where: whereClause,
        skip: params.offset,
        take: params.limit,
        orderBy: orderBy,
        include: {
          user: {
            select: { nickname: true },
          },

          _count: {
            select: {
              communityPostLikes: true,
              communityComments: true,
            },
          },
          PostRecruitments: {
            include: {
              RecruitmentCategory: true,
            },
          },
        },
      });

      return posts;
    } catch {
      throw new Error("게시글 리스트를 가져오는 데 실패했습니다.");
    }
  }

  async count(params: {
    filter?: string;
    searchField: string;
    search?: string;
    recruitment?: string;
  }): Promise<number> {
    const whereClause: Prisma.CommunityPostWhereInput = {};

    if (params.filter !== "all") {
      whereClause.status = params.filter;
    }

    if (params.search?.trim() !== "") {
      if (params.searchField === "author") {
        whereClause.user = {
          nickname: { contains: params.search, mode: "insensitive" },
        };
      } else if (params.searchField === "title") {
        whereClause.title = { contains: params.search, mode: "insensitive" };
      } else if (params.searchField === "content") {
        whereClause.content = { contains: params.search, mode: "insensitive" };
      } else {
        whereClause.OR = [
          { title: { contains: params.search, mode: "insensitive" } },
          { content: { contains: params.search, mode: "insensitive" } },
        ];
      }
    }

    if (params.recruitment?.trim() !== "") {
      whereClause.PostRecruitments = {
        some: {
          RecruitmentCategory: {
            name: { contains: params.recruitment, mode: "insensitive" },
          },
        },
      };
    }
    try {
      return await prisma.communityPost.count({ where: whereClause });
    } catch {
      throw new Error("게시글 개수를 가져오는 데 실패했습니다.");
    }
  }

  async findPostWithPostLike(id: string): Promise<PostWithPostLikes | null> {
    const postId = Number(id);
    try {
      const post = await prisma.communityPost.findUnique({
        where: { id: postId },
        include: {
          communityPostLikes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              communityPostLikes: true,
              communityComments: true,
            },
          },
        },
      });
      return post;
    } catch {
      throw new Error("게시글 상세 정보를 가져오는 데 실패했습니다.");
    }
  }

  async createPost(
    userId: string,
    title: string,
    content: string,
    selectedFields: string[]
  ): Promise<number> {
    try {
      const post = await prisma.communityPost.create({
        data: {
          userId: userId,
          title,
          content,
          PostRecruitments: {
            create: selectedFields.map((fieldName) => ({
              RecruitmentCategory: {
                connect: { name: fieldName },
              },
            })),
          },
        },
      });
      return post.id;
    } catch {
      throw new Error("게시글 생성 중 오류가 발생했습니다.");
    }
  }

  async findPost(id: string): Promise<PostWithRecruitments | null> {
    const postId = Number(id);
    try {
      const postWithRecruitments = await prisma.communityPost.findUnique({
        where: { id: postId },
        include: {
          PostRecruitments: {
            include: {
              RecruitmentCategory: true,
            },
          },
        },
      });

      return postWithRecruitments;
    } catch {
      throw new Error("게시글 정보를 가져오는 데 실패했습니다.");
    }
  }

  async updatePost(
    userId: string,
    id: string,
    title: string,
    content: string,
    selectedFields: string[]
  ): Promise<number> {
    const postId = Number(id);
    try {
      const post = await prisma.communityPost.update({
        where: { id: postId },
        data: {
          userId: userId,
          title,
          content,
          PostRecruitments: {
            deleteMany: {},
            create: selectedFields.map((fieldName) => ({
              RecruitmentCategory: {
                connect: { name: fieldName },
              },
            })),
          },
        },
      });
      return post.id;
    } catch {
      throw new Error("게시글 수정 중 오류가 발생했습니다.");
    }
  }

  async deletePost(id: string, userId: string): Promise<boolean> {
    const postId = Number(id);
    try {
      const result = await prisma.communityPost.deleteMany({
        where: {
          id: postId,
          userId: userId,
        },
      });
      return result.count > 0;
    } catch {
      throw new Error("게시글 삭제 중 오류가 발생했습니다.");
    }
  }

  async getPostByUserId(userId: string): Promise<PostWithRelations[]> {
    try {
      const result = await prisma.communityPost.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: { nickname: true },
          },

          _count: {
            select: {
              communityPostLikes: true,
              communityComments: true,
            },
          },
          PostRecruitments: {
            include: {
              RecruitmentCategory: true,
            },
          },
        },
      });

      return result;
    } catch {
      throw new Error("게시글 조회 중 오류가 발생했습니다.");
    }
  }

  async updatePostStatus(userId: string, postId: number): Promise<void> {
    try {
      const post = await prisma.communityPost.findUnique({
        where: { id: postId, userId },
      });

      if (!post) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }

      if (post.status === "recruiting") {
        await prisma.communityPost.update({
          where: { id: postId },
          data: { status: "completed" },
        });
      }
    } catch {
      throw new Error("게시글 모집 상태 변경에 실패했습니다.");
    }
  }
}
