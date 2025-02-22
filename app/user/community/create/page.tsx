"use client";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";

import { COMMUNITY_POST } from "@/constants/COMMUNITY_POST_LIST";

import { useState } from "react";
import {
  ButtonBox,
  Main,
  TextAreaWrapper,
} from "./CommunityPostCreatePage.styled";

const Page = () => {
  const [selected, setSelected] = useState(COMMUNITY_POST[0].value);
  return (
    <Main>
      <Input placeholder="제목을 입력해주세요" hideLabel={true} />
      <Dropdown
        options={COMMUNITY_POST}
        onSelect={setSelected}
        selected={selected}
        size="default"
      />
      <TextAreaWrapper>
        <Textarea placeholder="123" height="100%" />
        <ButtonBox>
          <Button backgroudColor={"white"}>취소</Button>
          <Button>작성</Button>
        </ButtonBox>
      </TextAreaWrapper>
    </Main>
  );
};

export default Page;
// defaultValue={`[팀원 모집 내용 예시]
//   - 장르 및 주제
//   - 모집 인원
//   - 모집 분야
//   - 예상 소요 기간
//   - 연락 방법(이메일, 카카오 오픈 방)
//   `}
