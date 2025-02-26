import { Content, Title, AuthorInfo, ProfileImage, AuthorDetails, AuthorMeta, CommentWrapper } from '@/app/user/novel/[novelId]/(episode)/[episodeId]/EpisodePage.styled';
import CommentCreate from '@/components/comment/CommentCreate';
import Comment from '@/components/comment/Comment';

const Page = () => {
  const post =  {
    id: 1,
    title: "1. 강지한은.... 나쁜 남자니까....",
    status: "published",
    genre: "romance",
    author: "한교동짬뽕",
    content: "소설 내용...",
    time: "2025-02-17",
    likes: 1700,
    views: 120,
    commentCount: 123,
    createdAt: "2025-02-17",
  };

  return (
      <Content>
        <Title>{post.title}</Title>
        <div>나쁜 남자가 끌리는 이유</div>
        <AuthorInfo>
          <ProfileImage src="/image/profile.svg" alt="Author" width={50} height={50} />
          <AuthorDetails>
            <div className='author'>{post.author}</div>
            <AuthorMeta>
              <span>{post.createdAt}</span>
              <span>조회 {post.views}</span>
            </AuthorMeta>
          </AuthorDetails>
        </AuthorInfo>

        <div className='body1'>
          "셋 셀때까지 비켜"
          "...넌 모르겠지.. 사랑하는 사람이 떠나는 그 아픔을.. 니가 어떻게 알아.. 
          사랑이라는거..눈꼽만큼도 모르는 니 따위가.." 
          "하나" 
          ".....나 이제.. 니 여자친구 노릇하면서.. 유빈이 아프게 하는거 싫어.." 
          "둘" 
          "...진짜..헤어지자..." 
          "좋아" 
          앞으로는... 내가 많이 힘들어지겠지..? 
          ...상처도 많이 받을거야...녀석한테... 
          ..그 녀석 때문에..많이 울거고.. 많이 아파할거야.. 
          ......밥도 제대로 못 먹고.. 잠도 제대로 못 잘 때도 많겠지..? 
          .........강지한은.... 나쁜 남자니까..... 
          <br />
          ---------------------------------------
          <br />
          ......여기가......내가 앞으로 다닐 학굔가...? 
          목구멍으로 들어오는 담배연기를 한번 내뱉고는....
          바닥에 던진 담배를 질끈 밟고..학교 교문 안으로 들어섰다
          <br />  
          [한성고] 
          <br />
          학교 한번 더럽게 크네.......
          수업시간이라서 그런지...사람 한 명 없는 한적한 이 운동장...
          평소 습관대로 학교 교실이 아닌 음침한 뒤뜰로 향했다 
          푸르게 펼쳐진 잔디밭 위에 보기좋게 자리잡고 있는 나무벤치가 보인다 
          벤치에 털썩 앉아 고개를 위로 처들고 높은 하늘을 바라보았다 
          아빠..엄마...오늘도..안녕하세요...
          ..근데...뭐야 저것들은...... 
          고개를 약간 돌리니 구석진 곳에 모여있는 교복무리들이 보인다 
          분위기를 보아하니 학교의 어둠의 자식들같기도 하고....  
          그리고...저 무리들 중...낯익은 얼굴... 
          웬수같은 동생 채하놈이다  
          꼬래 동생이라고....신경이 쓰이는건 어쩔 수 없다... 
          한걸음씩 그 무리들에게 다가가다가....벽 모퉁이에 숨고 말았다
          낯익은 얼굴들이 많기 때문이다..
          "지한이형 이기고 싶어요 ^^" 
          "날 이겨보겠다?" 
          지한...? 강지한 말인가..? 
          하도 유명한 녀석이라서 이름은 귀에 딱지가 붙도록 많이 들어봤지.. 
          한성고에서 제일 잘나간다는 강지한이라는 놈.. 
          내가 있던 학교에서까지 유명했던 놈...
          여자애들은 잘생겼다고 입에 단내가 나도록 이름을 불러댔고.. 
          남자애들은 무섭다면서 그 놈의 이름만 들어도 부들부들 떨었다 
          근데...노채하 저 놈은 미쳤나.. 
          그 무섭다는 강지한한테 저렇게 뻐대고 있으면 어떻하냐고!! 
          그때 우리반에 남자놈이 강지한한테 크게 당해서 전치 8주 나왔었는데..
          채하놈아..그냥 잘못했다고 자리에서 싹싹 빌거라..
          "이 새끼 또 시작이야! 그만해 좀!!!" 
          커다란 눈에 블루블랙 머리가 잘 어울리는 저 잘생긴 놈은...낯이 익다.. 
          가만보니 지혜년이 고백했다가 보기좋게 뻥- 차버린 서천우놈이다 
          "그럼 한번 볼까?" 
          위협적으로 피식- 웃어버리는 강지한이라는 저 녀석.. 
          잘생기긴....더럽게 잘생겼네....
        </div>
        <CommentCreate post={post} />
        <CommentWrapper>
          <Comment post={post} />
        </CommentWrapper>
      </Content>
  );
};

export default Page;
