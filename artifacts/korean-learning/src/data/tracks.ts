import type { Module, Track } from './types';

// ===== 트랙 전용 모듈 =====

const automationTrackModules: Module[] = [
  {
    id: 'T1-1',
    title: '업무 자동화 도구 설계하기',
    metaphor: '매일 반복하는 업무를 기계에게 맡기는 시스템 만들기',
    description: '엑셀 정리, 메일 발송, 데이터 수집 같은 반복 업무를 자동화하는 도구를 설계하고 만들어요.',
    difficulty: 'practical',
    time: '약 15분',
    showDreamProject: true,
    thinkFirst: {
      question: '업무 자동화의 첫 번째 단계는?',
      options: [
        { text: '바로 코딩을 시작한다' },
        { text: '자동화할 업무의 흐름을 먼저 정리한다' },
        { text: 'AI에게 "알아서 해줘"라고 한다' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 어떤 업무를, 어떤 순서로, 어떤 조건에서 자동화할지 먼저 정리해야 해요.',
    },
    codeBlocks: [
      {
        label: '업무 흐름 분석 요청',
        code: `나는 매일 [반복 업무 설명]을 하고 있어.
이 업무를 자동화하는 도구를 만들고 싶어.

먼저 현재 업무 흐름을 분석하고,
자동화 가능한 부분과 아직 사람이 해야 하는 부분을
구분해서 정리해줘.`,
      },
      {
        label: '자동화 도구 구현',
        code: `분석한 업무 흐름을 기반으로
자동화 스크립트를 만들어줘.

입력: [데이터 소스]
처리: [자동화할 작업]
출력: [결과물 형태]`,
      },
    ],
    keywords: [
      { term: '업무 자동화', explanation: '매일 반복하는 단순 작업을 프로그램이 대신 해주는 것이에요. 매번 엑셀 파일을 열고 정리하는 대신, 버튼 하나로 자동 정리되게 만드는 거예요.' },
      { term: '스크립트', explanation: '컴퓨터에게 "이 순서대로 해줘"라고 적어놓은 작업 지시서예요. 한 번 만들면 같은 작업을 몇 번이든 자동으로 실행해요.' },
    ],
    gate: {
      type: 'input',
      prompt: '자동화하고 싶은 반복 업무를 하나 적어보세요',
      placeholder: '예: 매일 아침 이메일에서 주문 데이터를 엑셀로 정리하기',
    },
    ahaMessage: '첫 번째 업무 자동화 도구가 완성됐어요! 이제 반복 작업은 기계가 해요!',
  },
];

const landingTrackModules: Module[] = [
  {
    id: 'T2-1',
    title: '랜딩페이지 / 홈페이지 만들기',
    metaphor: '가게 간판과 쇼윈도 — 첫인상이 전부예요',
    description: '방문자가 처음 보는 페이지를 매력적으로 만들어요. 헤더, 히어로 섹션, CTA 버튼이 핵심이에요.',
    difficulty: 'practical',
    time: '약 15분',
    showDreamProject: true,
    thinkFirst: {
      question: '좋은 랜딩페이지의 가장 중요한 요소는?',
      options: [
        { text: '많은 정보를 담는 것' },
        { text: '방문자가 원하는 행동을 하게 유도하는 것 (CTA)' },
        { text: '화려한 애니메이션' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 가입하기, 구매하기, 문의하기 같은 핵심 행동을 유도하는 게 목적이에요.',
    },
    codeBlocks: [
      {
        label: '랜딩페이지 제작 요청',
        code: `[서비스/제품] 소개 랜딩페이지를 만들어줘.

포함할 섹션:
1. 히어로 (한 줄 캐치프레이즈 + CTA 버튼)
2. 핵심 기능 3가지
3. 사용자 후기
4. 가격표
5. 최종 CTA

디자인: 깔끔하고 모던하게, 모바일 반응형으로`,
      },
    ],
    keywords: [
      { term: 'CTA(Call To Action)', explanation: '"지금 가입하기", "무료로 시작하기" 같은 행동 유도 버튼이에요. 방문자가 이 버튼을 클릭하도록 모든 디자인이 이끌어야 해요.' },
      { term: '히어로 섹션', explanation: '페이지 맨 위에 가장 크게 보이는 영역이에요. 가게 간판처럼 "우리 서비스가 뭐하는 건지" 한눈에 보여주는 곳이에요.' },
      { term: '반응형', explanation: '화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인이에요. PC에서도 스마트폰에서도 깔끔하게 보여요.' },
    ],
    gate: {
      type: 'input',
      prompt: '만들고 싶은 랜딩페이지의 한 줄 캐치프레이즈를 적어보세요',
      placeholder: '예: AI로 업무 시간을 반으로 줄여보세요',
    },
    ahaMessage: '멋진 랜딩페이지가 완성됐어요! 이제 세상에 공개할 준비가 됐어요!',
  },
];

const dashboardTrackModules: Module[] = [
  {
    id: 'T3-1',
    title: '데이터 대시보드 만들기',
    metaphor: '가게 매출 현황판 — 숫자가 한눈에 보여야 의사결정이 빨라요',
    description: '데이터를 시각화하는 대시보드를 만들어요. 차트, 표, 실시간 업데이트로 핵심 지표를 한눈에.',
    difficulty: 'practical',
    time: '약 15분',
    showDreamProject: true,
    thinkFirst: {
      question: '좋은 대시보드의 핵심은?',
      options: [
        { text: '가능한 많은 데이터를 보여주는 것' },
        { text: '의사결정에 필요한 핵심 지표만 한눈에 보여주는 것' },
        { text: '화려한 차트를 많이 넣는 것' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 대시보드는 "지금 뭘 해야 하는지" 바로 알 수 있게 해주는 것이에요.',
    },
    codeBlocks: [
      {
        label: '대시보드 설계 요청',
        code: `[데이터 소스]의 데이터를 보여주는 대시보드를 만들어줘.

핵심 지표:
1. [KPI 1] (예: 오늘 매출)
2. [KPI 2] (예: 신규 가입자 수)
3. [KPI 3] (예: 전환율)

포함할 차트:
- 일별 추이 라인 차트
- 카테고리별 파이 차트
- 실시간 업데이트 숫자 카드`,
      },
    ],
    keywords: [
      { term: '대시보드', explanation: '자동차 계기판처럼 중요한 숫자를 한눈에 볼 수 있게 정리한 화면이에요. 속도, 연료, RPM을 보듯 매출, 방문자, 전환율을 봐요.' },
      { term: 'KPI', explanation: '핵심 성과 지표(Key Performance Indicator)예요. "우리 가게가 잘 되고 있는지" 판단하는 핵심 숫자예요.' },
    ],
    gate: {
      type: 'input',
      prompt: '대시보드에서 가장 보고 싶은 데이터는 무엇인가요?',
      placeholder: '예: 매일 우리 서비스 방문자 수와 가입 전환율',
    },
    ahaMessage: '데이터가 시각화되니까 인사이트가 바로 보여요!',
  },
];

// ===== 4개 트랙 정의 =====

export const tracks: Track[] = [
  {
    id: 'automation',
    emoji: '',
    title: '업무 자동화 도구',
    subtitle: '반복 업무를 자동화하는 도구 만들기',
    description: '매일 반복하는 엑셀 정리, 데이터 수집, 보고서 작성 같은 업무를 자동화해요. 가장 실용적인 트랙이에요.',
    color: '#3B82F6',
    hookCopy: {
      entry: '이 트랙을 끝까지 따라가면, 당신만의 업무 자동화 도구가 실제로 동작합니다.',
      midpoint: '축하합니다. 방금 당신이 만든 자동화가 처음으로 실행됐어요.',
      completion: '여기까지 온 사람은 생각보다 많지 않습니다. 이제 반복 업무는 기계가 합니다.',
    },
    moduleSequence: ['C0', 'C1', 'C2', 'C3', 'C13', 'C4', 'C10', 'T1-1', 'C5', 'C6', 'C7', 'C8', 'C8.5', 'C12'],
    midpointModuleId: 'T1-1',
  },
  {
    id: 'landing',
    emoji: '',
    title: '랜딩/홈페이지',
    subtitle: '나만의 웹사이트 만들기',
    description: '서비스 소개, 포트폴리오, 사이드 프로젝트 홈페이지를 만들어요. 가장 빠르게 결과물을 볼 수 있는 트랙이에요.',
    color: '#10B981',
    hookCopy: {
      entry: '이 트랙을 끝까지 따라가면, 당신만의 웹사이트가 실제로 인터넷에 올라갑니다.',
      midpoint: '축하합니다. 방금 당신이 만든 페이지예요.',
      completion: '여기까지 온 사람은 생각보다 많지 않습니다. 이제 당신의 웹사이트가 세상에 있어요.',
    },
    moduleSequence: ['C0', 'C1', 'C2', 'C3', 'C4', 'T2-1', 'C5', 'C6', 'C7', 'C8', 'C8.5'],
    midpointModuleId: 'T2-1',
  },
  {
    id: 'dashboard',
    emoji: '',
    title: '데이터 대시보드',
    subtitle: '데이터를 시각화하는 대시보드 만들기',
    description: '매출, 방문자, KPI 같은 데이터를 차트와 그래프로 한눈에 볼 수 있는 대시보드를 만들어요.',
    color: '#8B5CF6',
    hookCopy: {
      entry: '이 트랙을 끝까지 따라가면, 당신만의 데이터 대시보드가 실제로 동작합니다.',
      midpoint: '축하합니다. 방금 당신이 만든 대시보드에 데이터가 표시되고 있어요.',
      completion: '여기까지 온 사람은 생각보다 많지 않습니다. 이제 데이터가 당신에게 말을 걸어요.',
    },
    moduleSequence: ['C0', 'C1', 'C2', 'C3', 'C13', 'C4', 'C10', 'T3-1', 'C5', 'C11', 'C6', 'C7', 'C8', 'C8.5'],
    midpointModuleId: 'T3-1',
  },
  {
    id: 'freestyle',
    emoji: '',
    title: '자유형',
    subtitle: '내가 원하는 걸 자유롭게 만들기',
    description: '특정 트랙에 맞지 않는 프로젝트를 자유롭게 만들어요. 모든 선택적 모듈에 접근할 수 있어요.',
    color: '#F59E0B',
    hookCopy: {
      entry: '이 트랙을 끝까지 따라가면, 당신의 상상이 실제로 동작하는 프로젝트가 됩니다.',
      midpoint: '축하합니다. 지금 보고 있는 게 당신이 만든 거예요.',
      completion: '여기까지 온 사람은 생각보다 많지 않습니다. 당신은 이제 무엇이든 만들 수 있어요.',
    },
    moduleSequence: ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C8.5'],
    midpointModuleId: 'C6',
  },
];

// ===== 트랙 전용 모듈 맵 =====

export const trackModulesMap: Record<string, Module[]> = {
  automation: automationTrackModules,
  landing: landingTrackModules,
  dashboard: dashboardTrackModules,
  freestyle: [],
};

// ===== 유틸리티 =====

export function getTrack(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

export function getTrackModule(id: string): Module | undefined {
  for (const modules of Object.values(trackModulesMap)) {
    const found = modules.find((m) => m.id === id);
    if (found) return found;
  }
  return undefined;
}
