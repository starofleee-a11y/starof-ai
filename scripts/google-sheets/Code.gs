/**
 * Star of AI 웹사이트 → [Starofai] 고객 주소록 시트 연동 (Google Apps Script)
 *
 * 설치 (한 번만, 약 10분)
 *  1. 시트 열기 → 확장 프로그램 → Apps Script
 *  2. 기본 Code.gs 내용을 지우고 이 파일 전체를 붙여넣기 → 저장
 *  3. 아래 SECRET 을 Vercel 환경변수 SHEETS_SECRET 과 같은 값으로 바꾸기
 *  4. 위쪽 함수 선택에서 setup 을 고르고 ▶ 실행 → 권한 허용
 *     ("강의 신청" 탭 생성, 고객 유형 드롭다운·대시보드에 웹사이트 카테고리 추가)
 *  5. 배포 → 새 배포 → 유형 '웹 앱' → 실행: 나 / 액세스: 모든 사용자 → 배포
 *  6. 나온 웹 앱 URL(https://script.google.com/macros/s/…/exec)을
 *     Vercel 환경변수 SHEETS_WEBHOOK_URL 에 넣고 Redeploy
 *
 * 코드를 고친 뒤에는 배포 → 배포 관리 → ✏️ → 버전 '새 버전' → 배포 (URL은 그대로 유지돼요)
 */

const SECRET = 'CHANGE_ME'; // Vercel SHEETS_SECRET 과 똑같이

const TAB_APPLY = '강의 신청';
const TAB_BOOK = '고객 주소록';
const TAB_DASH = '대시보드';

// 사이트 신청 종류 → 고객 주소록 '고객 유형' 라벨 (대시보드 집계 기준)
const KIND = {
  pdf: { label: '무료 PDF 다운', type: '무료 PDF 다운', color: '#B08968' },
  coffee: { label: '무료 커피챗', type: '커피챗 예약', color: '#6BA8A9' },
  study: { label: '자동화 기초 스터디', type: '스터디 신청', color: '#2E7D4F' },
  oneday: { label: 'AI 콘텐츠 원데이', type: '원데이 신청', color: '#E07A3A' },
  consulting: { label: '1:1 AX 컨설팅', type: '1:1 컨설팅 신청', color: '#5B6CD6' },
  enterprise: { label: '기업 AX 문의', type: '기업 AX 문의', color: '#614215' },
};

// 같은 사람이 다시 신청하면, 더 '진한' 관계일 때만 고객 유형을 바꿔요. (수강생 등 목록에 없는 유형은 그대로 둠)
const RANK = {
  '무료 PDF 다운': 1, '뉴스레터 구독': 1, '클로드 입문 강의': 1, '스킬샵 · 기획': 1, '스킬샵 · 포트폴리오': 1,
  '커피챗 예약': 2,
  '스터디 신청': 3, '원데이 신청': 3, '1:1 컨설팅 신청': 3, '기업 AX 문의': 3, '2기 얼리버드': 3, '스터디 1기 신청': 3,
};

const APPLY_HEADERS = ['신청일시', '구분', '이름', '이메일', '전화번호', '하는 일 · 회사', '신청 내용', '참가비', '지인할인 추천인', '결제 상태', '기타', '진행 상태', '메모'];
const STATUS = ['신규', '연락함', '확정', '보류', '취소'];

/* ───────────────────────── 웹 요청 받기 ───────────────────────── */

