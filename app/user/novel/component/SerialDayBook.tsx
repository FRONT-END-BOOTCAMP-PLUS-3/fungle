"use client";

import Image from "next/image";
import { DaysContainer, Day, GridContainer, Card } from "@/app/user/novel/component/SerialDayBook.styled";
import ProgressBar from "@/components/progressbar/ProgressBar";

interface DaysProps {
  selectedDay: string;
  setSelectedDay: (value: string) => void;
}

const SerialDayBook = ({ selectedDay, setSelectedDay }: DaysProps) => {
  return (
    <>
      <DaysContainer>
        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <Day key={day} $active={selectedDay === day} onClick={() => setSelectedDay(day)}>
            {day}
          </Day>
        ))}
      </DaysContainer>
      <GridContainer>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item}>
            <div className="thumbnail">
              <Image 
                src="/bookCover/1740912955011-jojobook.jpg" 
                alt="소설 썸네일"
                width={120} 
                height={160} 
                layout="responsive"
              />
            </div>
            <div className="content">
              <p className="title">나쁜 남자가 끌리는 이유</p>
              <div className="info">
                <p>한교동짬뽕</p>
                <p>1단계 ⭐</p>
                <p>펀딩금액 200,000</p>
              </div>
              <ProgressBar progress={80} />
            </div>
          </Card>
        ))}
      </GridContainer>
    </>
  );
};

export default SerialDayBook;
