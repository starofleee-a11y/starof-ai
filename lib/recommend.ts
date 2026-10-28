// 자동화 진단의 플랜 추천 규칙. 클로드가 답할 때도 같은 기준을 프롬프트로 넘기고, 키가 없거나 실패하면 이 규칙이 직접 답해요.
//
//  - study      : 개인이 클로드 코드 설치·기초·자동화 실습을 직접 해보고 싶을 때
//  - consulting : 업무 자동화를 고도화하고 싶거나, 개인 과외처럼 1:1로 배우거나, 컨설턴트가 다 셋팅해 주길 바랄 때
//  - enterprise : 기업·조직 단위의 강의·컨설팅·개발 문의
import type { ProductId } from "./products";

export const PLAN_CRITERIA: Record<ProductId, string> = {
  study: "개인이 클로드 코드 설치·기초 사용법·자동화 실습을 '직접 배워서' 해보고 싶을 때. 설치/입문/처음/배우고 싶다/스터디/강의 듣고 싶다 같은 신호.",
  consulting: "개인·소규모가 이미 하는 업무를 자동화로 '고도화'하고 싶거나, 1:1 과외처럼 집중해서 배우고 싶거나, 컨설턴트가 대신 만들어·셋팅해 주길 바랄 때. 구체적인 반복 업무를 적은 경우의 기본값.",
  enterprise: "회사·조직·팀·부서·임직원 단위의 강의, 워크숍, AX 컨설팅, 사내 시스템·SaaS 개발 문의. 여러 사람이 함께 쓰는 도입이면 여기.",
};

const ENTERPRISE = [
  [/(전사|조직|회사 전체|팀 전체|임직원|전 ?직원|직원들|부서|사내|우리 회사|저희 회사|당사|법인|기업)/g, 3],
  [/(워크숍|워크샵|출강|사내 교육|직원 교육|기업 강의|단체|세미나)/g, 3],
  [/(시스템 개발|saas|사스|솔루션 개발|개발 문의|개발 의뢰|구축 의뢰|플랫폼|erp|crm 구축)/g, 2],
  [/(도입|내재화|전환|ax)/g, 1],
] as const;
const CONSULTING = [
  [/(대신 (만들|해|구축|셋팅|세팅)|만들어 ?주|구축해 ?주|셋팅해 ?주|세팅해 ?주|해 ?주셨으면|해주세요|맡기|맡길|대행|의뢰)/g, 3],
  [/(과외|1 ?: ?1|일대일|개인 레슨|집중 코칭|코칭)/g, 3],
  [/(고도화|더 자동화|확장|연결하고|연동|붙이고|업그레이드|최적화|개선)/g, 2],
  [/(자동화하고 싶|자동화 하고 싶|자동화했으면|줄이고 싶|없애고 싶|매주|매일|반복)/g, 1],
] as const;
const STUDY = [
  [/(설치|세팅이 안|셋팅이 안|터미널|권한|막혀|막혔|오류가 나|에러가 나)/g, 3],
  [/(처음|입문|초보|기초|기본|왕초보|아무것도 몰라|코딩을 몰라|개발을 몰라)/g, 3],
  [/(배우고 싶|배워서|익히고|공부|실습|연습|스터디|강의 듣|수업|직접 만들어 보|직접 해 ?보)/g, 2],
  [/(어떻게 쓰|사용법|뭐부터|어디서부터|시작)/g, 1],
] as const;

function score(t: string, rules: readonly (readonly [RegExp, number])[]) {
  return rules.reduce((sum, [re, w]) => sum + (t.match(re)?.length ?? 0) * w, 0);
}

export interface Pick {
  plan: ProductId;
  reason: string;
  scores: Record<ProductId, number>;
}