function doPost(e) {
  let body = {};
  try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return out({ ok: false, error: 'bad json' }); }
  if (SECRET === 'CHANGE_ME' || body.secret !== SECRET) return out({ ok: false, error: 'unauthorized' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (body.kind === 'payment') recordPayment(body);
    else if (KIND[body.kind]) { appendApply(body); upsertBook(body); }
    else return out({ ok: false, error: 'unknown kind' });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out({ ok: true, service: 'starof-ai sheets' }); }

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* ───────────────────────── 강의 신청 탭 ───────────────────────── */

function appendApply(b) {
  const sh = applySheet();
  const k = KIND[b.kind];
  const payable = b.kind === 'study' || b.kind === 'oneday';
  sh.appendRow([
    now(),
    k.label,
    s(b.name), s(b.email), phone(b.phone), s(b.job), s(b.detail),
    b.amount ? Number(b.amount) : '',
    s(b.friend),
    payable ? '미결제' : '',
    s(b.extra),
    '신규',
    '',
  ]);
  const r = sh.getLastRow();
  sh.getRange(r, 8).setNumberFormat('#,##0"원"');
}

/** 결제 완료 → 같은 메일·상품의 가장 최근 '미결제' 신청 줄에 표시. 없으면 새 줄로 남겨요. */
function recordPayment(b) {
  const sh = applySheet();
  const label = (KIND[b.product] || {}).label || s(b.product);
  const mark = (b.test ? '[테스트] ' : '') + '결제 완료 · ' + Number(b.amount || 0).toLocaleString('ko-KR') + '원' + (b.method ? ' · ' + b.method : '');
  const last = sh.getLastRow();
  if (last >= 2) {
    const rows = sh.getRange(2, 1, last - 1, 10).getValues();
    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i];
      if (row[1] === label && lower(row[3]) === lower(b.email) && row[9] === '미결제') {
        sh.getRange(i + 2, 10).setValue(mark);
        sh.getRange(i + 2, 11).setValue(joinText(row[10], '주문번호 ' + s(b.orderId)));
        return;
      }
    }
  }
  sh.appendRow([now(), label, s(b.name), s(b.email), phone(b.phone), '', s(b.detail), Number(b.amount || 0), '', mark, '주문번호 ' + s(b.orderId) + ' (신청서 없이 바로 결제)', '신규', '']);
  sh.getRange(sh.getLastRow(), 8).setNumberFormat('#,##0"원"');
}

function applySheet() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(TAB_APPLY);
  if (!sh) sh = createApplySheet(ss);
  return sh;
}

function createApplySheet(ss) {
  const sh = ss.insertSheet(TAB_APPLY, 1);
  sh.getRange(1, 1, 1, APPLY_HEADERS.length).setValues([APPLY_HEADERS])
    .setFontWeight('bold').setBackground('#614215').setFontColor('#FFEB51');
  sh.setFrozenRows(1);
  const widths = [140, 130, 80, 200, 120, 160, 320, 90, 110, 200, 220, 80, 200];
  widths.forEach((w, i) => sh.setColumnWidth(i + 1, w));
  sh.getRange('G:G').setWrap(true);
  sh.getRange('L2:L').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).setAllowInvalid(true).build());
  return sh;
}

/* ───────────────────────── 고객 주소록 탭 ───────────────────────── */
// 열: A 고객 유형 · B 출처 유형 · C 이름 · D 이메일 · E 전화번호 · F 세부 내용 · G 최초 등록일 · H 비고 · I 뉴스레터 · J 메일 상태

function upsertBook(b) {
  const sh = SpreadsheetApp.getActive().getSheetByName(TAB_BOOK);
  if (!sh) return;
  const k = KIND[b.kind];
  const email = lower(b.email);
  const tel = phone(b.phone);
  const detail = '웹사이트 ' + k.label + ' 신청' + (b.detail && b.kind === 'pdf' ? ' (' + s(b.detail) + ')' : '') + ' · ' + today();

  const last = sh.getLastRow();
  if (last >= 2) {
    const rows = sh.getRange(2, 1, last - 1, 10).getValues();
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const sameEmail = email && lower(row[3]) === email;
      const samePhone = !email && tel && digits(row[4]) === digits(tel);
      const phoneOnly = !lower(row[3]) && tel && digits(row[4]) === digits(tel); // 1기처럼 이메일 없이 번호만 있던 고객
      if (!(sameEmail || samePhone || phoneOnly)) continue;
      const r = i + 2;
      const cur = String(row[0] || '');
      const curRank = RANK[cur] === undefined ? (cur ? 9 : 0) : RANK[cur];
      if (RANK[k.type] > curRank) sh.getRange(r, 1).setValue(k.type);
      if (!row[2] && b.name) sh.getRange(r, 3).setValue(s(b.name));
      if (!row[3] && email) { sh.getRange(r, 4).setValue(email); sh.getRange(r, 10).setValue('정상'); }
      if (!row[4] && tel) sh.getRange(r, 5).setValue(tel);
      sh.getRange(r, 6).setValue(joinText(row[5], detail, ' + '));
      return;
    }
  }
  sh.appendRow([k.type, '웹사이트', s(b.name), email, tel, detail, today(), s(b.job), false, email ? '정상' : '미수집']);
  sh.getRange(sh.getLastRow(), 9).insertCheckboxes();
}

/* ───────────────────────── 한 번만 실행: 탭·드롭다운·대시보드 ───────────────────────── */

