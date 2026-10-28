# Star of AI 웹사이트 설정 가이드

코딩 없이, 서비스에 가입하고 키를 복사해서 Vercel에 붙여넣는 것만으로 끝나요. 키는 모두 **Vercel → starof-ai 프로젝트 → Settings → Environment Variables** 에 넣고, 넣은 뒤에는 **Deployments → 최신 배포 → ⋯ → Redeploy** 를 한 번 눌러주세요.

키를 하나도 안 넣어도 사이트는 정상으로 열려요. 해당 기능만 조용히 건너뜁니다.

| 순서 | 할 일 | 걸리는 시간 | 안 하면 |
| --- | --- | --- | --- |
| 1 | 도메인 연결 | 5분 | vercel.app 주소로만 열림 |
| 2 | 슬랙 알림 | 10분 | 신청·문의가 서버 로그에만 남음 |
| 3 | 메일 발송 (Resend) | 10분 | 고객에게 확인·리마인드 메일이 안 감 |
| 4 | 구글 캘린더 연동 | 20분 | 커피챗이 기본 시간표로 보이고, 미팅 링크를 직접 보내야 함 |
| 5 | 결제 (토스페이먼츠) | 가입 10분 + 심사 2~3일 | 테스트 모드. 계좌이체 안내로 대신 가능 |

---

## 1. 도메인 starof-ai.com 연결 (5분)

1. Vercel → starof-ai 프로젝트 → **Settings → Domains**
2. `starof-ai.com` 입력 → **Add**. 같이 추천되는 `www` 리다이렉트 옵션은 그대로 두세요.

Vercel에서 산 도메인이라 DNS가 자동으로 잡혀요. 몇 분 안에 열립니다.

## 2. 슬랙 알림 (10분) — 커피챗·스터디 신청·문의·PDF 다운로드·결제

1. https://api.slack.com/apps → **Create New App → From scratch** → 이름 `Star of AI 알림`, 워크스페이스 `winter-ydk2969`
2. 왼쪽 **Incoming Webhooks** → On → **Add New Webhook to Workspace** → 채널 선택 (C0CCWJ4MRFE)
3. 생성된 `https://hooks.slack.com/services/...` 주소 복사
4. Vercel 환경변수 `SLACK_WEBHOOK_URL` 에 붙여넣기

## 3. 메일 발송 — Resend (10분)

고객에게 커피챗 확정 메일, 하루 전 리마인드, 스터디 신청 확인 메일을 보내고, 나에게도 알림 메일이 와요.

1. https://resend.com 가입 (무료 월 3,000통) → **API Keys → Create** → `RESEND_API_KEY`
2. `OWNER_EMAIL` = `starofleee@gmail.com` (알림 받을 주소)
3. **Domains → Add `starof-ai.com`** → 안내되는 DNS 레코드를 Vercel **Domains → starof-ai.com → DNS Records** 에 추가 → 인증되면 `MAIL_FROM` = `Star of AI <hello@starof-ai.com>`

도메인 인증 전에는 가입한 내 주소로 오는 메일만 발송돼요. 고객 메일까지 보내려면 3번까지 꼭 하세요.

## 4. 구글 캘린더 연동 (20분) — 커피챗 빈 시간 · 미팅 링크 · 리마인드 · 취소

연결하면 이렇게 돌아가요.

- 사이트 커피챗 폼에 **내일부터 14일 동안 내 캘린더(starofleee@gmail.com)에서 비는 시간만** 보여요. 커피챗은 30분이지만 캘린더에는 **1시간 일정**으로 잡혀서 앞뒤 칸까지 자동으로 마감돼요. 시간표 규칙은 `lib/slots.ts`에서 바꿔요 (기본: 평일 10·11·14·15·16·17·20시, 토 14·15·16시).
- 연결 여부는 `https://www.starof-ai.com/api/availability` 를 열어 `"live":true` 인지 보면 돼요. `false`면 아직 키가 안 들어간 거예요.
- 예약하면 캘린더에 일정이 생기고 **구글 미트 링크가 자동 생성**돼서 고객에게 초대 메일과 확정 메일이 가요.
- 매시간 자동으로 **24시간 전 리마인드 메일**이 나가고, 메일의 **예약 취소하기** 버튼을 누르면 캘린더에서 지워지고 슬랙에 알림이 와요.
- 줌을 쓰고 싶으면 `MEETING_LINK` 에 줌 개인 회의실 주소를 넣으세요. 그러면 미트 대신 그 링크가 들어가요.

### 4-1. 구글 클라우드에서 열쇠 만들기

1. https://console.cloud.google.com → 상단 프로젝트 선택 → **새 프로젝트** → 이름 `starof-ai`
2. **API 및 서비스 → 라이브러리** → `Google Calendar API` 검색 → **사용**
3. **API 및 서비스 → OAuth 동의 화면** → External → 앱 이름 `Star of AI`, 내 메일 입력 → 저장. **테스트 사용자**에 `starofleee@gmail.com` 추가
4. **API 및 서비스 → 사용자 인증 정보 → 사용자 인증 정보 만들기 → OAuth 클라이언트 ID** → 유형 **웹 애플리케이션**
   - 승인된 리디렉션 URI: `https://developers.google.com/oauthplayground`
   - 만들어진 **클라이언트 ID** → `GOOGLE_CLIENT_ID`, **클라이언트 보안 비밀** → `GOOGLE_CLIENT_SECRET`

