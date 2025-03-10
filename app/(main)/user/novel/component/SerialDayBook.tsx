"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DaysContainer,
  Day,
  GridContainer,
  BookCard,
  Thumbnail,
  Content,
  Title,
  Info,
  StyledImage,
} from "@/app/(main)/user/novel/component/SerialDayBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { SerialDayNovelDto } from "@/application/usecases/novel/dto/SerialDayNovel";

const dayMapping: { [key: string]: string } = {
  월: "monday",
  화: "tuesday",
  수: "wednesday",
  목: "thursday",
  금: "friday",
  토: "saturday",
  일: "sunday",
};

interface SerialDayBookProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const SerialDayBook: React.FC<SerialDayBookProps> = ({
  selectedDay,
  setSelectedDay,
}) => {
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
      } catch (error) {
        throw new Error("서버 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchNovelsByDay();
  }, [selectedDay]);

  return (
    <>
      <DaysContainer>
        {Object.keys(dayMapping).map((day) => (
          <Day
            key={day}
            $active={selectedDay === day}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </Day>
        ))}
      </DaysContainer>

      {loading ? (
        <p>불러오는 중...</p>
      ) : books.length > 0 ? (
        <GridContainer>
          {books.map((book) => (
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
        <p>해당 요일에 연재되는 소설이 없습니다.</p>
      )}
    </>
  );
};

export default SerialDayBook;
