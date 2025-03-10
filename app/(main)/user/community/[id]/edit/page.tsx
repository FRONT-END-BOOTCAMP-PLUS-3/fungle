import CommunityEdit from "./components/CommunityEdit";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const postId = (await params).id;

  return <CommunityEdit postId={postId} />;
};

export default Page;
