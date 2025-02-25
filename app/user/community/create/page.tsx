import CommunityPostForm from "../components/CommunityPostForm";

const Page = () => {
  return (
    <CommunityPostForm
      defautlValue={`
    [팀원 모집 내용 예시]
    
      - 장르 및 주제 : 
    
      - 모집 인원 : 
    
      - 모집 분야 : 
    
      - 예상 소요 기간 : 
    
      - 연락 방법(이메일, 카카오 오픈 방) : 
    
      - 모집 내용 :
    
    
    광고성 게시글 및 폭력, 혐오, 사회 분열을 조장하는 글은 경고 없이 관리자에 의해 삭제됩니다.
      `}
    />
  );
};

export default Page;
