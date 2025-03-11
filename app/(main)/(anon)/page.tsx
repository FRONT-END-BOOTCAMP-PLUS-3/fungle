"use client";

import Button from "@/components/button/Button";
import * as MC from "./page.styled";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/login");
  };

  return (
    <MC.Container>
      <Image src="/logo/FUNGLE.svg" alt="펀글 로고" width={128} height={128} />
      <Image
        src="/logo/Landing Logo.svg"
        alt="펀글 랜딩 로고"
        width={180}
        height={180}
      />
      <Button buttonSize="medium" fontSize="medium" onClick={handleStart}>
        시작하기
      </Button>
    </MC.Container>
  );
};

export default Page;
