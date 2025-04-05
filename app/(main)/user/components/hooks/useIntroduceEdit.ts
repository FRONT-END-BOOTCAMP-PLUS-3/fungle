import { useMutation } from "@tanstack/react-query";

const fetchIntroduceEdit = async (introduce: string): Promise<string> => {
  const response = await fetch("/api/user/introduce", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ introduce }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "소개글 변경에 실패했습니다.");
  }

  alert(data.message);

  return data.introduce;
};

const useIntroduceEdit = (
  onSuccess: (introduce: string) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: fetchIntroduceEdit,
    onSuccess,
    onError,
  });
};

export default useIntroduceEdit;
