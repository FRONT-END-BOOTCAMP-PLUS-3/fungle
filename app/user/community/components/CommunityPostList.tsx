import Image from "next/image";
import Link from "next/link";
import {
  PostBox,
  PostContent,
  PostFooter,
  PostGenre,
  PostInfo,
  PostListContainer,
  PostListWrapper,
  PostStats,
  PostStatsItem,
  PostStatus,
  PostTime,
} from "./CommunityPostList.styled";
import { getPostStats } from "../utils/getPostStats";

const posts = [
  {
    id: 1,
    title: "게시글 1",
    status: "recruiting",
    genre: "액션",
    author: "홍길동",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 2,
    title: "게시글 2",
    status: "completed",
    genre: "판타지",
    author: "김철수",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 20,
    views: 200,
    commentCount: 20,
  },
  {
    id: 3,
    title: "게시글 3",
    status: "recruiting",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 30,
    views: 300,
    commentCount: 30,
  },
  {
    id: 4,
    title: "게시글 4",
    status: "completed",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 5,
    title: "게시글 5",
    status: "recruiting",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 6,
    title: "게시글 6",
    status: "completed",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 7,
    title: "게시글 7",
    status: "recruiting",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 8,
    title: "게시글 8",
    status: "recruiting",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 9,
    title: "게시글 9",
    status: "completed",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
  {
    id: 10,
    title: "게시글 10",
    status: "recruiting",
    genre: "로맨스",
    author: "이영희",
    content:
      "어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기어쩌구저쩌구 뒹굴뒹굴 구르기",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
  },
];

const CommunityPostList = ({
  selectedCommunity,
}: {
  selectedCommunity: string;
}) => {
  const filteredPosts = posts.filter((post) =>
    selectedCommunity === "all" ? true : post.status === selectedCommunity
  );
  return (
    <PostListContainer>
      {filteredPosts.map((post) => (
        <PostListWrapper key={post.id}>
          <Link href={`/commnunity/${post.id}`} passHref>
            <PostBox>
              <PostStatus status={post.status}>
                {post.status === "recruiting" ? "모집중" : "모집완료"}
              </PostStatus>
              <p>{post.title}</p>
              <PostContent>{post.content}</PostContent>
              <PostFooter>
                <PostInfo>
                  <PostGenre>{post.genre}</PostGenre>
                  <PostTime>{post.time}</PostTime>
                </PostInfo>
                <PostStats>
                  {getPostStats(post).map(({ id, icon, alt, count }) => (
                    <PostStatsItem key={id}>
                      <Image src={icon} alt={alt} width={15} height={15} />
                      {count}
                    </PostStatsItem>
                  ))}
                </PostStats>
              </PostFooter>
            </PostBox>
          </Link>
        </PostListWrapper>
      ))}
    </PostListContainer>
  );
};

export default CommunityPostList;
