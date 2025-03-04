import { CommunityPostRepository } from "@/domain/repositories/CommunityPostRepository";
import { GetPostWithRecruitmentsDto } from "./dto/GetPostWithRecruitmentsDto";

export class DfGetPostWithRecruitmentsUsecase {
  constructor(private postRepository: CommunityPostRepository) {}

  async execute(id: string): Promise<GetPostWithRecruitmentsDto> {
    try {
      const postWithRecruitments = await this.postRepository.findPost(id);

      if (!postWithRecruitments) {
        throw new Error("Post not found");
      }

      const flatPostWithRecruitments = {
        content: postWithRecruitments.content,
        createdAt: postWithRecruitments.createdAt,
        id: postWithRecruitments.id,
        status: postWithRecruitments.status,
        title: postWithRecruitments.title,
        userId: postWithRecruitments.userId,
        view: postWithRecruitments.view,
        recruitmentNames: postWithRecruitments.PostRecruitments.map(
          (pr) => pr.RecruitmentCategory.name
        ),
      };
      return flatPostWithRecruitments;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`게시글 조회에 실패했습니다. 원인: ${error.message}`);
      }

      throw new Error("게시글 조회에 실패했습니다.");
    }
  }
}
