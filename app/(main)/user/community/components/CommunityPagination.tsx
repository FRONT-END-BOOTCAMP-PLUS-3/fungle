import {
  PaginationButton,
  PaginationList,
  PaginationWrapper,
} from "./CommunityPagination.styled";

interface CommunityPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CommunityPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: CommunityPaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationWrapper aria-label="페이지 네비게이션">
      <PaginationList>
        <li>
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
          >
            &lt;
          </PaginationButton>
        </li>

        {pageNumbers.map((page) => (
          <li key={page}>
            <PaginationButton
              onClick={() => onPageChange(page)}
              $active={currentPage === page}
            >
              {page}
            </PaginationButton>
          </li>
        ))}

        <li>
          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
          >
            &gt;
          </PaginationButton>
        </li>
      </PaginationList>
    </PaginationWrapper>
  );
};

export default CommunityPagination;
