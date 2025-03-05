"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FabContainer, FabButton, FabMenu, FabMenuItem } from "@/app/user/novel/component/FloatingButton.styled";
import Image from "next/image";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 

  return (
    <FabContainer>
      {isOpen && (
        <FabMenu>
          <FabMenuItem onClick={() => router.push("/user/novel/create")}>
            📖 소설 연재
          </FabMenuItem>
          <FabMenuItem onClick={() => router.push("/user/community")}>
            🌐 커뮤니티 리스트
          </FabMenuItem>
        </FabMenu>
      )}
      <FabButton onClick={() => setIsOpen(!isOpen)}>
        <Image 
          src={isOpen ? "/icon/floating_close.svg" : "/icon/write.svg"} 
          alt="플로팅 버튼" 
          width={48} 
          height={48} 
        />
      </FabButton>
    </FabContainer>
  );
};

export default FloatingButton;
