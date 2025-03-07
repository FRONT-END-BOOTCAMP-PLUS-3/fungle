"use client";

import { useEffect, useState } from "react";
import { ListContainer, ListItem, Rank, Thumbnail, Content, Title, Author, Tags, StyledImage } from "@/app/user/novel/component/Top10.styled";


// ✅ Top 10 소설 데이터를 위한 타입 정의
interface TopNovel {
  id: number;
  title: string;
  author: string;
  image: string;
  tags: string[];
  score: number;
}

const Top10List = () => {
  const [topNovels, setTopNovels] = useState<TopNovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ API 호출하여 Top 10 소설 가져오기
    const fetchTopNovels = async () => {
      try {
        const response = await fetch("/api/novel/top10");
        const data: TopNovel[] = await response.json();
        console.log("Top 10 소설 데이터:", data);
        setTopNovels(data);
      } catch (error) {
        console.error("Top 10 소설을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopNovels();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // ✅ 로딩 표시
  }

  return (
    <ListContainer>
      {topNovels.map((novel, index, array) => (
        <ListItem key={novel.id} $isLast={index === array.length - 1}>
          <Rank>{index + 1}</Rank>
          <Thumbnail>
            <StyledImage
              src={novel.image}
              alt={`${novel.title} 썸네일`}
              width={60}
              height={80}
              objectFit="cover"
            />
          </Thumbnail>
          <Content>
            <Title>{novel.title}</Title>
            <Author>{novel.author}</Author>
            <Tags>#{novel.tags.join(" #")}</Tags>
          </Content>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default Top10List;
