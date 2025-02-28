import { CommunityComment } from "@prisma/client";

export interface CommunityCommentRepository {
  findAll(postId: number): Promise<CommunityComment[]>;
}
