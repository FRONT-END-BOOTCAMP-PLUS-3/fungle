import Link from "next/link";
import { ProfileNovelItem } from "./ProfileNovelList.styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LikedNovelDto } from "@/application/usecases/novel/dto/LikedNovel";
import { ErrorMessage } from "./PostAndLikedListWrapper.styled";

const LikedNovelList = () => {
  const [novels, setNovels] = useState<LikedNovelDto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNovelData = async () => {
      try {
        const response = await fetch("/api/user/novel/liked", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
        } else {
          if (!data.novels || data.novels.length === 0) {
            setError("좋아요를 누른 소설이 없습니다.");
          } else {
            setNovels(data.novels);
          }
        }
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "좋아요 누른 소설 목록을 조회하는 중 오류가 발생했습니다."
        );
      }
    };

    fetchNovelData();
  }, []);

  return (
    <div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {novels.map((novel) => (
        <div key={novel.id}>
          <ProfileNovelItem>
            <div className="novel-wrapper">
              <Image
                src={novel.image || "/image/book.svg"}
                alt={novel.title}
                width={80}
                height={80}
                className="episode-img"
              />
              <div className="novel-title-status">
                <div className="episode-info">
                  <div className="novel-title">
                    <Link href={`/user/novel/${novel.id}`} passHref>
                      <p className="episode-title">{novel.title}</p>
                      <p className="author-nickname">{novel.nickname}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ProfileNovelItem>
        </div>
      ))}
    </div>
  );
};

export default LikedNovelList;
