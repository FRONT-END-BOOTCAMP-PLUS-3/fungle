import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";
import { useQuery } from "@tanstack/react-query";
import { SearchParams } from "../page";

interface FetchResult {
  posts: PostWithCountAndRecruitmentDto[];
  totalPages: number;
}

const fetchCommunityPosts = async (
  params: SearchParams
): Promise<FetchResult> => {
  const query = new URLSearchParams();

  query.set("filter", params.selectedCommunity || "all");

  query.set("page", params.page.toString());
  if (params.sort && params.sort !== "latest") {
    query.set("sort", params.sort);
  }

  const { selectedSearchField, searchTitle, searchAuthor, searchContent } =
    params;

  if (selectedSearchField) {
    query.set("searchField", selectedSearchField);
  }

  if (selectedSearchField === "title" && searchTitle.trim() !== "") {
    query.set("search", searchTitle.trim());
  } else if (selectedSearchField === "author" && searchAuthor.trim() !== "") {
    query.set("search", searchAuthor.trim());
  } else if (selectedSearchField === "content" && searchContent.trim() !== "") {
    query.set("search", searchContent.trim());
  }

  if (params.searchRecruitment.length > 0) {
    query.set("recruitment", params.searchRecruitment.join(", "));
  }

  const response = await fetch(`/api/community?${query.toString()}`);
  if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  return response.json();
};

const useCommunityPosts = (params: SearchParams) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["communityPosts", params],
    queryFn: () => fetchCommunityPosts(params),
  });

  return {
    posts: data?.posts || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    error: error ? (error as Error).message : null,
  };
};

export default useCommunityPosts;
