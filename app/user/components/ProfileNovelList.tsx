import Link from "next/link";
import Image from "next/image";
import {
  ArrowWrapper,
  ButtonWrapper,
  ProfileNovelItem,
} from "./ProfileNovelList.styled";
import { useState } from "react";
import Button from "@/components/button/Button";

const ProfileNovelList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    // <EpisodeItem key={episode.id}>
    <ProfileNovelItem>
      {/* <Link href={`/user/novel/${novel.id}`} passHref> */}
      <div className="novel-wrapper">
        <Image
          src="/image/book.svg"
          // alt={episode.title}
          alt="소설 제목"
          width={80}
          height={80}
          className="episode-img"
        />
        <div className="episode-info">
          {/* <Link href={`/user/novel/${novel.id}`} passHref> */}
          <Link href={`/user/novel/1`} passHref>
            <p className="episode-title">
              {/* {index + 1}화 {episode.title} */}
              소설 제목
            </p>
          </Link>
          {/* <p className="episode-date">{episode.createdAt}</p> */}
          <p className="episode-date">날짜</p>
        </div>
      </div>
      <div className="novel-manage">
        <ArrowWrapper onClick={toggleOpen} $isOpen={isOpen}>
          <Image
            src={"/icon/dropdown_arrow.svg"}
            alt="소설 검토 상태 확인"
            width={12}
            height={6}
          />
        </ArrowWrapper>
        <ButtonWrapper>
          {" "}
          <Button buttonSize="small">연재 상태</Button>
          <Button buttonSize="small" backgroudColor="leave">
            삭제
          </Button>
        </ButtonWrapper>
      </div>
    </ProfileNovelItem>
  );
};

export default ProfileNovelList;