### 4-2. 리프레시 토큰 받기 (한 번만)

1. https://developers.google.com/oauthplayground 접속
2. 오른쪽 위 ⚙️ → **Use your own OAuth credentials** 체크 → 위에서 만든 클라이언트 ID·비밀 입력
3. 왼쪽 목록에서 **Calendar API v3 → `https://www.googleapis.com/auth/calendar`** 선택 → **Authorize APIs** → starofleee@gmail.com 로 로그인·허용
4. **Exchange authorization code for tokens** 클릭 → 나오는 **Refresh token** 복사 → `GOOGLE_REFRESH_TOKEN`

### 4-3. Vercel에 넣기

| 변수 | 값 |
| --- | --- |
| `GOOGLE_CLIENT_ID` | 4-1의 클라이언트 ID |
| `GOOGLE_CLIENT_SECRET` | 4-1의 클라이언트 보안 비밀 |
| `GOOGLE_REFRESH_TOKEN` | 4-2의 리프레시 토큰 |
| `GOOGLE_CALENDAR_ID` | 비워두면 기본 캘린더(starofleee@gmail.com) |
| `CRON_SECRET` | 아무 긴 문자열 (리마인드 자동 실행 보호용) |
| `MEETING_LINK` | (선택) 줌 개인 회의실 주소 |

> OAuth 동의 화면이 '테스트' 상태면 리프레시 토큰이 7일 뒤 만료돼요. **OAuth 동의 화면 → 앱 게시** 를 눌러 '프로덕션'으로 바꾸면 만료되지 않아요. (내 계정만 쓰는 거라 구글 검수는 필요 없어요.)

## 5. 결제 — 토스페이먼츠 (가입 10분 + 심사 2~3일)

지금은 토스 공식 **테스트 키**로 동작해요. 결제창이 열리고 테스트 결제까지 되지만 실제 돈은 나가지 않아요 (화면에 '테스트 모드' 표시). 실제 결제를 받으려면 **사업자등록증**이 필요해요.

1. https://www.tosspayments.com → 회원가입 → 사업자(대기만성) 정보로 **전자결제 신청** (사업자등록증, 통장 사본 업로드)
2. 심사 완료 후 **개발자센터 → API 키 → 결제위젯 연동 키** 에서
   - 클라이언트 키 `live_gck_...` → `NEXT_PUBLIC_TOSS_CLIENT_KEY`
   - 시크릿 키 `live_gsk_...` → `TOSS_SECRET_KEY`
3. 개발자센터 **결제위젯 → 결제 UI 설정** 에서 카드·간편결제 등 노출할 수단 선택

**심사 전에 바로 받고 싶다면** `NEXT_PUBLIC_BANK_ACCOUNT` 에 `카카오뱅크 3333-00-0000000 이경서` 처럼 계좌를 넣으세요. 스터디 신청 완료 화면과 결제 페이지에 계좌이체 안내가 같이 나와요.

---

## 6. 자동화 진단 (히어로 폼) — ANTHROPIC_API_KEY (5분, 선택)

히어로의 "자동화 진단" 폼은 방문자가 적은 업무를 보고 가능 여부·방법·추천 플랜을 바로 답해요.

- 키가 없어도 동작해요: 키워드 규칙으로 답하고, 슬랙·메일로 리드(이름·메일·업무)가 남습니다.
- 키가 있으면 클로드(claude-opus-5-5)가 업무를 읽고 맞춤으로 답해요.
  1. https://console.anthropic.com → API Keys → Create Key
  2. Vercel → Settings → Environment Variables → `ANTHROPIC_API_KEY` 추가 → Redeploy
- 진단 결과는 `/api/diagnose` 응답으로 화면에 표시되고, 같은 내용이 슬랙(2번)과 메일(3번)로도 옵니다.

## 알림이 오는 곳 정리

| 고객 행동 | 슬랙 | 내 메일 | 고객 메일 |
| --- | --- | --- | --- |
| 커피챗 예약 | ✅ | ✅ | ✅ 확정 + 미팅 링크 + 캘린더 초대, 24시간 전 리마인드, 취소 버튼 |
| 스터디 신청 | ✅ | ✅ | ✅ 접수 확인 |
| 1화 교안 / 셋팅 가이드 PDF 다운로드 | ✅ | | |
| 스터디 결제 | ✅ | ✅ | ✅ 결제 완료 안내 |
| 기업 문의 · 직접 문의 | ✅ | ✅ | |

## 내용 고치기

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 가격, 상품 설명 | `lib/products.ts` |
| 스터디 기수·일정·참가비·환급·주의사항 | `lib/study.ts` |
| 커피챗 가능한 요일·시간, 미팅 길이 | `lib/slots.ts` |
| 성과 숫자, AX 사례(문제·해결·성과), 강의 이력, 후기 | `lib/proof.ts` |
| 인스타그램 콘텐츠 카드 (게시물 링크만 적으면 공식 임베드로 표시) | `lib/instagram.ts` |
| AX 사례 캡처 이미지 | `public/images/cases/` 에 넣고 `lib/proof.ts`의 `image`에 경로 |
| 연락처, 메뉴 이름, Skill Shop · AI BAMTI 링크 | `lib/site.ts` |
| 무료 PDF | `public/downloads/` |
| 대표 사진 · 강의 사진 | `public/images/` |
