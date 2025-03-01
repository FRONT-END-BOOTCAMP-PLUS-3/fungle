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
    _count: {
      select: {
        communityPostLikes: true;
        communityComments: true;
      };
    };
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

  findPost(id: number): Promise<PostWithPostLikes | null>;

  createPost(
    userId: string,
    title: string,
    content: string,
    selectedFeilds: string[]
  ): Promise<number>;
}
