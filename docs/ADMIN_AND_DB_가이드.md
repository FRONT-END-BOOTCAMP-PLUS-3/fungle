# 관리자 페이지 및 DB 테이블 구조 가이드

## 1. 관리자 페이지 구조

| 경로 | 설명 | 사용 API |
|------|------|----------|
| `/admin` | 관리자 진입점 (권한 체크 후 리다이렉트) | - |
| `/admin/novel` | 소설 검토 (에피소드 승인/반려) | `GET /api/admin/novel-episode`, `PATCH/DELETE /api/admin/novel-episode/[episodeId]` |
| `/admin/user` | 회원 관리 (목록/삭제) | `GET /api/admin/user`, 삭제 API 연동 |
| `/admin/community` | 커뮤니티 관리 (현재 placeholder) | - |

### 권한
- `user.type === 'admin'` 인 경우에만 `/admin/*` 접근 가능.
- 일반 사용자(`user`)는 `/admin` 접근 시 `/403`으로 리다이렉트.

---

## 2. DB 테이블 구조 (Prisma 기준)

### 핵심 테이블 (관리자 기능과 직결)

| 테이블(모델) | 설명 | 비고 |
|--------------|------|------|
| **user** | 회원 (id, userEmail, nickname, type, introduce, profileImage 등) | `type`: 'user' \| 'admin' |
| **Novel** | 소설 (title, serialDay, novelIntroduce, serialStatus, userId, **bannerImage** 등) | `bannerImage`는 마이그레이션으로 추가 가능 |
| **NovelEpisode** | 에피소드 (novelId, userId, episode, title, content, status, **isFinalEpisode** 등) | `isFinalEpisode`는 마이그레이션으로 추가 가능 |

### 그 외

| 테이블 | 설명 |
|--------|------|
| Funding, FundingStage, FundingUser | 펀딩 (선택 기능, DB에 없을 수 있음) |
| CommunityPost, CommunityComment 등 | 커뮤니티 |
| Genre, NovelGenre, NovelLike, NovelComment 등 | 소설/장르/좋아요/댓글 |

---

## 3. 스키마와 DB 불일치 시 대응

Supabase 등에 이미 테이블이 있는데 Prisma 스키마만 최신인 경우, 아래가 없으면 오류가 날 수 있습니다.

- **novel.bannerImage**  
  → 없으면 배너 노출/저장 시 오류.  
  → **해결**: `scripts/apply-banner-migration.ts` 실행.
- **novelEpisode.isFinalEpisode**  
  → 없으면 에피소드 조회/업데이트 시 오류.  
  → **해결**: 위와 동일 스크립트에 포함됨.
- **Funding / FundingUser / FundingStage**  
  → 없으면 펀딩 조회 시 오류.  
  → **해결**: 해당 리포지토리에서 오류 시 빈 값 반환하도록 방어 코드 적용됨. 필요 시 `npx prisma migrate deploy` 또는 수동으로 테이블 생성.

---

## 4. 마이그레이션 실행 순서

1. **환경 변수**  
   `.env` / `.env.local`에 `DATABASE_URL`, `DIRECT_URL` 설정.

2. **Prisma 마이그레이션**  
   ```bash
   npx prisma migrate deploy
   ```
   (또는 기존 DB에 맞춰 마이그레이션 히스토리 정리 후 적용)

3. **누락 컬럼 추가 (기존 DB 유지 시)**  
   ```bash
   npx ts-node scripts/apply-banner-migration.ts
   ```
   - `novel.bannerImage`  
   - `novelEpisode.isFinalEpisode`  

4. **관리자 계정 설정**  
   Supabase 대시보드 등에서 해당 사용자 행의 `type`을 `'admin'`으로 변경.

---

## 5. 관리자 페이지·API 방어 처리 요약

- **API**
  - `/api/admin/user`: 실패 시에도 200 + `users: []` 반환.
  - `/api/admin/novel-episode`: 실패 시 200 + `data: []` 반환.
- **관리자 페이지**
  - 회원 관리: `data.users` 없거나 비정상 시 `[]`로 설정.
  - 소설 검토: `data.data` 없거나 비배열 시 `[]`로 설정 후 렌더링.
- **리포지토리**
  - Novel, NovelEpisode, User, Funding 관련 조회에서 예외 시 빈 배열/null 반환하도록 try/catch 처리.

이렇게 해두면 테이블/컬럼이 아직 없어도 500 대신 빈 목록으로 동작합니다.
