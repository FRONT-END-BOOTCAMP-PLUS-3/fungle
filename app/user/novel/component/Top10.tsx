"use client";

import { ListContainer, ListItem } from "@/app/user/novel/component/Top10.styled";
import Image from "next/image";

const Top10List = () => {
  return (
    <>
      <ListContainer>
        {[1, 2, 3, 4].map((rank, index, array) => (
          <ListItem key={rank} $isLast={index === array.length - 1}>
            <span className="rank">{rank}</span>
            <div className="thumbnail">
            <Image 
              src="/bookCover/1740912955011-jojobook.jpg" 
              alt="소설 썸네일" 
              width={60} 
              height={80} 
              objectFit="cover"
            />
            </div>
            <div className="content">
              <p className="title">야구는 나쁜놈이 잘한다</p>
              <p className="author">한교동짬뽕</p>
              <p className="tags">#로맨스 #액션 #판타지</p>
            </div>
          </ListItem>
        ))}
      </ListContainer>
    </>
  );
};

export default Top10List;
