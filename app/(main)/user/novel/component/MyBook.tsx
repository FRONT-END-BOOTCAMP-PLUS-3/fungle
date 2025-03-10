"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MyBookContainer,
  BookCard,
  Thumbnail,
  Status,
  Title,
  Info,
  StyledImage,
} from "@/app/(main)/user/novel/component/MyBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { NovelsByUserIdDto } from "@/application/usecases/novel/dto/NovelsByUserId";
import EmptyBookList from "./EmptyBookList";

const MyBook = () => {
  const router = useRouter();
  const [books, setBooks] = useState<NovelsByUserIdDto[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await fetch("/api/user/novel");
        if (!response.ok) throw new Error("Failed to fetch novels");

        const data = await response.json();
        const novels = data.novels ?? [];

        const formattedBooks: NovelsByUserIdDto[] = novels.map(
          (novel: any) => ({
            id: novel.id,
            title: novel.title,
            image: novel.image || "/image/book.svg",
            createdAt: new Date(novel.createdAt),
            serialStatus: novel.serialStatus,
          })
        );

        setBooks(formattedBooks);
      } catch (error) {
        throw new Error("서버 에러");
      }
    };

    fetchNovels();
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ongoing":
        return "연재중";
      case "completed":
        return "완결";
      case "paused":
        return "휴재";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div>
      <MyBookContainer>
        {books.length > 0 ? (
          books.map((book) => (
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
                <Status $status={book.serialStatus}>
                  {getStatusLabel(book.serialStatus)}
                </Status>
              </Thumbnail>
              <Title>{book.title}</Title>
              <Info>
                <p>1단계 ⭐</p>
                <p>펀딩금액 20,000 </p>
              </Info>
              <ProgressBar progress={80} />
            </BookCard>
          ))
        ) : (
          <EmptyBookList />
        )}
      </MyBookContainer>
    </div>
  );
};

export default MyBook;
