# Supabase 데이터베이스 연결 절차

Neon 대신 Supabase로 PostgreSQL을 쓰는 경우 아래 순서대로 진행하세요.

---

## 1단계: Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속 후 **Sign in** (GitHub 등으로 로그인)
2. **New project** 클릭
3. **Organization** 선택 (없으면 Create new organization)
4. 입력:
   - **Name**: 예) `fungle`
   - **Database Password**: DB 비밀번호 (꼭 저장해 두기, 나중에 연결 문자열에 사용)
   - **Region**: 가까운 리전 선택 (예: Northeast Asia - Seoul)
5. **Create new project** 클릭 → 프로비저닝 완료될 때까지 대기 (1~2분)

---

## 2단계: 연결 문자열(Connection String) 복사

1. 왼쪽 메뉴 **Project Settings** (톱니바퀴) 클릭
2. **Database** 메뉴 클릭
3. **Connection string** 섹션으로 내려가기
4. **URI** 탭 선택
5. **Connection pooling** 사용 (Vercel/서버리스에 적합):
   - **Use connection pooling** 체크
   - **Session mode** 또는 **Transaction mode** 중 하나 선택 (Transaction 권장)
   - 표시되는 URI 복사  
     형식 예:  
     `postgresql://postgres.[프로젝트-ref]:[YOUR-PASSWORD]@aws-0-[리전].pooler.supabase.com:6543/postgres`
6. 복사한 URI에서 **`[YOUR-PASSWORD]`** 부분을 1단계에서 만든 **Database Password**로 바꿔서 한 줄로 완성  
   예:  
   `postgresql://postgres.abcdefgh:내비밀번호@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true`

**직접 연결(Direct connection)이 필요할 때 (마이그레이션 등):**

- 같은 Database 화면에서 **Connection string** → **URI** (풀링 아님) 선택
- 포트 **5432** 주소 복사 후 `[YOUR-PASSWORD]`만 비밀번호로 교체  
  예:  
  `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

---

## 3단계: .env.local에 DATABASE_URL 넣기

1. 프로젝트 **루트**에 `.env.local` 파일 열기 (없으면 생성)
2. 아래 한 줄 추가 또는 기존 `DATABASE_URL` 수정 (실제 복사한 문자열로 교체):

```env
DATABASE_URL="postgresql://postgres.xxxx:비밀번호@aws-0-리전.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

- 비밀번호에 특수문자(`@`, `#`, `:` 등)가 있으면 **따옴표로 감싸기**
- Supabase에서 복사한 그대로 붙여넣고, `[YOUR-PASSWORD]`만 비밀번호로 바꾸면 됨

---

## 4단계: Prisma가 DATABASE_URL을 읽도록 하기

Prisma CLI는 **`.env`**만 읽습니다. `.env.local`만 있으면 `npx prisma migrate` 등에서 **Environment variable not found: DATABASE_URL** 에러가 납니다.

**방법 A (권장):** 프로젝트 루트에 `.env` 파일 만들기

- `.env` 파일을 만들고 **DATABASE_URL 한 줄만** 넣기 (3단계와 같은 값):

```env
DATABASE_URL="postgresql://postgres.xxxx:비밀번호@aws-0-리전.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

- `.env`는 이미 `.gitignore`에 있으므로 Git에 올라가지 않음
- Next.js는 `.env` → `.env.local` 순으로 읽어서, `.env.local`이 우선

**방법 B:** 터미널에서 실행할 때마다 변수 지정 (Windows PowerShell)

```powershell
$env:DATABASE_URL="연결문자열"; npx prisma migrate deploy
```

일반적으로 **방법 A**로 `.env`에 `DATABASE_URL`만 넣어 두는 것이 편합니다.

---

## 5단계: 테이블 생성 (마이그레이션)

**풀링 URL로 마이그레이션이 안 되면** 일시적으로 Direct URL 사용:

1. `.env`에 **Direct connection** URL 추가 (Supabase Database → URI 탭, 포트 5432):

```env
# Prisma 마이그레이션용 (직접 연결)
DIRECT_URL="postgresql://postgres:비밀번호@db.xxxxx.supabase.co:5432/postgres"
DATABASE_URL="postgresql://postgres.xxxx:비밀번호@aws-0-리전.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

2. `prisma/schema.prisma`의 `datasource`에 `directUrl` 추가:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

3. 터미널에서 실행 (프로젝트 루트에서):

```bash
npx prisma migrate deploy
```

또는 마이그레이션 파일 없이 스키마만 반영:

```bash
npx prisma db push
```

4. 성공하면 Supabase 대시보드 **Table Editor**에서 테이블이 보여야 함

---

## 6단계: 연결 확인

1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 **http://localhost:3000/api/health** 접속
3. `{"ok":true,"message":"DB 연결 정상"}` 이면 연결 성공

---

## 요약 체크리스트

- [ ] Supabase에서 프로젝트 생성, Database Password 저장
- [ ] Database → Connection string → **Connection pooling** URI 복사
- [ ] `[YOUR-PASSWORD]`를 실제 비밀번호로 바꿔서 연결 문자열 완성
- [ ] `.env.local`에 `DATABASE_URL` 설정 (Next.js용)
- [ ] `.env`에 `DATABASE_URL` 동일하게 설정 (Prisma CLI용)
- [ ] (선택) 마이그레이션 에러 시 `DIRECT_URL` + `directUrl` 추가
- [ ] `npx prisma migrate deploy` 또는 `npx prisma db push` 실행
- [ ] `/api/health`로 연결 확인

---

## Vercel 배포 시

Vercel 대시보드 **Settings → Environment Variables**에  
`DATABASE_URL`을 Supabase **Connection pooling** URL과 동일하게 넣고 배포하면 됩니다.  
(로컬의 `.env.local` / `.env` 값과 동일한 문자열 사용)
