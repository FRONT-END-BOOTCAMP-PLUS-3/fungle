import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { PostWithRecruitmentDto } from "./dto/PostWithRecruitmentDto";

export class DfPostDetailByUserIdUsecase {
  constructor(private communityPostRepository: CommunityPostRepository) {}

  async execute(userId: string): Promise<PostWithRecruitmentDto[]> {
    const posts = await this.communityPostRepository.getPostByUserId(userId);

    const flatPost: PostWithRecruitmentDto[] = posts.map((post) => ({
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      view: post.view,
      status: post.status,
      userNickname: post.user.nickname,
      recruitmentNames: post.PostRecruitments.map(
        (pr) => pr.RecruitmentCategory.name
      ),
    }));

    return flatPost;
  }
}
