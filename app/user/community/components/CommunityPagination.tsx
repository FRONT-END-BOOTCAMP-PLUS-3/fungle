import {
  PaginationButton,
  PaginationList,
  PaginationWrapper,
} from "./CommunityPagination.styled";

const CommunityPagination = () => {
  return (
    <PaginationWrapper aria-label="페이지 네비게이션">
      <PaginationList>
        <li>
          <PaginationButton aria-label="이전 페이지">&lt;</PaginationButton>
        </li>

        <li>
          <PaginationButton $active>1</PaginationButton>
        </li>
        <li>
          <PaginationButton>2</PaginationButton>
        </li>
        <li>
          <PaginationButton>3</PaginationButton>
        </li>
        <li>
          <PaginationButton>4</PaginationButton>
        </li>
        <li>
          <PaginationButton>5</PaginationButton>
        </li>
        <li>
          <PaginationButton>6</PaginationButton>
        </li>
        <li>
          <PaginationButton>7</PaginationButton>
        </li>

        <li>
          <PaginationButton aria-label="다음 페이지">&gt;</PaginationButton>
        </li>
      </PaginationList>
    </PaginationWrapper>
  );
};

export default CommunityPagination;
