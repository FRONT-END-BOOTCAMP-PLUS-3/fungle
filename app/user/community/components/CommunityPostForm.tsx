"use client";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";

import { useState } from "react";
import { ButtonBox, TextAreaWrapper, Form } from "./CommunityPostForm.styled";

const CommunityPostForm = ({ defautlValue }: { defautlValue?: string }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleSelect = (value: string) => {
    const option = RECRUITMENT_FIELDS.find((option) => option.value === value);
    if (!option) return;

    if (selectedFields.includes(option.value)) {
      setSelectedFields((prev) =>
        prev.filter((value) => value !== option.value)
      );
    } else {
      setSelectedFields((prev) => [...prev, option.value]);
    }
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("title:", title, "content", content);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Input
          label="제목"
          hideLabel={true}
          placeholder="제목을 입력해주세요"
          onChange={handleTitleChange}
        />
      </div>

      <Dropdown
        options={RECRUITMENT_FIELDS}
        onSelect={handleSelect}
        selected={selectedFields}
      />
      <TextAreaWrapper>
        <Textarea
          ariaLabel="게시글 내용"
          onChange={handleChangeContent}
          height="100%"
          defaultValue={defautlValue}
        />
        <ButtonBox>
          <Button backgroudColor={"white"}>취소</Button>
          <Button>작성</Button>
        </ButtonBox>
      </TextAreaWrapper>
    </Form>
  );
};

export default CommunityPostForm;
