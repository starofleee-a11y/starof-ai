# Star of AI — starof-ai.com

AX 에이전시 Star of AI의 브랜드 · 마케팅 퍼널 웹사이트. "AI 얼리어답터가 되는 지름길."

- **메인** `/` — 히어로, Starters/Workers/Company 소개, 성과(숫자·후기), 대표 소개·인스타그램, 무료 커피챗 예약(구글 캘린더 연동), 가격, 후기, Skill Shop · AI BAMTI
- **자동화 기초 강의** `/study` — 3주 4회 클로드 코드 스터디. 커리큘럼·후기, 1화 교안 PDF, 신청서 → 결제
- **1:1 AX 컨설팅** `/consulting` — 커피챗 → 컨설팅 3회 흐름, AX 프로젝트 사례(문제·해결·성과), 셋팅 가이드 PDF, 무료 커피챗 배너
- **기업 AX** `/enterprise` — 원데이 강의 · AX 컨설팅 · 맞춤 SaaS 개발, 사례·강의 이력, 문의 폼 → 메일 + 슬랙
- **직접 문의** `/contact`, **결제** `/checkout`

## 로컬에서 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 자주 고치는 곳

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 가격 · 상품 설명 | `lib/products.ts` |
| 스터디 기수 · 일정 · 참가비 | `lib/study.ts` |
| 커피챗 가능한 요일·시간 | `lib/slots.ts` |
| 성과 숫자 · AX 사례 · 강의 이력 · 후기 | `lib/proof.ts` |
| 인스타그램 콘텐츠 카드 | `lib/instagram.ts` |
| 연락처 · 메뉴 · 하단 프로젝트 링크 | `lib/site.ts` |
| 무료 PDF 파일 | `public/downloads/` |
| 사진 | `public/images/` |

## 연동 설정

`.env.example`과 `SETUP.md`를 보세요. 키가 없어도 사이트는 열리고, 해당 기능만 건너뜁니다.

| 기능 | 서비스 | 키 없을 때 |
| --- | --- | --- |
| 커피챗 빈 시간 · 구글 미트 링크 · 24시간 전 리마인드 · 취소 | Google Calendar API + Resend | 기본 시간표로 신청 접수 → 슬랙·메일 알림 (링크는 직접 발송) |
| 결제 | 토스페이먼츠 결제위젯 | 토스 공개 테스트 키로 테스트 결제 (+ 계좌이체 안내) |
| 슬랙 알림 | Slack Incoming Webhook | 서버 로그에만 기록 |
| 메일 | Resend | 건너뜀 |
