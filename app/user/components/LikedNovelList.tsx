import Link from "next/link";
import { ProfileNovelItem } from "./ProfileNovelList.styled";
import Image from "next/image";

const LikedNovelList = () => {
  return (
    <div>
      {/* {novels.map((novel) => ( */}
      {/* <div key={novel.id}> */}
      <div>
        {/* <ProfileNovelItem key={novel.id}> */}
        <ProfileNovelItem>
          <div className="novel-wrapper">
            <Image
              //   src={novel.image || "/image/book.svg"}
              //   alt={novel.title}
              src={"/image/book.svg"}
              alt={"소설 사진"}
              width={80}
              height={80}
              className="episode-img"
            />
            <div className="novel-title-status">
              <div className="episode-info">
                <div className="novel-title">
                  {/* <Link href={`/user/novel/${novel.id}`} passHref> */}
                  <Link href={"/user/novel/1"} passHref>
                    {/* <p className="episode-title">{novel.title}</p> */}
                    <p className="episode-title">소설 제목</p>
                    <p className="author-nickname">작가 닉네임</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ProfileNovelItem>
      </div>
      {/* ))} */}
    </div>
  );
};

export default LikedNovelList;
