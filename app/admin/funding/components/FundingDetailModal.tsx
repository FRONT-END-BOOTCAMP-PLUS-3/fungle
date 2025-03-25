import Modal from "@/components/modal/Modal";
import {
  ButtonWrapper,
  ModalContentWrapper,
} from "../../novel/AdminNovelPage.styled";
import { FindAllFundingWithNovelDto } from "@/application/usecases/funding/dto/FindAllFundingWithNovel";
import FundingRejectionButton from "./FundingRejectionButton";
import FundingApproveButton from "./FundingApproveButton";

interface FundingDetailModalProps {
  funding: FindAllFundingWithNovelDto;
}

const FundingDetailModal = ({ funding }: FundingDetailModalProps) => {
  return (
    <Modal>
      <ModalContentWrapper>
        <p>
          <strong>소설 제목: </strong>
          {funding.novelTitle}
        </p>
        <p>
          <strong>작가: </strong>
          {funding.userNickname}
        </p>
        <p>
          <strong>펀딩 신청 단계: </strong>
          {funding.fundingStage}
        </p>
        <p>
          <strong>펀딩 소개: </strong>
          {funding.introduce}
        </p>
        <ButtonWrapper>
          <FundingRejectionButton id={funding.stageId} />
          <FundingApproveButton />
        </ButtonWrapper>
      </ModalContentWrapper>
    </Modal>
  );
};

export default FundingDetailModal;
