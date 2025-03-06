"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MyBookContainer, Card } from "@/app/user/novel/component/MyBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { NovelsByUserIdDto } from "@/application/usecases/novel/dto/NovelsByUserId";
import { useRouter } from "next/navigation";
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
    
        const formattedBooks: NovelsByUserIdDto[] = novels.map((novel: any) => ({
          id: novel.id,
          title: novel.title,
          image: novel.image || "/image/book.svg",
          createdAt: new Date(novel.createdAt),
          serialStatus: novel.serialStatus,
        }));
    
        setBooks(formattedBooks);
      } catch (error) {
        console.error("Error fetching novels:", error);
      }
    };

    fetchNovels();
  }, []);

  const getStatusLabel = (status : string) => {
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
            <Card key={book.id} onClick={() => router.push(`/user/novel/${book.id}`)}>
              <div className="thumbnail">
                <Image
                  src={book.image || "/image/book.svg"}
                  alt="소설 썸네일"
                  width={120}
                  height={160}
                  layout="responsive"
                />
                <span className={`status ${book.serialStatus}`}>
                  {getStatusLabel(book.serialStatus)}
                </span>
              </div>
              <p className="title">{book.title}</p>
              <div className="info">
                <p>1단계 ⭐</p>
                <p>펀딩금액 20000 </p> 
              </div>
              <ProgressBar progress={80} /> 
            </Card>
          ))
        ) : (
          <EmptyBookList />
        )}
      </MyBookContainer>
    </div>
  );
};  

export default MyBook;
