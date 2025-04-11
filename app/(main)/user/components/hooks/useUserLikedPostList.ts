import { PostWithCountAndRecruitmentDto } from "@/application/usecases/community/dto/PostWithCountAndRecruitmentDto";
import { useQuery } from "@tanstack/react-query";

const fetchLikedPosts = async (): Promise<PostWithCountAndRecruitmentDto[]> => {
  const response = await fetch("/api/user/community/liked");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.likedPosts;
};

export const useUserLikedPostList = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({ queryKey: ["userLikedPosts"], queryFn: fetchLikedPosts });

  return { posts, error, isLoading };
};
