"use client";
import { CommunityPost } from "@prisma/client";
import { formatDate } from "@/utils/date/formatDate";

import useAuthStore from "@/store/useAuthStore";
import CommunityPostHeaderView from "./CommunityPostHeaderView";
import useCommunityDelete from "../hooks/useCommunityDelete";

type CommunityPostWithNickname = CommunityPost & {
  userNickname: string;
};

interface CommunityPostHeaderProps {
  postDetail: CommunityPostWithNickname;
}
const CommunityPostHeaderContainer = ({
  postDetail,
}: CommunityPostHeaderProps) => {
  const { mutate: deletePost } = useCommunityDelete();
  const { user } = useAuthStore();
  const userId = user?.id;

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deletePost(postDetail.id);
    }
  };

  const createdAt = new Date(postDetail.createdAt);

  const createdAtFormatted = formatDate(createdAt);
  return (
    <CommunityPostHeaderView
      onDelete={handleDelete}
      postDetail={postDetail}
      userId={userId}
      createdAtFormatted={createdAtFormatted}
    />
  );
};

export default CommunityPostHeaderContainer;
