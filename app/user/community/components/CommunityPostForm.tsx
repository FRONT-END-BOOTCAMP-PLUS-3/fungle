"use client";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";

import { useEffect, useState } from "react";
import { ButtonBox, TextAreaWrapper, Form } from "./CommunityPostForm.styled";

type CommunityPostFormProps = {
  mode: "create" | "edit";
  initalTitle?: string;
  initalContent?: string;
  initalSelectedFields?: string[];
  onSubmit: (
    title: string,
    content: string,
    selectedFields: string[]
  ) => Promise<void>;
};

const CommunityPostForm = ({
  mode,
  initalTitle = "",
  initalContent = "",
  initalSelectedFields = [],
  onSubmit,
}: CommunityPostFormProps) => {
  const [selectedFields, setSelectedFields] =
    useState<string[]>(initalSelectedFields);
  const [title, setTitle] = useState<string>(initalTitle);
  const [content, setContent] = useState<string>(initalContent);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setTitle(initalTitle);
    setContent(initalContent);
    setSelectedFields(initalSelectedFields);
  }, [initalTitle, initalContent, initalSelectedFields]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content || selectedFields.length === 0) {
      return alert("모든 값을 입력해주세요");
    }
    try {
      await onSubmit(title, content, selectedFields);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("게시글 생성 에러가 발생했습니다.");
      }
    }
  };

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            label="제목"
            hideLabel={true}
            placeholder="제목을 입력해주세요"
            onChange={handleTitleChange}
            value={title}
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
            defaultValue={content}
          />
          <ButtonBox>
            <Button backgroudColor={"white"}>취소</Button>
            <Button>{mode === "create" ? "작성" : "수정"}</Button>
          </ButtonBox>
        </TextAreaWrapper>
      </Form>
    </>
  );
};

export default CommunityPostForm;
