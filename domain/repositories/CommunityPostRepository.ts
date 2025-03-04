import { Prisma } from "@prisma/client";

export type PostWithRelations = Prisma.CommunityPostGetPayload<{
  include: {
    user: {
      select: { nickname: true };
    };
    _count: { select: { communityPostLikes: true; communityComments: true } };
    PostRecruitments: { include: { RecruitmentCategory: true } };
  };
}>;

export type PostWithPostLikes = Prisma.CommunityPostGetPayload<{
  include: {
    communityPostLikes: {
      select: {
        userId: true;
      };
    };
    _count: {
      select: {
        communityPostLikes: true;
        communityComments: true;
      };
    };
  };
}>;

export type PostWithRecruitments = Prisma.CommunityPostGetPayload<{
  include: {
    PostRecruitments: { include: { RecruitmentCategory: true } };
  };
}>;
export interface CommunityPostRepository {
  findAll(params: {
    limit: number;
    offset: number;
    filter?: string;
    sort: string;
    searchField: string;
    search?: string;
    recruitment?: string;
  }): Promise<PostWithRelations[]>;

  count(params: {
    filter?: string;
    searchField: string;
    search?: string;
    recruitment?: string;
  }): Promise<number>;

  findPostWithPostLike(id: string): Promise<PostWithPostLikes | null>;

  createPost(
    userId: string,
    title: string,
    content: string,
    selectedFeilds: string[]
  ): Promise<number>;

  findPost(id: string): Promise<PostWithRecruitments | null>;

  updatePost(
    userId: string,
    id: string,
    title: string,
    content: string,
    selectedFields: string[]
  ): Promise<number>;

  deletePost(id: string, userId: string): Promise<boolean>;
  getPostByUserId(userId: string): Promise<PostWithRelations[]>;
}
