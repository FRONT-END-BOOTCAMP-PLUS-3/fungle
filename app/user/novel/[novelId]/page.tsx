import Link from "next/link";
import Image from "next/image";
import { DfNovelUseCase } from "@/application/usecases/novel/DfNovelUsecase";
import { PrNovelRepository } from "@/infrastructure/repositories/PrNovelRepostiory";
import { GradientWrapper, NovelHeader, StatusSection, Badge, UploadInfo, AuthorSection, EpisodeItem } from "./NovelIdPage.styled";

interface PageProps {
  params: { novelId?: string };
}

const MOCK_EPISODES = [
  { id: 1, title: "야구는 나쁜놈이 잘한다 001화", date: "2024.12.12", thumbnail: "/image/book.svg" },
  { id: 2, title: "야구는 나쁜놈이 잘한다 002화", date: "2024.12.19", thumbnail: "/image/book.svg" },
  { id: 3, title: "야구는 나쁜놈이 잘한다 003화", date: "2024.12.26", thumbnail: "/image/book.svg" },
  { id: 4, title: "야구는 나쁜놈이 잘한다 004화", date: "2025.01.03", thumbnail: "/image/book.svg" },
  { id: 5, title: "야구는 나쁜놈이 잘한다 005화", date: "2025.01.10", thumbnail: "/image/book.svg" },
];

const MOCK_TOTAL_EPISODES = "24화";
const MOCK_LIKES = "230";

export default async function Page({ params }: PageProps) {
  const novelId = params.novelId ? parseInt(params.novelId, 10) : NaN;
  if (isNaN(novelId)) return <p>잘못된 요청입니다.</p>;

  const novelRepository = new PrNovelRepository();
  const getNovelByIdUseCase = new DfNovelUseCase(novelRepository);
  const novel = await getNovelByIdUseCase.execute(novelId);

  if (!novel) return <p>소설을 찾을 수 없습니다.</p>;

  return (
    <div>
      <GradientWrapper>
        <StatusSection>
          <Badge>{novel.serialStatus}</Badge>
          <span className="footer">{novel.author}</span>
        </StatusSection>

        <NovelHeader>
          <Image src={novel.image || "/image/book.svg"} alt={novel.title} width={196} height={280} />
          <div className="info">
            <h3>{novel.title}</h3>
            <UploadInfo>
              <div>
                <Image src="/icon/episode.svg" alt="총 화수" width={30} height={30} />
                {MOCK_TOTAL_EPISODES}
              </div>
              <div>
                <Image src="/icon/upload.svg" alt="업로드 요일" width={30} height={20} />
                {novel.serialDay}
              </div>
              <div>
                <Image src="/icon/heart.svg" alt="좋아요" width={30} height={30} />
                {MOCK_LIKES}
              </div>
            </UploadInfo>
            <p className="body1">{novel.novelIntroduce}</p>
          </div>
        </NovelHeader>
      </GradientWrapper>

      <AuthorSection>
        <Image src="/image/profile.svg" alt={novel.author} width={80} height={80} className="author-image" />
        <div className="author-info">
          <span className="author-name">{novel.author}</span>
        </div>
      </AuthorSection>

      {/* ✅ Mock Data 유지 */}
      <div>
        {MOCK_EPISODES.map((episode) => (
          <EpisodeItem key={episode.id}>
            <Link href={`/user/novel/${novelId}/${episode.id}`} passHref>
              <Image src={episode.thumbnail} alt={episode.title} width={80} height={80} className="episode-img" />
            </Link>
            <div className="episode-info">
              <Link href={`/user/novel/${novelId}/${episode.id}`} passHref>
                <p className="episode-title">{episode.title}</p>
              </Link>
              <p className="episode-date">{episode.date}</p>
            </div>
          </EpisodeItem>
        ))}
      </div>
    </div>
  );
}
