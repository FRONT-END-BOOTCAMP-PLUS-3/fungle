import CommunityPostContainer from "./components/CommunityPostContainer";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: postId } = await params;
  return <CommunityPostContainer postId={postId} />;
};

export default Page;
