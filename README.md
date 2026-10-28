# Star of AI — starof-ai.com

AI 자동화 전문 에이전시 Star of AI의 브랜드 · 마케팅 퍼널 웹사이트.

- **메인** `/` — 에이전시 소개, 대표 소개, 강의·자동화·AX 이력, 무료 커피챗 예약(1차 퍼널), 가격, 후기, Skill Shop · AI BAMTI
- **클로드 코드 스터디** `/study` — 커리큘럼·후기, 1화 교안 PDF 무료 다운로드, 단체 할인 가격, 바로 결제 (2차 퍼널)
- **자동화 셋팅 대행** `/workflow` — 3단계 프로세스, 셋팅 가이드 PDF 무료, 바로 결제 (3차 퍼널)
- **기업 AX** `/enterprise` — 프로그램·이력, 문의 폼 → 메일 + 슬랙 (4차 퍼널)
- **직접 문의** `/contact`, **결제** `/checkout`

## 로컬에서 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 자주 고치는 곳

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 가격 · 단체 할인 · 상품 설명 | `lib/products.ts` |
| 강의 이력 · 자동화 사례 · 후기 · 숫자 | `lib/proof.ts` |
| 연락처 · 인스타 · 하단 프로젝트 링크 | `lib/site.ts` |
| 무료 PDF 파일 | `public/downloads/` |
| 사진 | `public/images/` |

## 연동 설정

`.env.example`과 `SETUP.md`를 보세요. 키가 없어도 사이트는 열리고, 해당 기능만 건너뜁니다.

| 기능 | 서비스 | 키 없을 때 |
| --- | --- | --- |
| 커피챗 예약 · 줌 자동 생성 · 리마인드 · 취소 메일 | Cal.com | 자체 신청 폼 → 슬랙·메일 알림 |
| 결제 | 토스페이먼츠 결제위젯 | 토스 공개 테스트 키로 테스트 결제 |
| 슬랙 알림 | Slack Incoming Webhook | 서버 로그에만 기록 |
| 메일 알림 | Resend | 건너뜀 |
