"use client";

import { useRouter } from "next/navigation";
import {
  GridContainer,
  BookCard,
  Thumbnail,
  StyledImage,
  Content,
  Title,
  Info,
} from "@/app/(main)/user/novel/component/SerialDayBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";
import {
  ResultNotfoundContainer,
  ResultImage,
} from "@/app/(main)/user/novel/component/SearchResult.styled";
import { SearchNovelDTO } from "@/application/usecases/novel/dto/SearchNovel";

interface SearchResultsProps {
  searchResults: SearchNovelDTO[];
}

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  const router = useRouter();

  return searchResults.length > 0 ? (
    <GridContainer>
      {searchResults.map((book) => (
        <BookCard
          key={book.id}
          onClick={() => router.push(`/user/novel/${book.id}`)}
        >
          <Thumbnail>
            <StyledImage
              src={book.image || "/image/book.svg"}
              alt="소설 썸네일"
              width={120}
              height={160}
            />
          </Thumbnail>
          <Content>
            <Title>{book.title}</Title>
            <Info>
              <p>{book.author}</p>
              <p>{book.fundingStatus}</p>
              <p>펀딩금액 : 10,000</p>
            </Info>
            <ProgressBar progress={80} />
          </Content>
        </BookCard>
      ))}
    </GridContainer>
  ) : (
    <ResultNotfoundContainer>
      <ResultImage
        src="/image/searchnotfound.svg"
        alt="검색 결과 없음"
        width={150}
        height={150}
      />
      <h3>검색 결과가 없습니다.</h3>
    </ResultNotfoundContainer>
  );
};

export default SearchResults;
