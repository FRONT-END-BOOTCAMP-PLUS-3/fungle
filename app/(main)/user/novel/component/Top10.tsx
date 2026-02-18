"use client";

import { useEffect, useState } from "react";
import {
  ListContainer,
  ListItem,
  Rank,
  Thumbnail,
  Content,
  Title,
  Author,
  Tags,
  StyledImage,
} from "@/app/(main)/user/novel/component/Top10.styled";
import { GENRES } from "@/constants/GENRES";
import { TopListDTO } from "@/application/usecases/novel/dto/TopList";
import { useRouter } from "next/navigation";

const Top10List = () => {
  const [topNovels, setTopNovels] = useState<TopListDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTopNovels = async () => {
      try {
        console.log("[Top10 컴포넌트] API 요청 시작");
        const response = await fetch("/api/novel/top10");
        if (!response.ok) {
          console.error("[Top10 컴포넌트] API 응답 실패:", response.status);
          throw new Error("Failed to fetch novels top 10");
        }
        const data: TopListDTO[] = await response.json();
        console.log(`[Top10 컴포넌트] 받은 데이터 수: ${Array.isArray(data) ? data.length : 0}`);

        const convertedData = (Array.isArray(data) ? data : []).map((novel) => {
          // tags가 이미 한글일 수도 있고 영어일 수도 있으므로 확인
          const processedTags = novel.tags && novel.tags.length > 0 
            ? novel.tags.map(tag => {
                // 이미 한글이면 그대로 사용, 영어면 변환
                const genre = GENRES.find(g => g.value === tag || g.label === tag);
                return genre ? genre.label : tag;
              })
            : [];
          
          console.log(`[Top10 컴포넌트] 소설 ${novel.id} 태그:`, novel.tags, "->", processedTags);
          
          return {
            ...novel,
            tags: processedTags,
          };
        });

        console.log(`[Top10 컴포넌트] 변환된 데이터 수: ${convertedData.length}`);
        setTopNovels(convertedData);
      } catch (error:unknown) {
        console.error("[Top10 컴포넌트] 오류:", error);
        if (error instanceof Error) {
          console.error("[Top10 컴포넌트] 오류 상세:", error.message);
        }
        setTopNovels([]);
      }  finally {
        setLoading(false);
      }
    };

    fetchTopNovels();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (topNovels.length === 0) {
    return <p>등록된 소설이 없습니다.</p>;
  }

  return (
    <ListContainer>
      {topNovels.map((novel, index, array) => (
        <ListItem
          key={novel.id}
          $isLast={index === array.length - 1}
          onClick={() => router.push(`/user/novel/${novel.id}`)}
        >
          <Rank>{index + 1}</Rank>
          <Thumbnail>
            <StyledImage
              src={novel.image}
              alt={`${novel.title} 썸네일`}
              width={60}
              height={80}
            />
          </Thumbnail>
          <Content>
            <Title>{novel.title}</Title>
            <Author>{novel.author}</Author>
            <Tags>{novel.tags && novel.tags.length > 0 ? `#${novel.tags.join(" #")}` : ""}</Tags>
          </Content>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default Top10List;
