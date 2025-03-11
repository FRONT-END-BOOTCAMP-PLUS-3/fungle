import Link from "next/link";
import { ProfileNovelItem } from "./ProfileNovelList.styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LikedNovelDto } from "@/application/usecases/novel/dto/LikedNovel";

const LikedNovelList = () => {
  const [novels, setNovels] = useState<LikedNovelDto[]>([]);

  useEffect(() => {
    const fetchNovelData = async () => {
      const response = await fetch("/api/user/novel/liked", {
        method: "GET",
      });

      const data = await response.json();

      setNovels(data.novels);
    };

    fetchNovelData();
  }, []);

  return (
    <div>
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
