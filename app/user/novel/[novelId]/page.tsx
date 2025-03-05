"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { NovelDto } from "@/application/usecases/novel/dto/Novel"; 
import { Main, GradientWrapper, NovelHeader, StatusSection, Badge, UploadInfo, AuthorSection, EpisodeItem } from "@/app/user/novel/[novelId]/NovelIdPage.styled";
import { GENRES } from "@/constants/GENRES";
import { SERIAL_STATUS } from "@/constants/STATUS";
import { SERIAL_DAY } from "@/constants/SERIAL_DAY";
import LikeButton from "../component/NovelLikeButton";

const Page = () => {
  const params = useParams();
  const novelId = params?.novelId ? parseInt(params.novelId as string, 10) : NaN;

  const [novel, setNovel] = useState<NovelDto | null>(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(novelId)) {
      setError("잘못된 소설 ID입니다.");
      setLoading(false);
      return;
    }

    const fetchNovel = async () => {
      try {
        const response = await fetch(`/api/novel/${novelId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch novel: ${response.statusText}`);
        }

        const data: NovelDto = await response.json();
        const formattedEpisodes = data.episodes.map((episode) => ({
          ...episode,
          createdAt: new Date(episode.createdAt)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\. /g, ".")
            .replace(/\.$/, ""),
        }));
        

        const serialStatusLabel =
        SERIAL_STATUS.find((status) => status.value === data.serialStatus)?.label || data.serialStatus;

      const serialDayLabel =
        SERIAL_DAY.find((day) => day.value === data.serialDay)?.label || data.serialDay;

      const genreLabels = data.genres.map(
        (genre) => GENRES.find((g) => g.value === genre)?.label || genre
      );

      setNovel({
        ...data,
        serialStatus: serialStatusLabel,
        serialDay: serialDayLabel,
        genres: genreLabels,
        episodes: formattedEpisodes,
      });
      } catch (error) {
        console.error("Error fetching novel:", error);
        setError("소설 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNovel();
  }, [novelId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!novel) return <p>소설을 찾을 수 없습니다.</p>;

  return (
    <Main>
      <GradientWrapper>
        <StatusSection>
          <Badge>{novel.serialStatus}</Badge>
          <span className="footer">{novel.author}</span>
        </StatusSection>

        <NovelHeader>
          <Image className="novel-image" 
            src={novel.image || "/image/book.svg"} 
            alt={novel.title} 
            width={196} 
            height={280}
          />
          <div className="info">
            <h1>{novel.title}</h1>

            <div className="categories">
              {novel.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>

            <UploadInfo>
              <div>
                <Image src="/icon/episode.svg" alt="총 화수" width={30} height={30} />
                {novel.episodes.length}화
              </div>

              <div>
                <Image src="/icon/upload.svg" alt="업로드 요일" width={30} height={20} />
                {novel.serialDay}
              </div>

              <div>
                <LikeButton novelId={novel.id} initialLikeCount={novel.likeCount} />
              </div>
            </UploadInfo>
            <p className="body1">{novel.novelIntroduce}</p>
          </div>
        </NovelHeader>
      </GradientWrapper>

      <AuthorSection>
        <Image 
          src={novel.profile || "/image/profile.svg"} 
          alt={novel.author} 
          width={80} 
          height={80} 
          className="author-image" 
        />
        <div className="author-info">
          <span className="author-name">{novel.author}</span>
          <p className="author-introduce">{novel.userIntroduce ?? "소개 없음"}</p>
        </div>
      </AuthorSection>

      <div>
        {novel.episodes.map((episode, index) => {
          return (
            <EpisodeItem key={episode.id}>
              <Link href={`/user/novel/${novel.id}/${episode.id}`} passHref>
                <Image
                  src={novel.image || "/image/book.svg"}
                  alt={episode.title}
                  width={80}
                  height={110}
                  className="episode-img"
                />
              </Link>
              <div className="episode-info">
                <Link href={`/user/novel/${novel.id}/${episode.id}`} passHref>
                  <p className="episode-title">{index + 1}화 {episode.title}</p>
                </Link>
                <p className="episode-date">{episode.createdAt}</p>
              </div>
            </EpisodeItem>
          );
        })}
      </div>
    </Main>
  );
};

export default Page;