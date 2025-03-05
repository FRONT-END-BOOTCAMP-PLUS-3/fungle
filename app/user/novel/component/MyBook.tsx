"use client";

import Image from "next/image";
import { MyBookContainer, Card } from "@/app/user/novel/component/MyBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";

const books = [
  { id: 1, title: "제목", status: "complete", funding: 200000, progress: 80 },
  { id: 2, title: "제목", status: "paused", funding: 200000, progress: 60 },
  { id: 3, title: "제목", status: "serializing", funding: 200000, progress: 90 },
];

const MyBook = () => {
  return (
    <div>
      <MyBookContainer>
        {books.map((book) => (
          <Card key={book.id}>
            <div className="thumbnail">
              <Image 
                src="/image/book.svg" 
                alt="소설 썸네일" 
                width={120} 
                height={160} 
                layout="responsive"
              />
              <span className={`status ${book.status}`}>
                {book.status === "complete" && "완결"}
                {book.status === "paused" && "휴재중"}
                {book.status === "serializing" && "연재중"}
              </span>
            </div>
            <p className="title">{book.title}</p>
            <div className="info">
              <p>1단계 ⭐</p>
              <p>펀딩금액 {book.funding.toLocaleString()}</p>
            </div>
            <ProgressBar progress={book.progress} />
          </Card>
        ))}
      </MyBookContainer>
    </div>
  );
};

export default MyBook;