/** 키워드 가중치로 플랜 하나를 고르고, 왜 그 플랜인지 한 문장으로 설명해요. */
export function pickPlan(task: string): Pick {
  const t = task.toLowerCase();
  const scores = { enterprise: score(t, ENTERPRISE), consulting: score(t, CONSULTING), study: score(t, STUDY) };
  let plan: ProductId;
  if (scores.enterprise >= 3 && scores.enterprise >= scores.consulting && scores.enterprise >= scores.study) plan = "enterprise";
  else if (scores.study > scores.consulting) plan = "study";
  else if (scores.consulting > 0 || scores.study === 0) plan = "consulting";
  else plan = "study";

  const reason =
    plan === "enterprise"
      ? "여러 사람이 함께 쓰는 조직 단위 요청이라, 교육부터 시스템 구축까지 기업 AX로 설계하는 게 가장 빨라요."
      : plan === "study"
        ? "설치와 기초부터 직접 해보고 싶으신 흐름이라, 셋팅을 같이 끝내고 3주 안에 내 업무 자동화를 완성하는 기초 강의가 맞아요."
        : "이미 하고 계신 업무를 자동화로 고도화하는 일이라, 컨설턴트가 범위를 잡고 직접 구축·셋팅하는 1:1 컨설팅이 가장 효율적이에요.";
  return { plan, reason, scores };
}

/** 받침 유무에 따라 을/를 */
const eul = (w: string) => {
  const c = w.charCodeAt(w.length - 1);
  return c >= 0xac00 && c <= 0xd7a3 && (c - 0xac00) % 28 !== 0 ? "을" : "를";
};

/** 업무 문장에서 보이는 도구·입출력을 뽑아, 자동화 3단계를 그 업무에 맞게 적어요. 설치·기초가 목표인 분께는 배우는 순서를 적어요. */
export function describeHow(task: string, plan?: ProductId): { hasIO: boolean; headline: string; how: string[] } {
  const t = task.toLowerCase();
  const tools: string[] = [];
  if (/(엑셀|시트|스프레드|csv|표)/.test(t)) tools.push("엑셀·시트");
  if (/(메일|이메일|gmail|아웃룩)/.test(t)) tools.push("메일");
  if (/(슬랙|slack|카톡|카카오|메신저|문자)/.test(t)) tools.push("슬랙·메신저");
  if (/(노션|notion|위키|문서)/.test(t)) tools.push("노션·문서");
  if (/(공고|사이트|홈페이지|크롤|수집|검색|뉴스|경쟁사|인스타|유튜브|블로그|sns)/.test(t)) tools.push("웹 수집");
  if (/(보고서|리포트|주간|월간|결산|정산|회의록|요약)/.test(t)) tools.push("보고서");
  if (/(견적|발주|계약|청구|세금계산서|영수증|정산)/.test(t)) tools.push("견적·정산 문서");
  const hasIO = tools.length > 0 || /(정리|취합|데이터|알림|게시|업로드|입력|분류|발송|전송)/.test(t);
  if (plan === "study" && !hasIO) {
    return {
      hasIO,
      headline: "네, 설치부터 같이 하면 바로 시작할 수 있어요.",
      how: [
        "설치·터미널·권한 셋팅을 1회차에 같이 끝내요.",
        "작은 반복 업무 하나로 스킬·커넥터·루틴을 직접 만들어 봐요.",
        "3주 뒤 내 업무 자동화를 완성해서 발표해요.",
      ],
    };
  }
  const src = tools.length ? `${tools.slice(0, 2).join("·")}에서 ` : "";
  const link = tools.length ? tools.slice(0, 3).join("·") : "메일·슬랙·시트";
  return {
    hasIO,
    headline: hasIO ? "네, 입력과 결과물이 분명한 반복 업무라 자동화할 수 있어요." : "규칙을 조금 더 정하면 자동화할 수 있어요. 커피챗에서 범위를 같이 잡아드릴게요.",
    how: [
      `${src}들어오는 입력과 마지막에 나가야 할 결과물을 한 줄로 정해요.`,
      `클로드 코드 스킬로 수집 → 정리 → 초안 작성을 한 번에 묶고, 커넥터로 ${link}${eul(link)} 연결해요.`,
      "루틴으로 정해진 시간에 자동 실행하고, 사람은 예외만 확인하도록 넘겨요.",
    ],
  };
}
