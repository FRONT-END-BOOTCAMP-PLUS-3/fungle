import { DfPostListUsecase } from "@/application/usecases/community/DfPostListUsecase";
import { PrCommunityPostRepository } from "@/infrastructure/repositories/PrCommunityPostRepository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("filter") || "all";
    const sort = searchParams.get("sort") || "latest";
    const searchField = searchParams.get("searchField") || "";
    const search = searchParams.get("search") || "";
    const recruitment = searchParams.get("recruitment") || "";
    const limit = 10;

    const communityPostRepository = new PrCommunityPostRepository();
    const postListUsecase = new DfPostListUsecase(communityPostRepository);

    const posts = await postListUsecase.execute({
      page,
      limit,
      filter,
      sort,
      searchField,
      search,
      recruitment,
    });

    if (!posts) {
      return NextResponse.json({ posts: [] });
    }

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ message: "서버 에러" }, { status: 500 });
  }
};
