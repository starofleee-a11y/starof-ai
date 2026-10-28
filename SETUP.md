# Star of AI 웹사이트 설정 가이드

코딩 없이, 서비스 가입하고 키를 복사해서 Vercel에 붙여넣는 것만으로 끝나요. 키는 모두 **Vercel → starof-ai 프로젝트 → Settings → Environment Variables** 에 넣고, 넣은 뒤에는 **Deployments → 최신 배포 → Redeploy** 를 한 번 눌러주세요.

키를 하나도 안 넣어도 사이트는 정상으로 열려요. 해당 기능만 조용히 건너뜁니다.

---

## 1. 도메인 starof-ai.com 연결 (5분)

1. Vercel → starof-ai 프로젝트 → **Settings → Domains**
2. `starof-ai.com` 입력 → Add (도메인이 없으면 이 화면에서 바로 구매 가능, 약 $11/년)
3. `www.starof-ai.com`도 추가하고, 둘 중 하나를 다른 쪽으로 Redirect 설정

Vercel에서 산 도메인은 DNS가 자동이라 몇 분 안에 열려요. 가비아 등 다른 곳에서 샀다면 Vercel이 보여주는 A / CNAME 값을 그 사이트 DNS 설정에 넣으세요.

## 2. 슬랙 알림 (10분) — 결제·문의·PDF 다운로드·커피챗

1. https://api.slack.com/apps → **Create New App → From scratch** → 이름 `Star of AI 알림`, 워크스페이스 `winter-ydk2969`
2. 왼쪽 **Incoming Webhooks** → On → **Add New Webhook to Workspace** → 채널 선택 (C0CCWJ4MRFE 채널)
3. 생성된 `https://hooks.slack.com/services/...` 주소 복사
4. Vercel 환경변수 `SLACK_WEBHOOK_URL` 에 붙여넣기

> Skill Shop 프로젝트에 이미 넣어둔 슬랙 값이 있다면 같은 값을 그대로 복사해 써도 돼요.

## 3. 커피챗 예약 — Cal.com (20분)

줌 링크 자동 생성, 24시간 전 리마인드, 취소·변경 버튼 메일이 모두 Cal.com 기본 기능이에요.

1. https://cal.com 가입 (무료) → 사용자명 예: `starofai`
2. **Apps** → Google Calendar 연결 (겹치는 일정 자동 차단), **Zoom** 설치·로그인
3. **Event Types → New** → 제목 `무료 커피챗`, 30분, URL `coffee-chat`, Location = **Zoom**
4. 같은 이벤트 → **Advanced → Booking questions** → `자동화 고민` (Long text, 필수) 추가
5. **Workflows → New** → 트리거 `Before event starts` 24시간 → 참석자에게 메일 (리마인드). 확인 메일에는 취소·변경 버튼이 기본으로 들어가요.
6. **Availability** 에서 커피챗 가능한 요일·시간 설정
7. Vercel 환경변수 `NEXT_PUBLIC_CAL_LINK` = `starofai/coffee-chat`
8. (슬랙 알림) Cal.com **Settings → Developer → Webhooks → New**
   - Subscriber URL: `https://www.starof-ai.com/api/webhooks/cal`
   - Events: Booking Created, Cancelled, Rescheduled
   - Secret: 아무 긴 문자열 → 같은 값을 Vercel `CAL_WEBHOOK_SECRET` 에

넣기 전에는 사이트에 자체 신청 폼이 나오고, 신청이 오면 슬랙·메일로 알려줘요 (이때 줌 링크는 직접 보내야 해요).

## 4. 결제 — 토스페이먼츠 (가입 10분 + 심사 며칠)

1. https://www.tosspayments.com → 회원가입 → 사업자(대기만성) 정보로 **전자결제 신청**
2. 심사 완료 후 **개발자센터 → API 키 → 결제위젯 연동 키** 에서
   - 클라이언트 키 `live_gck_...` → `NEXT_PUBLIC_TOSS_CLIENT_KEY`
   - 시크릿 키 `live_gsk_...` → `TOSS_SECRET_KEY`
3. 개발자센터 **결제위젯 → 결제 UI 설정** 에서 카드·간편결제 등 노출할 수단 선택

키를 넣기 전에는 토스 공식 테스트 키로 동작해요. 결제창이 열리고 테스트 결제까지 되지만 실제 돈은 나가지 않아요 (화면에 '테스트 모드' 표시).

## 5. 메일 알림 — Resend (10분)

기업 문의와 결제 완료를 메일로도 받고, 고객에게 접수 확인 메일을 보내요.

1. https://resend.com 가입 (무료 월 3,000통) → **API Keys → Create** → `RESEND_API_KEY`
2. `OWNER_EMAIL` = `starofleee@gmail.com` (알림 받을 주소)
3. 고객에게도 메일을 보내려면 **Domains → Add `starof-ai.com`** → 안내되는 DNS 레코드 추가 → 인증 후 `MAIL_FROM` = `Star of AI <hello@starof-ai.com>`

도메인 인증 전에는 내 메일(가입한 주소)로 오는 알림만 발송돼요.

---

## 알림이 오는 곳 정리

| 고객 행동 | 슬랙 | 내 메일 | 고객 메일 |
| --- | --- | --- | --- |
| 커피챗 예약 (Cal.com) | ✅ | Cal.com이 발송 | Cal.com이 줌 링크·리마인드·취소 버튼 발송 |
| 1화 교안 / 셋팅 가이드 PDF 다운로드 | ✅ | | |
| 스터디·셋팅 대행 결제 | ✅ | ✅ | ✅ 결제 완료 안내 |
| 기업 문의 · 직접 문의 | ✅ | ✅ | |

## 내용 고치기

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 가격, 단체 할인율, 상품 설명 | `lib/products.ts` |
| 강의 이력, 자동화 사례, 후기, 숫자 | `lib/proof.ts` |
| 연락처, 하단 Skill Shop · AI BAMTI 링크 | `lib/site.ts` |
| 무료 PDF | `public/downloads/` |
