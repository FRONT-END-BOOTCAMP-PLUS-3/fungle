import CommunityEditContainer from "./components/CommunityEditContainer";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const postId = (await params).id;

  return <CommunityEditContainer postId={postId} />;
};

export default Page;
