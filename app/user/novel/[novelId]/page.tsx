import Image from "next/image";
import { 
  NovelHeader, 
  EpisodeItem, 
  Badge, 
  UploadInfo, 
  ProfileSection,
  GradientWrapper,
  AuthorSection
} from "@/app/user/novel/[novelId]/NovelIdPage.styled";

const Page = async ({ params }: { params: { novelId: string } }) => {
  const novel = {
    title: "야구는 나쁜놈이 잘한다",
    categories: ["스포츠", "청춘"],
    likes: "230",
    description:
      '"자신 없습니다, 물론 똑같겠지요." 제 잘난 맛에 사는 악마의 재능, 좌완 파이어볼러의 이행공, 억울한 회장 분노의 헬싸이다 "이번 생을 살만한 건가?" 다음 생에 야구를 더 잘하게 하겠다는 생각을 한 순간, 고2, 야구부 시절로 회귀했다.',
    profile: "/image/profile.svg",
    author: "한교동짬뽕",
    authorDescription: "나오는 소설마다 베스트셀러! 코믹 소설의 대가 한교동짬뽕",
    totalEpisodes: "24화",
    uploadDay: "화요일",
    status: "연재 중",
    episodes: [
      { id: 1, title: "야구는 나쁜놈이 잘한다 001화", date: "2023.12.12", thumbnail: "/image/book.svg" },
      { id: 2, title: "야구는 나쁜놈이 잘한다 002화", date: "2023.12.12", thumbnail: "/image/book.svg" },
      { id: 3, title: "야구는 나쁜놈이 잘한다 003화", date: "2023.12.12", thumbnail: "/image/book.svg" },
      { id: 4, title: "야구는 나쁜놈이 잘한다 004화", date: "2023.12.12", thumbnail: "/image/book.svg" },
      { id: 5, title: "야구는 나쁜놈이 잘한다 005화", date: "2023.12.12", thumbnail: "/image/book.svg" },
    ],
  };

  return (
    <div>

      <GradientWrapper>
        <ProfileSection>
          <Badge>{novel.status}</Badge>
          <span className="footer">{novel.author}</span>
        </ProfileSection>

        <NovelHeader>
          <Image src="/image/book.svg" alt={novel.title} width={196} height={280} className="cover" />
          <div className="info">
            <div className="categories">
              {novel.categories.map((category) => (
                <span key={category}>{category}</span>
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
                {novel.uploadDay}
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
        <Image src={novel.profile} alt={novel.author} width={150} height={150} className="author-image" />
        <div className="author-info">
          <span className="author-name">{novel.author}</span>
          <span className="author-description">{novel.authorDescription}</span>
        </div>
      </AuthorSection>

      <div>
        {novel.episodes.map((episode) => (
          <EpisodeItem key={episode.id}>
            <Image src={episode.thumbnail} alt={episode.title} width={80} height={80} className="episode-img" />
            <div className="episode-info">
              <h3>{episode.title}</h3>
              <span>{episode.date}</span>
            </div>
          </EpisodeItem>
        ))}
      </div>
    </div>
  );
};

export default Page;
