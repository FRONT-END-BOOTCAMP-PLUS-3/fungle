"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import Dropdown from "@/components/dropdown/Dropdown";
import Input from "@/components/input/Input";
import {
  Wrapper,
  Form,
  CoverUpload,
  ButtonWrapper,
  CreateLabel,
  CoverImage,
} from "./CreatePage.styled";
import { GENRES } from "@/constants/GENRES";
import { SERIAL_DAY } from "@/constants/SERIAL_DAY";
import Button from "@/components/button/Button";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string | string[]>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const checkUserNovels = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/user/novel`);
        if (!response.ok) throw new Error("사용자 소설 데이터를 가져올 수 없습니다.");

        const data = await response.json();
        const novels = data.novels ?? []; 

        const hasOngoingNovel = novels.some((novel: any) => novel.serialStatus === "ongoing");

        if (hasOngoingNovel) {
          alert("현재 연재 중인 소설이 있습니다. 새로운 소설을 만들 수 없습니다.");
          router.push("/user/novel"); 
        }
      } catch (error) {
        throw new Error("서버 에러");
      }
    };

    checkUserNovels();
  }, [user, router]);

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
      setCoverImage(file);
    }
  };

  const handleCreateNovel = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title || !description || selectedGenres.length === 0 || !selectedSchedule) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genres", JSON.stringify(selectedGenres));
    formData.append("serialDay", selectedSchedule.toString());
    formData.append("userId", user.id);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      const res = await fetch("/api/novel", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`오류 발생: ${errorData.error}`);
        return;
      }

      const data = await res.json();
      const novelId = data.novelId;

      alert("소설 생성이 완료되었습니다! 1화 연재로 넘어갑니다.");
      router.push(`/user/novel/serialize/${novelId}`);
    } catch (error) {
      throw new Error("서버 에러");
    }
  };

  const handleCoverClick = () => {
    document.getElementById("cover-upload")?.click();
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
          <input type="file" accept="image/*" onChange={handleCoverUpload} id="cover-upload" hidden />
          {!coverImage ? (
            <div>
              <Image src="/icon/plus.svg" alt="plus book cover" width={30} height={40} />
            </div>
          ) : (
            <CoverImage src={URL.createObjectURL(coverImage)} alt="Book cover preview" />
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
