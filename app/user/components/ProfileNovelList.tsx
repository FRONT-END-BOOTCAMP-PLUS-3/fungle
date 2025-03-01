import Link from "next/link";
import Image from "next/image";
import {
  ArrowWrapper,
  ButtonWrapper,
  EpisodeList,
  EpisodeStatus,
  EpisodeWrapper,
  ProfileNovelItem,
} from "./ProfileNovelList.styled";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/button/Button";

const ProfileNovelList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const episodeListRef = useRef<HTMLUListElement>(null);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && episodeListRef.current) {
      episodeListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  return (
    // <EpisodeItem key={episode.id}>
    <div>
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
            <Button buttonSize="small">연재 상태</Button>
            <Button buttonSize="xsmall" backgroudColor="leave">
              삭제
            </Button>
          </ButtonWrapper>
        </div>
      </ProfileNovelItem>

      {isOpen && (
        <EpisodeList ref={episodeListRef}>
          <EpisodeWrapper>
            <li>1화 어쩌구저쩌구</li>
            <EpisodeStatus>검토 대기</EpisodeStatus>
          </EpisodeWrapper>
          <EpisodeWrapper>
            <li>2화 짱이 될테야</li>
            <EpisodeStatus>검토 대기</EpisodeStatus>
          </EpisodeWrapper>
          <EpisodeWrapper>
            <li>3화 몽돌키보드 소리 좋네요..</li>
            <EpisodeStatus>검토 대기</EpisodeStatus>
          </EpisodeWrapper>
        </EpisodeList>
      )}
    </div>
  );
};

export default ProfileNovelList;
