import { CommunityPost } from "@prisma/client";

export interface GetPostWithRecruitmentsDto extends CommunityPost {
  recruitmentNames: string[];
}
