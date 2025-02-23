import Link from "next/link";
import Image from "next/image";
import { 
  NovelHeader, 
  EpisodeItem, 
  Badge, 
  UploadInfo, 
  StatusSection,
  GradientWrapper,
  AuthorSection
} from "@/app/user/novel/[novelId]/NovelIdPage.styled";
import { SERIAL_DAY } from "@/constants/SERIAL_DAY";
import { SERIAL_STATUS } from "@/constants/STATUS";
import { GENRES } from "@/constants/GENRES";

interface PageProps {
  params: { novelId?: string };
}

//fetch를 통한 DB 호출 후 비동기 로직 처리로 변경 예정 
const Page = async ({ params }: PageProps) => {
  const { novelId } = await Promise.resolve(params);
  
  // DB 연결 후 삭제될 임시 데이터
  const novel = {
    title: "야구는 나쁜놈이 잘한다",
    categories: ["sports", "growth"],
    likes: "230",
    description:
      '"자신 없습니다, 물론 물론 못할 자신이요." 제 잘난 맛에 사는 악마의 재능, 좌완 파이어볼러의 이영광, 억울한 학폭 논란에 휩싸이다! "이번 생을 망한 건가?" 다음 생에 야구를 더 절실히 하겠다는 생각을 한 순간, 고2, 야구부 시절로 회귀했다.',
    profile: "/image/profile.svg",
    author: "한교동짬뽕",
    authorDescription: "나오는 소설마다 베스트셀러! 코믹 소설의 대가 한교동짬뽕",
    totalEpisodes: "24화",
    uploadDay: "tuesday",
    status: "ongoing",
    episodes: [
      { id: 1, title: "야구는 나쁜놈이 잘한다 001화", date: "2024.12.12", thumbnail: "/image/book.svg" },
      { id: 2, title: "야구는 나쁜놈이 잘한다 002화", date: "2024.12.19", thumbnail: "/image/book.svg" },
      { id: 3, title: "야구는 나쁜놈이 잘한다 003화", date: "2024.12.26", thumbnail: "/image/book.svg" },
      { id: 4, title: "야구는 나쁜놈이 잘한다 004화", date: "2025.01.03", thumbnail: "/image/book.svg" },
      { id: 5, title: "야구는 나쁜놈이 잘한다 005화", date: "2025.01.10", thumbnail: "/image/book.svg" },
    ],
  };

  const serialDayLabel =
    SERIAL_DAY.find(day => day.value === novel.uploadDay)?.label || "미정";

  const serialStatusLabel =
    SERIAL_STATUS.find(status => status.value === novel.status)?.label || "미정";

  const categoryLabels = novel.categories.map(category =>
    GENRES.find(genre => genre.value === category)?.label || category
  );

  return (
    <div>
      <GradientWrapper>
        <StatusSection>
          <Badge>{serialStatusLabel}</Badge>
          <span className="footer">{novel.author}</span>
        </StatusSection>

        <NovelHeader>
          <Image src="/image/book.svg" alt={novel.title} width={196} height={280} />
          <div className="info">
            <div className="categories">
              {categoryLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <h3>{novel.title}</h3>

            <UploadInfo>
              <div>
                <Image src="/icon/episode.svg" alt="총 화수" width={30} height={30} />
                {novel.totalEpisodes}
              </div>
              <div>
                <Image src="/icon/upload.svg" alt="업로드 요일" width={30} height={20} />
                {serialDayLabel}
              </div>
              <div>
                <Image src="/icon/heart.svg" alt="좋아요" width={30} height={30} />
                {novel.likes}
              </div>
            </UploadInfo>

            <p className="body1">{novel.description}</p>
          </div>
        </NovelHeader>
      </GradientWrapper>

      <AuthorSection>
        <Image 
        src={novel.profile} 
        alt={novel.author} 
        width={150} 
        height={150} 
        className="author-image" />
        <div className="author-info">
          <span className="author-name">{novel.author}</span>
          <span className="author-description">{novel.authorDescription}</span>
        </div>
      </AuthorSection>

      <div>
        {novel.episodes.map((episode) => (
          <EpisodeItem key={episode.id}>
            <Link href={`/user/novel/${novelId}/${episode.id}`} passHref>
              <Image
                src={episode.thumbnail}
                alt={episode.title}
                width={80}
                height={80}
                className="episode-img"
              />
            </Link>

            <div className="episode-info">
              <Link href={`/user/novel/${novelId}/${episode.id}`} passHref>
                <p className="episode-title">
                  {episode.title}
                </p>
              </Link>
              <p className="episode-date">{episode.date}</p>
            </div>
          </EpisodeItem>
        ))}
      </div>
    </div>
  );
};

export default Page;
