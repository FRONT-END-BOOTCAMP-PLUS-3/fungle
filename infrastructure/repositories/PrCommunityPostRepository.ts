import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

type PostWithRelations = Prisma.CommunityPostGetPayload<{
  include: {
    user: {
      select: { nickname: true };
    };
    _count: { select: { communityPostLikes: true; communityComments: true } };
    PostRecruitments: { include: { RecruitmentCategory: true } };
  };
}>;

type PostWithPostLikes = Prisma.CommunityPostGetPayload<{
  include: {
    _count: {
      select: {
        communityPostLikes: true;
        communityComments: true;
      };
    };
  };
}>;

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

  async findPost(id: number): Promise<PostWithPostLikes | null> {
    const postId = Number(id);
    try {
      const post = await prisma.communityPost.findUnique({
        where: { id: postId },
        include: {
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
}
