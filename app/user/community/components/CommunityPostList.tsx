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

export const posts = [
  {
    id: 1,
    title: "게시글 1",
    status: "recruiting",
    genre: "액션",
    author: "홍길동",
    content:
      "안녕하세요,저희는 감성과 스토리가 살아있는 소설 프로젝트를 진행 중인 팀입니다. 이번 프로젝트에서는 소설 책의 전반적인 디자인을 책임져줄 창의적이고 열정적인 책 디자이너를 찾고자 합니다.■ 주요 업무소설 책 표지 디자인 및 내지 레이아웃 구성타이포그래피, 이미지, 컬러 팔레트 선정 등 전반적인 디자인 컨셉 수립작가, 편집자와 협업하여 독창적인 시각적 스토리텔링 구현■ 지원 자격Adobe Photoshop, Illustrator 등 디자인 툴에 능숙하신 분출판 디자인 또는 문학 관련 디자인 경험 우대 (포트폴리오 제출 필수)창의적 감각과 세심한 디테일을 갖춘 분클린 아키텍처처럼 구조적 접근을 중요시하는 태도 보유자라면 더욱 좋습니다.■ 우대 사항이번 프로젝트에서는 소설 책의 전반적인 디자인을 책임져줄 창의적이고 열정적인 책 디자이너를 찾고자 합니다.■ 주요 업무소설 책 표지 디자인 및 내지 레이아웃 구성타이포그래피, 이미지, 컬러 팔레트 선정 등 전반적인 디자인 컨셉 수립작가, 편집자와 협업하여 독창적인 시각적 스토리텔링 구현■ 지원 자격Adobe Photoshop, Illustrator 등 디자인 툴에 능숙하신 분출판 디자인 또는 문학 관련 디자인 경험 우대 (포트폴리오 제출 필수)창의적 감각과 세심한 디테일을 갖춘 분클린 아키텍처처럼 구조적 접근을 중요시하는 태도 보유자라면 더욱 좋습니다.■ 우대 사항이번 프로젝트에서는 소설 책의 전반적인 디자인을 책임져줄 창의적이고 열정적인 책 디자이너를 찾고자 합니다.■ 주요 업무소설 책 표지 디자인 및 내지 레이아웃 구성타이포그래피, 이미지, 컬러 팔레트 선정 등 전반적인 디자인 컨셉 수립작가, 편집자와 협업하여 독창적인 시각적 스토리텔링 구현■ 지원 자격Adobe Photoshop, Illustrator 등 디자인 툴에 능숙하신 분출판 디자인 또는 문학 관련 디자인 경험 우대 (포트폴리오 제출 필수)창의적 감각과 세심한 디테일을 갖춘 분클린 아키텍처처럼 구조적 접근을 중요시하는 태도 보유자라면 더욱 좋습니다.■ 우대 사항이번 프로젝트에서는 소설 책의 전반적인 디자인을 책임져줄 창의적이고 열정적인 책 디자이너를 찾고자 합니다.■ 주요 업무소설 책 표지 디자인 및 내지 레이아웃 구성타이포그래피, 이미지, 컬러 팔레트 선정 등 전반적인 디자인 컨셉 수립작가, 편집자와 협업하여 독창적인 시각적 스토리텔링 구현■ 지원 자격Adobe Photoshop, Illustrator 등 디자인 툴에 능숙하신 분출판 디자인 또는 문학 관련 디자인 경험 우대 (포트폴리오 제출 필수)창의적 감각과 세심한 디테일을 갖춘 분클린 아키텍처처럼 구조적 접근을 중요시하는 태도 보유자라면 더욱 좋습니다.■ 우대 사항이번 프로젝트에서는 소설 책의 전반적인 디자인을 책임져줄 창의적이고 열정적인 책 디자이너를 찾고자 합니다.■ 주요 업무소설 책 표지 디자인 및 내지 레이아웃 구성타이포그래피, 이미지, 컬러 팔레트 선정 등 전반적인 디자인 컨셉 수립작가, 편집자와 협업하여 독창적인 시각적 스토리텔링 구현■ 지원 자격Adobe Photoshop, Illustrator 등 디자인 툴에 능숙하신 분출판 디자인 또는 문학 관련 디자인 경험 우대 (포트폴리오 제출 필수)창의적 감각과 세심한 디테일을 갖춘 분클린 아키텍처처럼 구조적 접근을 중요시하는 태도 보유자라면 더욱 좋습니다.■ 우대 사항이번 프로젝트에서는 소설 책의 전반적인 디자인을 책임져줄 창의적이고 열정적인 책 디자이너를 찾고자 합니다.■ 주요 업무소설 책 표지 디자인 및 내지 레이아웃 구성타이포그래피, 이미지, 컬러 팔레트 선정 등 전반적인 디자인 컨셉 수립작가, 편집자와 협업하여 독창적인 시각적 스토리텔링 구현■ 지원 자격Adobe Photoshop, Illustrator 등 디자인 툴에 능숙하신 분출판 디자인 또는 문학 관련 디자인 경험 우대 (포트폴리오 제출 필수)창의적 감각과 세심한 디테일을 갖춘 분클린 아키텍처처럼 구조적 접근을 중요시하는 태도 보유자라면 더욱 좋습니다.■ 우대 사항",
    time: "3분전",
    likes: 10,
    views: 100,
    commentCount: 10,
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
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
    createdAt: "25.02.16 23:20",
  },
  {
    id: 11,
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
    createdAt: "25.02.16 23:20",
  },
  {
    id: 12,
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
    createdAt: "25.02.16 23:20",
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
          <Link href={`/user/community/${post.id}`} passHref>
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
