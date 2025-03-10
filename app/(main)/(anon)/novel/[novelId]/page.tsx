import Link from "next/link";
import Image from "next/image";
import { novelDi } from "@/infrastructure/config/novelDi";
import {
  AuthorSection,
  Badge,
  EpisodeItem,
  GradientWrapper,
  Main,
  NovelHeader,
  StatusSection,
  UploadInfo,
} from "@/app/(main)/user/novel/[novelId]/NovelIdPage.styled";

const Page = async ({
  params: promisedParams,
}: {
  params: Promise<{ novelId?: string }>;
}) => {
  const params = await promisedParams;
  const novelId = params.novelId ? parseInt(params.novelId, 10) : NaN;

  if (isNaN(novelId)) return <p>잘못된 요청입니다.</p>;

  const novel = await novelDi.getNovelByIdUseCase.execute(novelId);
  if (!novel) return <p>소설을 찾을 수 없습니다.</p>;

  const episodes = novel.episodes || [];
  const episodeCount = episodes.length;

  return (
    <Main>
      <GradientWrapper>
        <StatusSection>
          <Badge>{novel.serialStatus}</Badge>
          <span className="footer">{novel.author}</span>
        </StatusSection>

        <NovelHeader>
          <Image
            className="novel-image"
            src={novel.image || "/image/book.svg"}
            alt={novel.title}
            width={196}
            height={280}
          />
          <div className="info">
            <h1>{novel.title}</h1>

            <div className="categories">
              {novel.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>

            <UploadInfo>
              <div>
                <Image
                  src="/icon/episode.svg"
                  alt="총 화수"
                  width={30}
                  height={30}
                />
                {episodeCount}화
              </div>

              <div>
                <Image
                  src="/icon/upload.svg"
                  alt="업로드 요일"
                  width={30}
                  height={20}
                />
                {novel.serialDay}
              </div>

              <div>
                <Image
                  src="/icon/heart.svg"
                  alt="좋아요"
                  width={30}
                  height={30}
                />
                {novel.likeCount}
              </div>
            </UploadInfo>
            <p className="body1">{novel.novelIntroduce}</p>
          </div>
        </NovelHeader>
      </GradientWrapper>

      <AuthorSection>
        <Image
          src={novel.profile || "/image/profile.svg"}
          alt={novel.author}
          width={80}
          height={80}
          className="author-image"
        />
        <div className="author-info">
          <span className="author-name">{novel.author}</span>
          <p className="author-introduce">
            {novel.userIntroduce ?? "소개 없음"}
          </p>
        </div>
      </AuthorSection>

      <div>
        {episodes.map((episode, index) => {
          const date = new Date(episode.createdAt)
            .toISOString()
            .split("T")[0]
            .replaceAll("-", ".");
          return (
            <EpisodeItem key={episode.id}>
              <Link href={`/user/novel/${novelId}/${episode.id}`} passHref>
                <Image
                  src="/image/book.svg"
                  alt={episode.title}
                  width={80}
                  height={80}
                  className="episode-img"
                />
              </Link>
              <div className="episode-info">
                <Link href={`/user/novel/${novelId}/${episode.id}`} passHref>
                  <p className="episode-title">
                    {index + 1}화 {episode.title}
                  </p>
                </Link>
                <p className="episode-date">{date}</p>
              </div>
            </EpisodeItem>
          );
        })}
      </div>
    </Main>
  );
};

export default Page;
