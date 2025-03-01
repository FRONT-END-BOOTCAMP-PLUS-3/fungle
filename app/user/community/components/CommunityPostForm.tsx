"use client";
import Button from "@/components/button/Button";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";
import { RECRUITMENT_FIELDS } from "@/constants/RECRUITMENT_FIELDS";

import { useState } from "react";
import { ButtonBox, TextAreaWrapper, Form } from "./CommunityPostForm.styled";
import { useRouter } from "next/navigation";

const CommunityPostForm = ({ defaultValue }: { defaultValue?: string }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

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
      const response = await fetch("/api/community/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          fields: selectedFields,
        }),
      });

      if (!response.ok) {
        throw new Error("생성 실패");
      }

      const { postId } = await response.json();

      alert("게시글이 생성되었습니다.상세 페이지로 이동합니다.");

      router.push(`/user/community/${postId}`);
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
            defaultValue={defaultValue}
          />
          <ButtonBox>
            <Button backgroudColor={"white"}>취소</Button>
            <Button>작성</Button>
          </ButtonBox>
        </TextAreaWrapper>
      </Form>
    </>
  );
};

export default CommunityPostForm;
