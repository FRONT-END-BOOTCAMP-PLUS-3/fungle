import CommunityPostForm from "../../components/CommunityPostForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const postId = (await params).id;

  console.log(postId);
  // postId로 해당 게시글 가져오기

  return <CommunityPostForm />;
};

export default Page;