function setup() {
  const ss = SpreadsheetApp.getActive();
  applySheet();

  // 1) 고객 주소록 A열 '고객 유형' 드롭다운에 웹사이트 카테고리 추가
  const book = ss.getSheetByName(TAB_BOOK);
  const types = Object.keys(KIND).map(function (key) { return KIND[key].type; });
  const range = book.getRange('A2:A' + Math.max(book.getMaxRows(), 1000));
  const rule = range.getDataValidation();
  let list = [];
  if (rule && rule.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) list = rule.getCriteriaValues()[0].slice();
  types.forEach(function (t) { if (list.indexOf(t) < 0) list.push(t); });
  range.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(list, true).setAllowInvalid(true).build());

  // 2) 대시보드 '유형별 고객' 표에 새 유형 줄 추가 (합계 줄 바로 위)
  const d = ss.getSheetByName(TAB_DASH);
  if (!d) return;
  const colB = d.getRange('B1:B60').getValues().map(function (r) { return String(r[0]); });
  const header = colB.indexOf('고객 유형') + 1; // 10
  let total = colB.indexOf('합계') + 1; // 18
  if (!header || !total) throw new Error('대시보드에서 "고객 유형" / "합계" 칸을 찾지 못했어요.');
  const existing = colB.slice(header, total - 1);
  const add = Object.keys(KIND).filter(function (key) { return existing.indexOf(KIND[key].type) < 0; });
  if (add.length) {
    d.insertRowsBefore(total, add.length);
    const tpl = d.getRange(total - 1, 2, 1, 7); // 직전 유형 줄 서식 복사
    add.forEach(function (key, i) {
      const r = total + i;
      tpl.copyTo(d.getRange(r, 2, 1, 7), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
      d.getRange(r, 2).setValue(KIND[key].type);
    });
    total += add.length;
  }
  const first = header + 1;
  const lastType = total - 1;
  const book_ = "INDIRECT(\"'고객 주소록'!A2:A\")";
  for (let r = first; r <= lastType; r++) {
    const name = String(d.getRange(r, 2).getValue());
    const key = Object.keys(KIND).filter(function (k) { return KIND[k].type === name; })[0];
    const color = key ? KIND[key].color : (String(d.getRange(r, 6).getFormula()).match(/#[0-9A-Fa-f]{6}/) || ['#9A9A9A'])[0];
    d.getRange(r, 3).setFormula('=COUNTIF(' + book_ + ',B' + r + ')');
    d.getRange(r, 4).setFormula('=IFERROR(C' + r + '/$B$6,0)');
    d.getRange(r, 5).setFormula('=COUNTIFS(' + book_ + ',B' + r + ",INDIRECT(\"'고객 주소록'!J2:J\"),\"정상\")");
    d.getRange(r, 6).setFormula('=IFERROR(SPARKLINE(C' + r + ',{"charttype","bar";"max",MAX($C$' + first + ':$C$' + lastType + ');"color1","' + color + '"}),"")');
  }
  d.getRange(total, 3).setFormula('=SUM(C' + first + ':C' + lastType + ')');
  d.getRange(total, 4).setFormula('=SUM(D' + first + ':D' + lastType + ')');
  d.getRange(total, 5).setFormula('=SUM(E' + first + ':E' + lastType + ')');

  // 3) 상단 '2기 신청' 카드: 기존 얼리버드 + 웹사이트 스터디 신청
  const top = d.getRange('B5:H5').getValues()[0];
  const col = top.indexOf('2기 신청');
  if (col >= 0) d.getRange(6, col + 2).setFormula('=COUNTIF(' + book_ + ',"2기 얼리버드")+COUNTIF(' + book_ + ',"스터디 신청")');

  ss.toast('"강의 신청" 탭과 대시보드 카테고리를 확인해 보세요.', '설치 완료', 8);
}

/** 연동 확인용: 실행하면 강의 신청 탭에 테스트 줄이 하나 생겨요 (확인 후 지우세요) */
function testRecord() {
  appendApply({ kind: 'study', name: '테스트', email: 'starofleee+sheettest@gmail.com', phone: '010-0000-0000', job: '연동 테스트', detail: '시트 연동 확인용', amount: 150000, extra: '' });
}

/* ───────────────────────── 작은 도우미 ───────────────────────── */

function s(v) { return String(v == null ? '' : v).trim(); }
function lower(v) { return s(v).toLowerCase(); }
function digits(v) { return s(v).replace(/\D/g, ''); }
function phone(v) {
  const d = digits(v);
  if (/^01\d{8,9}$/.test(d)) return d.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
  return s(v);
}
function joinText(a, b, sep) { a = s(a); b = s(b); return a ? (b ? a + (sep || ' · ') + b : a) : b; }
function now() { return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm'); }
function today() { return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd'); }
