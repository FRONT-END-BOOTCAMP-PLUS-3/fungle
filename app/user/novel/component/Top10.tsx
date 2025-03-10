"use client";

import { useEffect, useState } from "react";
import { ListContainer, ListItem, Rank, Thumbnail, Content, Title, Author, Tags, StyledImage } from "@/app/user/novel/component/Top10.styled";
import { mapGenresToKorean } from "@/constants/GENRES";
import { TopListDTO } from "@/application/usecases/novel/dto/TopList"; 
import { useRouter } from "next/navigation";

const Top10List = () => {
  const [topNovels, setTopNovels] = useState<TopListDTO[]>([]); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTopNovels = async () => {
      try {
        const response = await fetch("/api/novel/top10");
        if (!response.ok) throw new Error("Failed to fetch novels top 10");
        const data: TopListDTO[] = await response.json();

        const convertedData = data.map(novel => ({
          ...novel,
          tags: mapGenresToKorean(novel.tags),
        }));

        setTopNovels(convertedData);
      } catch (error) {
        throw new Error("서버 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchTopNovels();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ListContainer>
      {topNovels.map((novel, index, array) => (
        <ListItem key={novel.id} $isLast={index === array.length - 1} onClick={() => router.push(`/user/novel/${novel.id}`)}>
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
            <Tags>#{novel.tags.join(" #")}</Tags>
          </Content>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default Top10List;
