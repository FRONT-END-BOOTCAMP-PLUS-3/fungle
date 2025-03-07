"use client";

import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import useAuthStore from "@/store/useAuthStore";
import { Container, InputContainer, ButtonContainer, CheckboxContainer } from "@/app/user/novel/serialize/SerializePage.styled";
import NovelCreateCompleted from "../../create/component/NovelCreateCompleted";
import ConfirmationModal from "@/app/user/novel/create/component/ConfirmationModal";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const novelId = params?.novelId ? parseInt(params.novelId as string, 10) : NaN;
  const { user } = useAuthStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isOpen, openModal, onClose } = useModalStore();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [episodeNumber, setEpisodeNumber] = useState<number | null>(null);
  const [isFinalEpisode, setIsFinalEpisode] = useState(false);
  const [serialStatus, setSerialStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    openModal();

    if (!isNaN(novelId)) {
      fetchNovelStatus();
      fetchEpisodeNumber();
    }
  }, [openModal, novelId]);

  const fetchNovelStatus = async () => {
    try {
      const response = await fetch(`/api/novel/${novelId}`);
      if (!response.ok) throw new Error("소설 정보를 불러올 수 없습니다.");

      const data = await response.json();
      setSerialStatus(data.serialStatus);

      if (data.serialStatus === "completed") {
        alert("이 소설은 이미 완결되었습니다. 연재할 수 없습니다.");
        router.push("/user/novel");
      }
    } catch (error) {
      console.error("소설 상태 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodeNumber = async () => {
    try {
      const response = await fetch(`/api/novel/${novelId}/episode`);
      if (!response.ok) throw new Error("에피소드 정보를 불러오는 중 오류가 발생했습니다.");

      const data = await response.json();
      const lastEpisode = data.episodes.length > 0 ? data.episodes[data.episodes.length - 1] : null;
      setEpisodeNumber(lastEpisode ? lastEpisode.episode + 1 : 1);
    } catch (error) {
      console.error("Error fetching episode number:", error);
      setEpisodeNumber(1);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`/api/novel/${novelId}/episode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          episode: episodeNumber,
          title,
          content,
          isFinalEpisode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          alert("에피소드를 추가할 권한이 없습니다.");
        } else if (response.status === 404) {
          alert("해당 소설을 찾을 수 없습니다.");
        } else {
          alert(data.error || "게시 중 오류가 발생했습니다.");
        }
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      alert("에피소드를 게시하는 중 오류가 발생했습니다.");
    }
  };

  const handleModalCancel = () => {
    onClose();
    router.push("/user/novel");
  };

  const handleModalConfirm = () => {
    setIsConfirmed(true);
    onClose();
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (isSubmitted) {
    return <NovelCreateCompleted />;
  }

  return (
    <Container>
      <ConfirmationModal isOpen={isOpen} onClose={handleModalCancel} onConfirm={handleModalConfirm} />
      {isConfirmed && (
        <>
          <InputContainer>
            <Input
              label=""
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={handleTitleChange}
            />
          </InputContainer>
          <Textarea
            ariaLabel="글 작성 칸"
            placeholder="내용을 입력해주세요."
            defaultValue={content}
            onChange={handleContentChange}
          />
          <CheckboxContainer>
            <label>
              <input
                type="checkbox"
                checked={isFinalEpisode}
                onChange={(e) => setIsFinalEpisode(e.target.checked)}
              />
              &nbsp;마지막 에피소드입니다.
            </label>
          </CheckboxContainer>
          <ButtonContainer>
            <Button fontSize="medium" buttonSize="medium" backgroudColor="white" onClick={handleCancel}>
              취소
            </Button>
            <Button fontSize="medium" buttonSize="medium" backgroudColor="primary" onClick={handleSubmit}>
              게시
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default Page;
