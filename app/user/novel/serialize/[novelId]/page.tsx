"use client";

import Input from "@/components/input/Input";
import Textarea from "@/components/textarea/Textarea";
import Button from "@/components/button/Button";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { useAuth } from "@/hooks/useAuth"; 
import { Container, InputContainer, ButtonContainer } from "@/app/user/novel/serialize/SerializePage.styled";
import NovelCreateCompleted from "../../create/component/NovelCreateCompleted";
import ConfirmationModal from "@/app/user/novel/create/component/ConfirmationModal";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const novelId = params?.novelId ? parseInt(params.novelId as string, 10) : NaN;
  const { user } = useAuth(); 

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isOpen, openModal, onClose } = useModalStore();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [episodeNumber, setEpisodeNumber] = useState<number | null>(null); 

  useEffect(() => {
    openModal();

    if (!isNaN(novelId)) {
      fetchEpisodeNumber(); 
    }
  }, [openModal, novelId]);

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
          userId: user?.userId,  
          episode: episodeNumber, 
          title,
          content,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "게시 중 오류가 발생했습니다.");
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error posting episode:", error);
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
          <ButtonContainer>
            <Button fontSize="medium" buttonSize="medium" backgroudColor="white" onClick={handleCancel} >
              취소
            </Button>
            <Button fontSize="medium" buttonSize="medium" backgroudColor="primary" onClick={handleSubmit} >
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default Page;
