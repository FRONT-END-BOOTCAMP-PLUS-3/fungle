"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DaysContainer, Day, GridContainer, Card } from "@/app/user/novel/component/SerialDayBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { SerialDayNovelDto } from "@/application/usecases/novel/dto/SerialDayNovel";

interface DaysProps {
  selectedDay: string;
  setSelectedDay: (value: string) => void;
}

const dayMapping: { [key: string]: string } = {
  "월": "monday",
  "화": "tuesday",
  "수": "wednesday",
  "목": "thursday",
  "금": "friday",
  "토": "saturday",
  "일": "sunday",
};

const SerialDayBook = ({ selectedDay, setSelectedDay }: DaysProps) => {
  const router = useRouter(); 
  const [books, setBooks] = useState<SerialDayNovelDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNovelsByDay = async () => {
      try {
        const dayKey = dayMapping[selectedDay]; 
        if (!dayKey) return;

        setLoading(true);
        const response = await fetch(`/api/novel/serial-day/${dayKey}`);

        if (!response.ok) throw new Error("Failed to fetch novels");
        const data = await response.json();
        setBooks(data.novels);
        } 
      catch (error) {
        console.error("Error fetching novels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovelsByDay();
  }, [selectedDay]); 

  return (
    <>
      <DaysContainer>
        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <Day key={day} $active={selectedDay === day} onClick={() => setSelectedDay(day)}>
            {day}
          </Day>
        ))}
      </DaysContainer>

      {loading ? (
        <p>불러오는 중...</p> 
      ) : books.length > 0 ? (
        <GridContainer>
          {books.map((book) => (
            <Card key={book.id} onClick={() => router.push(`/user/novel/${book.id}`)}> 
              <div className="thumbnail">
                <Image 
                  src={book.image || "/image/book.svg"} 
                  alt="소설 썸네일"
                  width={120} 
                  height={160} 
                  layout="responsive"
                />
              </div>
              <div className="content">
                <p className="title">{book.title}</p>
                <div className="info">
                  <p>{book.author}</p>
                  <p>{book.fundingStatus}</p>
                  <p>펀딩금액 : 10,000</p>
                </div>
                <ProgressBar progress={80} />
              </div>
            </Card>
          ))}
        </GridContainer>
      ) : (
        <p>해당 요일에 연재되는 소설이 없습니다.</p>
      )}
    </>
  );
};

export default SerialDayBook;
