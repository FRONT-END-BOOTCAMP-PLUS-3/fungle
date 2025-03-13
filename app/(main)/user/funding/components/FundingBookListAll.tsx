"use client";

import Image from "next/image"; 
import ProgressBar from "@/components/progressbar/ProgressBar";
import { 
  ListContainer, 
  FundingCard, 
  BookImage, 
  Info, 
  MetaContainer, 
  Author, 
  Title, 
  Amount, 
  Remaining 
} from "./FundingBookList.styled"; 

const fundingData = [
  { id: 1, title: "야구는 나쁜놈이 잘한다", step: "1단계", progress: 70, amount: 200000 },
  { id: 2, title: "야구는 나쁜놈이 잘한다", step: "1단계", progress: 100, amount: 500000 },
  { id: 3, title: "야구는 나쁜놈이 잘한다", step: "1단계", progress: 340, amount: 1000000 },
  { id: 4, title: "야구는 나쁜놈이 잘한다", step: "1단계", progress: 10, amount: 40000 },
];

const FundingBookListAll = () => {
  return (
    <ListContainer>
      {fundingData.map((item) => (
        <FundingCard key={item.id}>
          <BookImage>
            <Image src="/image/book.svg" alt="Book Cover" width={106} height={130} />
          </BookImage>
          <Info>

            <MetaContainer>
              <Author>한교동짬뽕</Author>
              <Remaining>20일 남음</Remaining>
            </MetaContainer>
            
            <Title>{item.title}</Title>
            <p>{item.step} ⭐</p>

            <Amount>
              <span className="progress">{item.progress}%</span>
              <span>{item.amount.toLocaleString()}원</span>
            </Amount>

            <ProgressBar progress={item.progress} />
          </Info>
        </FundingCard>
      ))}
    </ListContainer>
  );
};

export default FundingBookListAll;
