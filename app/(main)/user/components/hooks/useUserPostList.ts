import { PostWithRecruitmentDto } from "@/application/usecases/community/dto/PostWithRecruitmentDto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUserPosts = async (): Promise<PostWithRecruitmentDto[]> => {
  const response = await fetch("/api/user/community");
  if (!response.ok) throw new Error("게시글을 불러오는 데 실패했습니다.");
  const data = await response.json();
  return data.posts;
};

const updatePostStatus = async (postId: number) => {
  const response = await fetch("/api/user/community", {
    method: "PATCH",
    body: JSON.stringify({ postId }),
  });
  if (!response.ok) throw new Error("모집 상태 변경에 실패했습니다.");
  return response.json();
};

export const useUserPostList = () => {
  const queryClient = useQueryClient();
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({ queryKey: ["userPosts"], queryFn: fetchUserPosts });

  const { mutate: completeRecruitment } = useMutation({
    mutationFn: updatePostStatus,
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(`에러 발생: ${error.message}`);
      } else {
        alert(
          "모집 상태 변경 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요."
        );
      }
    },
  });

  return { posts, error, isLoading, completeRecruitment };
};
