import { novelDi } from "@/infrastructure/config/novelDi";
import NovelCompleted from "@/components/novelcompleted/NovelCompleted";
import {
  AuthorDetails,
  AuthorInfo,
  AuthorMeta,
  Content,
  EpisodeTitle,
  Main,
  ProfileImage,
} from "@/app/(main)/user/novel/[novelId]/(episode)/[episodeId]/EpisodePage.styled";

const Page = async ({
  params: promisedParams,
}: {
  params: Promise<{ novelId: string; episodeId: string }>;
}) => {
  const params = await promisedParams;
  const novelId = parseInt(params.novelId, 10);
  const episodeId = parseInt(params.episodeId, 10);

  if (!novelId || !episodeId) {
    return <p>잘못된 요청입니다.</p>;
  }

  const novel = await novelDi.getNovelByIdUseCase.execute(novelId);
  if (!novel) return <p>소설을 찾을 수 없습니다.</p>;

  const episode = await novelDi.getEpisodeByIdUseCase.execute(episodeId);
  if (!episode) return <p>에피소드를 찾을 수 없습니다.</p>;

  const allEpisodes = await novelDi.getEpisodesByNovelIdUseCase.execute(
    novelId
  );
  const lastEpisodeId =
    allEpisodes.length > 0 ? allEpisodes[allEpisodes.length - 1].id : null;
  const isLastEpisode = episodeId === lastEpisodeId;
  const isCompleted = novel.serialStatus === "완결";

  return (
    <Main>
      <EpisodeTitle>
        {episode.episode}화 {episode.title}
      </EpisodeTitle>
      <div>{novel.title}</div>
      <AuthorInfo>
        <ProfileImage
          src={novel.profile || "/image/profile.svg"}
          alt="Author"
          width={50}
          height={50}
        />
        <AuthorDetails>
          <div className="author">{novel.author}</div>
          <AuthorMeta>
            <span>{episode.createdAt}</span>
            <span>조회 {0}</span>
          </AuthorMeta>
        </AuthorDetails>
      </AuthorInfo>

      <Content>{episode.content}</Content>

      {isCompleted && isLastEpisode && <NovelCompleted title={novel.title} />}
    </Main>
  );
};

export default Page;
