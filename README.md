# 📖 Fungle: 누구나 웹 소설을 연재할 수 있는 서비스
[Fungle 이용하기](https://fungle.site)
## 📌 프로젝트 개요
**"누구나 웹 소설을 연재할 수 있는 서비스"**<br>
2022년 기준, 웹 소설의 시장 규모는 1조 390억원에 달했습니다. 웹 소설은 빠르게 성장하는 콘텐츠 사업 중 하나이지만, 작가가 정식으로 데뷔할 수 있는 기회는 제한적입니다. 특히, 독자들이 좋아하는 작품을 직접 후원하거나 펀딩 진행 상황을 한 곳에서 확인하기 어려운 문제가 있습니다.
<br><br>
우리는 단순한 연재 플랫폼이 아닌 펀딩 시스템을 통해 작가가 정식 데뷔할 수 있도록 지원하는 새로운 형태의 창작 생태계를 제공하기 위해 **'펀글'** 을 만들었습니다.
## ✨ 기능
### 1️⃣ 누구나 웹 소설 작가가 될 수 있어요! 📝
이제 누구나 손쉽게 웹 소설을 연재하여 작가가 될 수 있습니다.<br>
작품 등록만으로 연재를 시작할 수 있으며, 독자들의 펀딩과 피드백을 받으며 성장할 수 있는 기회를 제공합니다.
<br><br>
✅ **간단한 연재 시스템** - 아이디어가 있는 누구나 손쉽게 소설 업로드 가능<br>
✅ **펀딩을 통한 수익 창출** - 펀딩을 통해 창작 활동 지속 가능<br>
### 2️⃣ 연재 & 펀딩 상태를 동시에 확인해요! 📊
✅ 연재 중인 소설 & 펀딩 진행 현황 확인<br>
✅ 펀딩 목표 달성률 실시간 확인
### 3️⃣ 창작자를 위한 커뮤니티로 함께 성장할 수 있어요 🤝
✅ **기획자, 작가, 디자이너, 편집자 연결** - 창작자들이 협업할 수 있는 공간 제공<br>
✅ **원하는 소설을 직접 의뢰** - 본인이 원하는 작가, 디자이너, 편집자에게 필요한 작업을 쉽게 요청
## 🛠️ 기술 스택
- **프레임워크**: Next.js 15, Typescript, React, Styled-Components
- **개발 언어**: Javascript, HTML, CSS
- **데이터베이스**: Prisma ORM, PostgreSQL
- **상태 관리**: Zustand
- **인증**: JWT
- **아키텍처**: 클린 아키텍처(DTO, Usecase, Repository 패턴 적용)
## 📂 폴더 구조
```plaintext
📦 프로젝트 루트
├── 📂 app             # Next.js 15의 App Router 구조(페이지 & API 핸들러)
├── 📂 application     # UseCase, DTO 등 비즈니스 로직을 담당하는 계층
├── 📂 components      # 공통 컴포넌트
├── 📂 constants       # 프로젝트에서 사용되는 상수 정의
├── 📂 domain          # 인터페이스 정의
├── 📂 infrastructure  # Prisma, DI 컨테이너
├── 📂 prisma          # Prisma ORM 설정 및 마이그레이션 파일
├── 📂 public          # 정적 파일 (이미지, 아이콘 등)
├── 📂 store           # Zustand를 사용한 전역 상태 관리
├── 📂 utils           # 공통적으로 사용하는 유틸리티 함수
└── 📜 README.md       # 프로젝트 설명
```
## 🧑‍🧑‍🧒 프로젝트 구성원
| [정현수(T)](https://github.com/hyun9758)| [김민경](https://github.com/m01310g) | [손혜인](https://github.com/hyein07100) | [빈운기](https://github.com/goorm12) |
| -- | -- | -- | -- |
| <img src="https://avatars.githubusercontent.com/u/82191626?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/162336698?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/130124509?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/170397987?v=4" width="200"> |




## 기능 영상
### 회원가입 & 로그인


### 메인 페이지 


### 소설 책 생성 & 에피소드 등록


### 커뮤니티 리스트


https://github.com/user-attachments/assets/3f92dfa4-7f54-4c87-a69f-a08ce72b7d6b
 ### 커뮤니티 페이지 네이션

https://github.com/user-attachments/assets/5a7330e9-139e-427c-9ae9-80e794052380



### 커뮤니티 작성 & 수정 & 삭제 


https://github.com/user-attachments/assets/e036051d-b0aa-4c99-baea-65052925c28c


### 커뮤니티 댓글 작성 & 수정 & 삭제


https://github.com/user-attachments/assets/10e2689b-bfff-4a90-a8a4-1ff2a5c30c03


### 마이페이지 유저 수정 & 탈퇴
