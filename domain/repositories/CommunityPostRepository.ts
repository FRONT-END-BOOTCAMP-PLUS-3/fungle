import { CommunityPost } from "@prisma/client";

export interface CommunityPostRepository {
  findAll(params: {
    limit: number;
    offset: number;
    filter: string;
    sort: string;
    searchField: string;
    search: string;
    recruitment: string;
  }): Promise<CommunityPost[]>;

  count(params: {
    filter?: string;
    searchField: string;
    search?: string;
    recruitment?: string;
  }): Promise<number>;
}
