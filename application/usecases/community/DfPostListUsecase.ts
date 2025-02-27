import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { PostWithCountAndRecruitmentDto } from "./dto/PostWithCountAndRecruitmentDto";

export interface GetCommunityPostsParams {
  page: number;
  limit: number;
  filter?: string;
  sort: string;
  searchField: string;
  search?: string;
  recruitment?: string;
}

export interface PostListResult {
  posts: PostWithCountAndRecruitmentDto[];
  totalPages: number;
}

export class DfPostListUsecase {
  constructor(private postRepository: PrCommunityPostRepository) {}

  async execute({
    page = 1,
    limit = 10,
    filter,
    sort = "latest",
    searchField,
    search,
    recruitment,
  }: GetCommunityPostsParams): Promise<PostListResult> {
    const offset = (page - 1) * limit;

    const communityPostRepository = new PrCommunityPostRepository();

    const posts = await communityPostRepository.findAll({
      limit,
      offset,
      filter,
      sort,
      searchField,
      search,
      recruitment,
    });

    const totalCount = await communityPostRepository.count({
      filter,
      searchField,
      search,
      recruitment,
    });

    const totalPages = Math.ceil(totalCount / limit);

    const flatPosts: PostWithCountAndRecruitmentDto[] = posts.map((post) => ({
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      view: post.view,
      status: post.status,
      userNickname: post.user.nickname,
      communityPostLikeCount: post._count.communityPostLikes,
      communityCommentCount: post._count.communityComments,
      recruitmentNames: post.PostRecruitments.map(
        (pr) => pr.RecruitmentCategory.name
      ),
    }));

    return { posts: flatPosts, totalPages };
  }
}
