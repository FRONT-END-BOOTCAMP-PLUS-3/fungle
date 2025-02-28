"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import { Wrapper, Form, CoverUpload, ButtonWrapper, CreateLabel, CoverImage } from "./CreatePage.styled";
import { GENRES } from "@/constants/GENRES";
import { SERIAL_DAY } from "@/constants/SERIAL_DAY";
import Button from "@/components/button/Button";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string | string[]>("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleGenreSelect = (value: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(value)) {
        return prev.filter((genre) => genre !== value);
      } else if (prev.length < 5) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateNovel = async () => {
    if (!title || !description || !selectedGenres.length || !selectedSchedule) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newNovelId = "123456"; // 실제 API에서 생성된 novelId를 받아와야 함
    router.push(`user/novel/serialize/${newNovelId}`);
  };

  const handleCoverClick = () => {
    document.getElementById('cover-upload')?.click();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Wrapper>
      <Form>
        <CreateLabel>책 표지</CreateLabel>
        <CoverUpload onClick={handleCoverClick}>
          <input type="file" accept="image/*" onChange={handleCoverUpload} id="cover-upload" />
          {!coverImage ? (
            <div>
              <Image src="/icon/plus.svg" alt="plus book cover" width={30} height={40} />
            </div>
          ) : (
            <CoverImage src={coverImage} alt="Book cover preview" />
          )}
        </CoverUpload>
        <Input label="책 제목" placeholder="제목을 입력해주세요." value={title} onChange={handleTitleChange} />
        <Input label="책 소개" placeholder="책 내용을 소개해주세요." value={description} onChange={handleDescriptionChange} />
        <CreateLabel>
          장르 <span className="genre-max-select">(최대 5개 선택 가능)</span>
        </CreateLabel>
        <Dropdown options={GENRES} onSelect={handleGenreSelect} selected={selectedGenres} />
        <CreateLabel>
          연재일 <span className="genre-max-select">정하신 날짜는 변경이 불가능 합니다.</span>
        </CreateLabel>
        <Dropdown options={SERIAL_DAY} onSelect={setSelectedSchedule} selected={selectedSchedule} />
        <ButtonWrapper>
          <Button fontSize="small" buttonSize="small" backgroudColor="primary" onClick={handleCreateNovel}>
            새 시리즈 만들기
          </Button>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

export default Page;
