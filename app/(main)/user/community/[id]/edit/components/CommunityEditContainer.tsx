"use client";
import { useMemo } from "react";

import useCommunityEdit from "../hooks/useCommunityEdit";

import CommunityPostForm from "../../../components/CommunityPostForm";
import useCommunityEditPost from "../hooks/useCommunityEditPost";

const CommunityEditContainer = ({ postId }: { postId: string }) => {
  const { data: postData, isLoading, error } = useCommunityEditPost(postId);

  const { mutate: editPost } = useCommunityEdit();

  const handleEdit = async (
    title: string,
    content: string,
    fields: string[]
  ) => {
    await editPost({ postId, title, content, fields });
  };

  const initialSelectedFields = useMemo(() => {
    return postData?.recruitmentNames || [];
  }, [postData?.recruitmentNames]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>게시글을 불러오는 데 실패했습니다.</div>;

  return (
    <CommunityPostForm
      mode="edit"
      initalTitle={postData?.title}
      initalContent={postData?.content}
      initalSelectedFields={initialSelectedFields}
      onSubmit={handleEdit}
    />
  );
};

export default CommunityEditContainer;
