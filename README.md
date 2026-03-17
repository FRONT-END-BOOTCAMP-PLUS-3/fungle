# 📖 Fungle: 누구나 웹 소설을 연재할 수 있는 서비스

<div align=center>
<h3>"누구나 웹 소설을 연재할 수 있는 서비스"</h3>
2022년 기준, 웹 소설의 시장 규모는 1조 390억원에 달했습니다. 웹 소설은 빠르게 성장하는 콘텐츠 사업 중 하나이지만, 작가가 정식으로 데뷔할 수 있는 기회는 제한적입니다. 특히, 독자들이 좋아하는 작품을 직접 후원하거나 펀딩 진행 상황을 한 곳에서 확인하기 어려운 문제가 있습니다.
<br><br>
우리는 단순한 연재 플랫폼이 아닌 펀딩 시스템을 통해 작가가 정식 데뷔할 수 있도록 지원하는 새로운 형태의 창작 생태계를 제공하기 위해 <strong>'펀글'</strong> 을 만들었습니다.<br>
<!--  <a href="https://fungle.site" target="_blank"><strong>Fungle 이용하러 가기 ➡️</strong></a> -->
</div>

## 🛠️ 기술 스택
- **프레임워크**: ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![Styled-Components](https://img.shields.io/badge/Styled--Components-DB7093?style=flat-square&logo=styled-components&logoColor=white)
- **개발 언어**: ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white)
- **데이터베이스**: ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white)
- **상태 관리**: ![Zustand](https://img.shields.io/badge/Zustand-A37A48?style=flat-square&logo=bear&logoColor=white)
- **인증**: ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20Web%20Tokens&logoColor=white)
- **아키텍처**: 클린 아키텍처(DTO, Usecase, Repository 패턴 적용)

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

## 📺 기능 영상
### 1️⃣ 회원가입 & 로그인
https://github.com/user-attachments/assets/dd0eb116-f429-4040-8506-43eff3d0d4bf

### 2️⃣ 메인 페이지 
https://github.com/user-attachments/assets/be429225-2e59-4624-aee5-ffb37f97ee38

### 3️⃣ 소설 책 생성 & 에피소드 등록
https://github.com/user-attachments/assets/b54db9b7-13a9-42c5-99b4-eaa2355ed7bc

### 4️⃣ 커뮤니티 리스트
https://github.com/user-attachments/assets/3f92dfa4-7f54-4c87-a69f-a08ce72b7d6b

### 5️⃣ 커뮤니티 페이지 네이션
https://github.com/user-attachments/assets/5a7330e9-139e-427c-9ae9-80e794052380

### 6️⃣ 커뮤니티 작성 & 수정 & 삭제 
https://github.com/user-attachments/assets/e036051d-b0aa-4c99-baea-65052925c28c

### 7️⃣ 커뮤니티 댓글 작성 & 수정 & 삭제
https://github.com/user-attachments/assets/10e2689b-bfff-4a90-a8a4-1ff2a5c30c03

### 8️⃣ 마이페이지 유저 수정 & 탈퇴
https://github.com/user-attachments/assets/faaf9c76-4136-44c4-bef3-0e001a2126e0

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
## ‼️ 설치 가이드
1. 저장소 클론
```plaintext
git clone https://github.com/FRONT-END-BOOTCAMP-PLUS-3/fungle.git
```
2. 의존성 설치
```plaintext
npm install
```
3. 실행
```plaintext
npm run dev
```
4. 테스트 로그인
```
fungle0317@gmail.com
fungle123!
```

## 👷 버전 기록
| 버전 | 업데이트 내용 | 업데이트 날짜 |
| :--: | :--: | :--: |
| `v1.0.0` | Fungle 서비스 오픈 | 25.03.14 |

## 🧑‍🧑‍🧒 프로젝트 구성원
| [정현수(T)](https://github.com/hyun9758)| [김민경](https://github.com/m01310g) | [손혜인](https://github.com/hyein07100) | [빈운기](https://github.com/goorm12) |
| -- | -- | -- | -- |
| <img src="https://avatars.githubusercontent.com/u/82191626?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/162336698?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/130124509?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/170397987?v=4" width="200"> |
