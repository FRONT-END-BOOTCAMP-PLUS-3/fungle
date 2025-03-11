"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Main, EpisodeTitle, AuthorInfo, ProfileImage, AuthorDetails, AuthorMeta, Content } from "./EpisodePage.styled";
import NovelCompleted from "@/components/novelcompleted/NovelCompleted";
import { NovelDto } from "@/application/usecases/novel/dto/Novel";
import { NovelEpisodeDto } from "@/application/usecases/novel/dto/NovelEpisode";
import NovelCommentHeader from "@/app/(main)/user/novel/component/comments/NovelCommentHeader";


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
        } catch (error:unknown) {
          if (error instanceof Error) {
            throw new Error(`Failed to parse JSON response: ${error.message}`);
          }
        }
    
        if (!response.ok) {
          throw new Error(`Failed to fetch episode: ${response.status} ${response.statusText}`);
        }
    
        if (!data || !data.episode) {
          throw new Error("Missing episode data in response");
        }   
        setNovel(data.novel);
        setEpisode(data.episode);
        setIsLastEpisode(data.isLastEpisode);
        setIsCompleted(data.isCompleted);
      } catch (error:unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to parse JSON response: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
       
    fetchEpisode();
  }, [novelId, episodeId]);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, ".").replace(/\.$/, "");
  };

  

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!novel ) return <p>소설을 찾을 수 없습니다.</p>;
  if (!episode ) return <p>에피소드를 찾을 수 없습니다.</p>


  return (
    <Main>
      <EpisodeTitle>{episode.episode}화 {episode.title}</EpisodeTitle> 
      <div>{novel.title}</div> 

      <AuthorInfo>
        <ProfileImage src={novel.profile || "/image/profile.svg"} alt="Author" width={50} height={50} />
        <AuthorDetails>
          <div className="author">{novel.author}</div>
          <AuthorMeta>
            <span>{formatDate(episode.createdAt)}</span>
            <span>조회 {episode.view}</span> 
          </AuthorMeta>
        </AuthorDetails>
      </AuthorInfo>

      <Content>
        {episode.content}
      </Content>

      {isCompleted && isLastEpisode && <NovelCompleted title={novel.title} />}

      <NovelCommentHeader episode = {episode}/>
    </Main>
  );
};

export default Page;
