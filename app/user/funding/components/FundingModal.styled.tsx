import styled from "styled-components";

// 화면 전체 덮는 오버레이 (뒷배경)
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: flex-end; /* 하단 정렬 */
`;

// 실제 모달 컨테이너
export const ModalContainer = styled.div`
  width: 100%;
  max-width: 24rem;
  /* max-height: 15rem;  <-- 제거하여 내용이 잘리지 않도록 */
  background-color: var(--white-color);
  border-radius: 1rem 1rem 0 0;
  padding: 1.5rem;
  position: relative;
`;

// 닫기 버튼 (우측 상단 'X')
export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--primary-color);
`;

// 모달 제목
export const Title = styled.h4``;

// 펀딩 금액 표시
export const FundingAmount = styled.div`
  font-size: 1.875rem;
`;

// 안내 문구
export const Description = styled.p`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  color: #555;
`;

// 금액 입력 필드
export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 0.06rem solid #ccc;
  border-radius: 0.6rem;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

// 구분선
export const Divider = styled.div`
  background-color: #eee;
  margin: 0.8rem 0;
  height: 0.06rem;
`;

// 버튼 감싸는 박스
export const PayButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

// 추가 금액 안내
export const DetailAmount = styled.p``;
