"use client"
import Image from "next/image";
import Button from "@/components/button/Button";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  p{
    margin-bottom: 2.5rem;
  }
`

const ImageContainer = styled.div`
  margin-left: 3.75rem;
  margin-bottom: 1rem;
`

const EmptyBookList = () => {
  const router = useRouter();

  return(
  <Container>
    <ImageContainer>
      <Image src="/image/nobook.svg" alt="등륵된 소설 없음" width={148} height={112} objectFit="cover"/>
    </ImageContainer>
    <p>작성한 소설이 없으시네요! <br/>
    소설을 등록하시겠어요?</p>
    <Button buttonSize="medium" fontSize="big" onClick={()=>{router.push(`/user/novel/create`)}}>소설 등록하기</Button>
  </Container>
  )
}

export default EmptyBookList;