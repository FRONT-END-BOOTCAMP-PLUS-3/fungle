import CommunityPostContainer from "./components/CommunityPostContainer";

const Page = ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  return <CommunityPostContainer postId={postId} />;
};

export default Page;
