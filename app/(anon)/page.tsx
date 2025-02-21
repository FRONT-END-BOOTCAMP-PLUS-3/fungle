"use client";

import Button from "@/components/button/Button";
import * as MC from "./page.styled";

const Page = () => {
  return (
    <MC.Container>
      <MC.Logo src="/logo/FUNGLE.svg" alt="logo" />
      <img src="/logo/Landing Logo.svg" alt="" />
      <Button buttonSize="medium" fontSize="medium">
        시작하기
      </Button>
    </MC.Container>
  );
};

export default Page;
