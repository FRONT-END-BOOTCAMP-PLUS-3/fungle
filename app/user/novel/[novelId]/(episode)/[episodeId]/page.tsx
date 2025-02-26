"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Main, EpisodeTitle, AuthorInfo, ProfileImage, AuthorDetails, AuthorMeta, CommentWrapper, Content } from "./EpisodePage.styled";
import CommentCreate from "@/components/comment/CommentCreate";
import Comment from "@/components/comment/Comment";
import NovelCompleted from "@/components/novelcompleted/NovelCompleted";
import { NovelDto } from "@/application/usecases/novel/dto/Novel";
import { NovelEpisodeDto } from "@/application/usecases/novel/dto/NovelEpisodeDto";

const Page = () => {
  const params = useParams();
  const novelId = params?.novelId ? parseInt(params.novelId as string, 10) : NaN;
  const episodeId = params?.episodeId ? parseInt(params.episodeId as string, 10) : NaN;

  const [novel, setNovel] = useState<NovelDto | null>(null);
  const [episode, setEpisode] = useState<NovelEpisodeDto | null>(null);
  const [isLastEpisode, setIsLastEpisode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(novelId) || isNaN(episodeId)) {
      setError("잘못된 요청입니다.");
      setLoading(false);
      return;
    }
  
    const fetchEpisode = async () => {
      try {
        const response = await fetch(`/api/novel/${novelId}/${episodeId}`);
        const textResponse = await response.text();    
        let data;
        try {
          data = JSON.parse(textResponse); 
        } catch (parseError) {
          throw new Error("Failed to parse JSON response");
        }
    
        if (!response.ok) {
          throw new Error(`Failed to fetch episode: ${response.status} ${response.statusText}`);
        }
    
        if (!data || !data.episode) {
          throw new Error("Missing episode data in response");
        }

        console.log("data.isCompleted : ", data.isCompleted);
        console.log("isLastEpisode:", data.isLastEpisode);


    
        setNovel(data.novel);
        setEpisode(data.episode);
        setIsLastEpisode(data.isLastEpisode);
        setIsCompleted(data.isCompleted);
      } catch (error) {
        console.error("Error fetching episode:", error);
        setError("에피소드를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
       
    fetchEpisode();
  }, [novelId, episodeId]);

  

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!novel ) return <p>소설을 찾을 수 없습니다.</p>;
  if (!episode ) return <p>에피소드를 찾을 수 없습니다.</p>

  // 댓글 BE 후 삭제 예정 (임시 데이터)
  const post = {
    id: 1,
    title: `${episode.episode}화 ${episode.title}`,
    status: "published",
    genre: "romance",
    author: "임시 작가",
    content: episode.content,
    time: episode.createdAt,
    likes: 1700,
    views: 120,
    commentCount: 123,
    createdAt: episode.createdAt,
  };

  return (
    <Main>
      <EpisodeTitle>{episode.episode}화 {episode.title}</EpisodeTitle> 
      <div>{novel.title}</div> 

      <AuthorInfo>
        <ProfileImage src={novel.profile || "/image/profile.svg"} alt="Author" width={50} height={50} />
        <AuthorDetails>
          <div className="author">{novel.author}</div>
          <AuthorMeta>
            <span>{episode.createdAt}</span>
            <span>조회 {0}</span> 
          </AuthorMeta>
        </AuthorDetails>
      </AuthorInfo>

      <Content>
        {episode.content}
      </Content>

      {isCompleted && isLastEpisode && <NovelCompleted title={novel.title} />}

      <CommentCreate post={post} />
      <CommentWrapper>
        <Comment post={post} />
      </CommentWrapper>
    </Main>
  );
};

export default Page;
