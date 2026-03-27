export interface ThinkFirstOption {
  text: string;
}

export interface ThinkFirst {
  question: string;
  options: ThinkFirstOption[];
  correctIndex: number;
  explanation: string;
}

export interface CodeBlock {
  label?: string;
  code: string;
  tip?: string;
}

export interface Step {
  id: string;
  chapter: 1 | 2 | 3;
  difficulty: '🟢기초' | '🟡실전' | '🔴고급';
  time: string;
  title: string;
  description: string;
  insight?: string;
  thinkFirst?: ThinkFirst;
  installGuide?: {
    title: string;
    steps: string[];
  };
  codeBlocks: CodeBlock[];
  ahaMessage: string;
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  showDreamProject?: boolean;
}

export interface Chapter {
  id: 1 | 2 | 3;
  emoji: string;
  title: string;
  subtitle: string;
  stepCount: number;
  stepLabel: string;
}

export const chapters: Chapter[] = [
  { id: 1, emoji: '🌱', title: '입문편', subtitle: '설치부터 핵심 명령어까지', stepCount: 6, stepLabel: '6단계' },
  { id: 2, emoji: '⚡', title: '실전편', subtitle: '컨텍스트 관리와 워크플로우', stepCount: 8, stepLabel: '8단계' },
  { id: 3, emoji: '🚀', title: '고급편', subtitle: 'Skills · Agents · 자동화', stepCount: 6, stepLabel: '6단계' },
];

export const steps: Step[] = [
  {
    id: '1-1',
    chapter: 1,
    difficulty: '🟢기초',
    time: '약 3분',
    title: '루트 디렉토리에서 시작하기',
    description: '클로드 코드는 실행 위치가 중요합니다. 루트 디렉토리가 아닌 곳에서 실행하면 프로젝트 구조를 잘못 읽어요.',
    insight: '루트가 아닌 폴더에서 실행 시 — 다른 폴더 접근에 토큰 낭비, 비효율적 작동',
    thinkFirst: {
      question: '클로드를 API 폴더 안에서 실행하면?',
      options: [
        { text: 'API 관련 파일만 읽을 수 있어요' },
        { text: '더 빠르게 작동해요' },
        { text: '자동으로 루트를 찾아요' },
      ],
      correctIndex: 0,
      explanation: '맞아요. 다른 폴더 접근에 토큰을 추가로 써야 해서 비효율적이에요.',
    },
    installGuide: {
      title: '먼저 Claude Code를 설치해요',
      steps: [
        'claude.ai/download 방문 → 링크 클릭',
        'Mac / Windows 선택 후 설치',
        '앱 실행 후 Anthropic 계정 로그인',
        '터미널을 열고 프로젝트 폴더로 이동',
      ],
    },
    codeBlocks: [
      {
        code: `cd ~/내프로젝트폴더\nclaude`,
        tip: "폴더명을 모르겠으면 터미널에서 'ls' 입력 후 폴더 목록을 확인하세요",
      },
    ],
    ahaMessage: '이제 클로드가 프로젝트 전체를 한눈에 볼 수 있어요!',
  },
  {
    id: '1-2',
    chapter: 1,
    difficulty: '🟢기초',
    time: '약 5분',
    title: 'CLAUDE.md 만들기 (/init)',
    description: '/init 명령어 하나로 CLAUDE.md 파일이 생성됩니다. 이 파일은 클로드의 두뇌 — 매 세션마다 자동으로 읽어요.',
    insight: 'CLAUDE.md = 프로젝트의 모든 컨텍스트 / 300줄 이하 유지 원칙 (초과 시 토큰 낭비)',
    thinkFirst: {
      question: 'CLAUDE.md가 없으면 클로드는 어떻게 될까요?',
      options: [
        { text: '매번 처음부터 프로젝트를 파악해야 해요' },
        { text: '더 창의적으로 일해요' },
        { text: '더 빠르게 실행돼요' },
      ],
      correctIndex: 0,
      explanation: '맞아요. CLAUDE.md가 없으면 매 세션마다 모든 파일을 다시 탐색해야 해요.',
    },
    codeBlocks: [
      {
        label: '1단계 — CLAUDE.md 생성',
        code: '/init',
      },
      {
        label: '2단계 — 내용 추가',
        code: `방금 만든 CLAUDE.md에 아래 내용을 추가해줘:

# 절대 규칙
- 프로덕션 DB에 직접 쿼리 금지
- .env 파일 절대 커밋 금지

# 프로젝트 구조
(현재 폴더 구조를 트리 형태로 작성)

# 코딩 컨벤션
- 컴포넌트: PascalCase
- 유틸리티: camelCase`,
      },
    ],
    ahaMessage: 'CLAUDE.md가 있으면 매 세션마다 클로드가 즉시 맥락을 파악하고 시작해요!',
  },
  {
    id: '1-3',
    chapter: 1,
    difficulty: '🟢기초',
    time: '약 5분',
    title: 'Plan Mode 완전 정복',
    description: 'Plan Mode는 클로드가 코드를 바로 짜는 대신 계획을 먼저 보여줘요. 검토 후 승인해야 실행됩니다.',
    insight: '플랜 없이 바로 실행 = 엉뚱한 방향으로 코드 대량 생성 위험 / 토큰도 2~3배 낭비',
    thinkFirst: {
      question: "Plan Mode에서 '테스트 작성해줘'를 입력하면?",
      options: [
        { text: '바로 테스트 파일을 생성해요' },
        { text: '테스트 계획을 먼저 보여주고 승인을 기다려요' },
        { text: '에러가 나요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. Plan Mode에서는 클로드가 write 권한이 없어서 계획만 세워 보여줘요.',
    },
    codeBlocks: [
      {
        label: '1단계 — Plan Mode 전환',
        code: '키보드에서 Shift + Tab 눌러보기\n→ 화면 상단이 "Plan Mode"로 바뀌면 성공!',
      },
      {
        label: '2단계 — 첫 명령',
        code: '간단한 할 일 앱을 만들어줘',
      },
      {
        label: '3단계 — 플랜 검토 후',
        code: '이대로 진행해줘\n(또는: 2번 단계를 먼저 하고 나머지를 진행해줘)',
      },
    ],
    ahaMessage: '플랜을 먼저 보고 승인하는 습관 — 이게 고수와 초보의 차이예요!',
  },
  {
    id: '1-4',
    chapter: 1,
    difficulty: '🟢기초',
    time: '약 3분',
    title: 'Escape & 되감기',
    description: '클로드가 엉뚱한 방향으로 가고 있다면? Escape로 즉시 멈추세요. 두 번 누르면 이전 프롬프트로 되감기도 돼요.',
    insight: '잘못된 가정 위에 쌓인 코드는 전부 쓸모없음 — 초반에 잡는 게 핵심',
    thinkFirst: {
      question: '클로드의 Thinking Log를 무시하면?',
      options: [
        { text: '시간이 절약돼요' },
        { text: '잘못된 가정을 못 잡아서 코드 전체가 틀어질 수 있어요' },
        { text: '아무 문제 없어요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 클로드가 세운 가정이 틀렸을 때 초반에 잡지 않으면 나중에 전부 다시 해야 해요.',
    },
    codeBlocks: [
      {
        label: '실습 — 중단 연습',
        code: `1. 아무 명령이나 입력 (예: 간단한 버튼 만들어줘)
2. 실행 중간에 Escape 한 번 → 중단 확인
3. Escape 한 번 더 → 이전 프롬프트로 되감기 확인`,
      },
    ],
    ahaMessage: 'Escape는 실수를 0원으로 되돌리는 마법 버튼이에요!',
  },
  {
    id: '1-5',
    chapter: 1,
    difficulty: '🟢기초',
    time: '약 3분',
    title: '이미지·스크린샷으로 소통하기',
    description: 'UI 스타일을 말로 설명하면 토큰 낭비에 결과도 부정확해요. 원하는 디자인 이미지를 그대로 드래그앤드롭하세요.',
    insight: '이미지 1장 = 설명 수백 단어와 동등 / 아키텍처 다이어그램도 Mermaid나 이미지로',
    thinkFirst: {
      question: 'UI 스타일을 전달하는 가장 효율적인 방법은?',
      options: [
        { text: '상세하게 텍스트로 설명' },
        { text: '참고 이미지를 드래그앤드롭' },
        { text: '색상 코드만 알려줌' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 이미지가 가장 정확하고 토큰 효율도 좋아요.',
    },
    codeBlocks: [
      {
        code: `원하는 디자인 레퍼런스 이미지를 터미널에 드래그앤드롭 후:

이 디자인 스타일을 참고해서
내 랜딩페이지 헤더를 만들어줘.
배경은 따뜻한 크림색으로 해줘.`,
      },
    ],
    ahaMessage: '이미지 드래그앤드롭 — 이걸 아는 사람과 모르는 사람의 결과물이 달라요!',
  },
  {
    id: '1-6',
    chapter: 1,
    difficulty: '🟡실전',
    time: '약 10분',
    title: '필수 슬래시 명령어 + 커스텀 명령어',
    description: '6가지 핵심 슬래시 명령어와 나만의 커스텀 명령어를 만들어봐요. 반복 작업을 한 번에 끝내는 비결이에요.',
    insight: '컨텍스트 = 클로드의 단기 기억 / 꽉 차면 성능 급락 / 슬래시 명령어로 관리',
    thinkFirst: {
      question: '/compact와 /clear의 차이는?',
      options: [
        { text: '/compact는 요약을 유지하며 정리, /clear는 전부 삭제해요' },
        { text: '완전히 같아요' },
        { text: '/compact가 더 강력해요' },
      ],
      correctIndex: 0,
      explanation: '맞아요. compact는 이 세션의 핵심 기억은 남기고 공간만 확보해요.',
    },
    codeBlocks: [
      {
        label: '핵심 슬래시 명령어 6가지',
        code: `/context   → 현재 토큰 사용량 확인
/clear     → 컨텍스트 전체 초기화
/compact   → 요약 유지 + 공간 확보
/resume    → 이전 세션 복구
/mcp       → 연결된 도구 목록 확인
!git status → 클로드 안에서 bash 실행`,
      },
      {
        label: '보너스 — 커스텀 슬래시 명령어 만들기',
        code: `테스트를 실행하고, 모두 통과하면
git commit 후 git push까지 자동으로 해주는
커스텀 슬래시 명령어를 만들어줘.
이름은 /ship 으로 해줘.`,
      },
    ],
    ahaMessage: '/ship 하나로 테스트→커밋→푸시가 자동으로 돼요. 이게 생산성의 차이예요!',
  },
  {
    id: '2-1',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 5분',
    title: 'Second Brain + /memory 시스템',
    description: '클로드가 작업하면서 배운 패턴, 인사이트, 결정 이유를 자동으로 기억하게 만들 수 있어요.',
    insight: '개인 학습 메모리 → /memory (자동 저장) / 팀 공유 지식 → CLAUDE.md (명시적 작성)',
    thinkFirst: {
      question: "클로드에게 '기억해줘'라고 하면?",
      options: [
        { text: '그냥 무시해요' },
        { text: 'memory.md 파일에 자동 저장돼요' },
        { text: '다음 세션엔 잊어버려요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. /memory 기능으로 클로드가 자동으로 패턴을 저장하고 다음 세션에 불러와요.',
    },
    codeBlocks: [
      {
        label: '1단계 — 기억 저장',
        code: `오늘 작업에서 배운 패턴과
앞으로 이 프로젝트에서 지킬 규칙을
기억해줘.`,
      },
      {
        label: '2단계 — 메모리 확인',
        code: '/memory',
      },
    ],
    ahaMessage: '이제 클로드가 지난 세션을 기억하는 나만의 AI 동료가 돼요!',
  },
  {
    id: '2-2',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 7분',
    title: 'Lazy Loading 전략',
    description: 'CLAUDE.md에 모든 정보를 몰아넣으면 매 세션마다 수천 토큰이 낭비돼요. 필요할 때만 불러오는 구조로 바꿔야 해요.',
    insight: '나쁜 예: API 엔드포인트 50개를 CLAUDE.md에 직접 작성 / 좋은 예: CLAUDE.md에는 docs/api.md 참조만',
    thinkFirst: {
      question: 'CLAUDE.md에 API 엔드포인트 50개를 직접 작성하면?',
      options: [
        { text: '클로드가 더 똑똑해져요' },
        { text: '매 세션마다 수천 토큰이 자동으로 낭비돼요' },
        { text: '빠르게 참조할 수 있어요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. CLAUDE.md는 매 세션 시작 시 자동 로드돼요. 가벼울수록 효율적이에요.',
    },
    codeBlocks: [
      {
        code: `내 CLAUDE.md를 Lazy Loading 구조로 리팩토링해줘.
API 스펙, DB 스키마, 상세 컨벤션은
별도 파일(docs/ 폴더)로 분리하고
CLAUDE.md에는 참조 경로만 남겨줘.`,
      },
    ],
    ahaMessage: 'CLAUDE.md는 목차, 상세 내용은 별도 파일 — 이게 컨텍스트 엔지니어링의 핵심이에요!',
  },
  {
    id: '2-3',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 5분',
    title: 'MCP 효율적 관리',
    description: 'MCP를 많이 연결할수록 안 써도 컨텍스트가 쌓여요. Notion, Linear 같은 대형 MCP는 특히 주의해야 해요.',
    insight: 'MCP 서버 = 항상 컨텍스트 차지 / Notion MCP 하나가 수천 토큰 / 해결책: 필요한 기능만 커스텀 MCP 제작',
    thinkFirst: {
      question: 'MCP를 10개 연결해두면?',
      options: [
        { text: '10개 도구 모두 언제든 쓸 수 있어서 좋아요' },
        { text: '안 쓰는 MCP도 컨텍스트를 차지해서 효율이 떨어져요' },
        { text: '응답이 빨라져요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. MCP 서버는 연결만 해도 모든 도구 설명이 컨텍스트에 로드돼요.',
    },
    codeBlocks: [
      {
        label: '연결된 MCP 확인',
        code: '/mcp',
      },
      {
        label: '지금 안 쓰는 MCP 비활성화',
        code: '/mcp → 목록에서 지금 작업에 불필요한 MCP 옆 disable 클릭',
      },
    ],
    ahaMessage: '쓸 때만 켜고 안 쓸 때 끄는 습관 — 토큰이 눈에 띄게 절약돼요!',
  },
  {
    id: '2-4',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 5분',
    title: 'Mermaid 다이어그램으로 아키텍처 전달',
    description: '프로젝트 구조를 글로 설명하면 길어지고 부정확해요. Mermaid 다이어그램으로 표현하면 클로드가 훨씬 빠르게 파악해요.',
    insight: 'Mermaid 다이어그램 = 클로드가 가장 효율적으로 파싱하는 아키텍처 표현 방식',
    thinkFirst: {
      question: '아키텍처를 전달하는 가장 효율적인 방법은?',
      options: [
        { text: '상세하게 텍스트로 설명' },
        { text: 'Mermaid 다이어그램으로 표현' },
        { text: '구두로 설명' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 시각적 다이어그램은 클로드가 전체 구조를 즉시 파악하게 도와줘요.',
    },
    codeBlocks: [
      {
        code: `내 프로젝트 전체 아키텍처를
Mermaid 다이어그램으로 만들어줘.
완성되면 docs/architecture.md에 저장하고
CLAUDE.md에 참조 경로를 추가해줘.`,
      },
    ],
    ahaMessage: '아키텍처가 다이어그램으로 정리되면 클로드가 전체 구조를 즉시 파악해요!',
  },
  {
    id: '2-5',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 5분',
    title: '한 세션 = 한 기능 원칙',
    description: '한 세션에서 여러 기능을 동시에 만들면 컨텍스트가 오염되고 품질이 급격히 떨어져요.',
    insight: "'결제 시스템 전체 만들어줘' ❌ → 'Stripe 웹훅 핸들러만 구현해줘' ✅",
    thinkFirst: {
      question: '한 세션에서 로그인, 결제, 대시보드를 동시에 만들면?',
      options: [
        { text: '빠르고 효율적이에요' },
        { text: '컨텍스트 오염으로 품질이 급격히 저하돼요' },
        { text: '클로드가 잘 처리해줘요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 컨텍스트가 꽉 찰수록 클로드의 답변 품질이 천천히 나빠져요.',
    },
    codeBlocks: [
      {
        label: '올바른 세션 워크플로우',
        code: `1단계: Plan Mode에서 전체 기능 목록 설계
2단계: /clear (새 세션 시작)
3단계: 첫 번째 기능 하나만 구현
4단계: 완료 후 /clear → 다음 기능으로`,
      },
    ],
    ahaMessage: '세션을 기능별로 나누는 순간 결과물 품질이 확 달라져요!',
  },
  {
    id: '2-6',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 7분',
    title: 'TDD 기반 스마트 코딩',
    description: '작은 변경 후 테스트를 바로 작성하는 습관이 AI 코딩의 핵심이에요. 나중에 디버깅할 시간을 90% 줄여줘요.',
    insight: 'AI가 수백 줄을 바꿔도 내가 다 못 봄 → 테스트가 유일한 품질 안전망',
    thinkFirst: {
      question: '테스트 없이 계속 기능을 추가하면?',
      options: [
        { text: '빠르게 개발할 수 있어요' },
        { text: '나중에 어디서 문제가 생겼는지 찾기가 매우 어려워져요' },
        { text: '클로드가 알아서 체크해줘요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 테스트가 없으면 어느 변경이 문제를 일으켰는지 추적하기 너무 어려워요.',
    },
    codeBlocks: [
      {
        label: '기능 구현 후 테스트 작성',
        code: `방금 만든 [기능명] 함수에 대한
유닛 테스트를 작성해줘.
테스트가 모두 통과하면 commit해줘.`,
      },
      {
        label: '에러 발생 시 — 로그 그대로 붙여넣기',
        code: `[에러 로그 전체 복사 후 붙여넣기]
이 에러를 분석하고 수정해줘.`,
      },
    ],
    ahaMessage: '에러 로그는 해석 없이 그대로 붙여넣기 — 클로드는 스택 트레이스 분석의 달인이에요!',
  },
  {
    id: '2-7',
    chapter: 2,
    difficulty: '🟡실전',
    time: '약 5분',
    title: 'todo.md 공유 워크플로우',
    description: '오늘 할 일을 todo.md 파일로 클로드와 공유하면 여러 세션에 걸친 작업을 연속성 있게 이어갈 수 있어요.',
    insight: 'AI는 오늘 할 일, 내일 할 일을 모름 → todo.md를 함께 업데이트하며 공유',
    thinkFirst: {
      question: 'todo.md를 클로드와 공유하면?',
      options: [
        { text: '별 의미 없어요' },
        { text: '클로드가 작업 순서를 알고 연속성 있게 일할 수 있어요' },
        { text: '느려져요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. todo.md가 있으면 다음 세션에서도 어디까지 했는지 클로드가 바로 파악해요.',
    },
    codeBlocks: [
      {
        label: '1단계 — todo.md 생성',
        code: `오늘 해야 할 작업 목록을
todo.md 파일에 체크리스트로 만들어줘.`,
      },
      {
        label: '2단계 — 작업 시작',
        code: `todo.md 파일 읽고
첫 번째 항목부터 시작해줘.`,
      },
      {
        label: '3단계 — 세션 종료 전',
        code: `오늘 완료한 항목을 todo.md에 업데이트해줘.`,
      },
    ],
    ahaMessage: 'todo.md가 있으면 며칠에 걸친 프로젝트도 맥락을 잃지 않아요!',
  },
  {
    id: '2-8',
    chapter: 2,
    difficulty: '🔴고급',
    time: '약 10분',
    title: 'WAT 프레임워크',
    description: 'Workflow → Agents → Tools 순서로 프로젝트를 설계하는 프레임워크예요. 복잡한 작업도 안정적으로 관리해줘요.',
    insight: 'W: 작업 흐름 먼저 글로 정의 / A: Agent에게 역할 분배 / T: 실행 도구 결합',
    thinkFirst: {
      question: 'WAT 프레임워크에서 가장 먼저 해야 할 것은?',
      options: [
        { text: '도구(MCP, 스크립트) 선택' },
        { text: 'Agent 역할 설정' },
        { text: '작업 흐름(Workflow)을 Plain English로 정의' },
      ],
      correctIndex: 2,
      explanation: '맞아요. 도구보다 흐름이 먼저예요. 흐름이 명확해야 Agent와 Tool이 결정돼요.',
    },
    codeBlocks: [
      {
        code: `[내 프로젝트명]에 [기능] 추가하기를
WAT 프레임워크로 설계해줘.

W: 단계별 작업 흐름을 Plain English로 정의
A: 각 단계를 담당할 Agent 역할과 범위 분배
T: 필요한 스크립트, MCP, Hooks 목록화

각 단계마다 테스트 작성 및 통과 확인 포함.`,
      },
    ],
    ahaMessage: 'WAT로 설계된 프로젝트는 AI가 길을 잃지 않아요. 이게 진짜 에이전틱 엔지니어링이에요!',
  },
  {
    id: '3-1',
    chapter: 3,
    difficulty: '🔴고급',
    time: '약 7분',
    title: 'Skill이란 무엇인가',
    description: 'Skill은 AI에게 주는 업무 매뉴얼이에요. 한 번 만들면 자동 트리거 되고, 항상 같은 품질의 결과물이 나와요.',
    insight: 'CLAUDE.md: 항상 로드 / MCP: 항상 로드 / Skill: 이름+설명만 평소 로드 → 20개 만들어도 부담 없음',
    thinkFirst: {
      question: '같은 보고서를 매번 만들 때 최선의 방법은?',
      options: [
        { text: '매번 긴 프롬프트를 복사 붙여넣기' },
        { text: 'Skill로 만들어두고 트리거 한 번' },
        { text: '매번 새로 설명' },
      ],
      correctIndex: 1,
      explanation: '맞아요. Skill은 한 번 만들면 관련 말만 해도 자동으로 실행돼요.',
    },
    comparisonTable: {
      headers: ['항목', '프롬프트', 'CLAUDE.md', 'MCP', 'Skill'],
      rows: [
        ['평소 컨텍스트', '없음', '항상 차지', '항상 차지', '거의 없음(50바이트)'],
        ['재사용성', '수동 복붙', '자동 로드', '자동 로드', '자동 트리거'],
        ['용도', '일회성', '핵심 규칙', '외부 도구', '반복 업무'],
      ],
    },
    codeBlocks: [],
    ahaMessage: 'Skill이 있으면 반복 작업은 말 한마디로 끝나요!',
  },
  {
    id: '3-2',
    chapter: 3,
    difficulty: '🔴고급',
    time: '약 10분',
    title: 'Skill 만들기 (Skill Creator)',
    description: 'Skill Creator 플러그인을 설치하면 스킬 만들기가 자동화돼요. 내 반복 업무를 직접 스킬로 만들어봐요.',
    insight: 'Description에 사용자가 실제로 말할 법한 표현 3개 이상 포함 → 자동 트리거 정확도 향상',
    thinkFirst: {
      question: "Skill Description을 '문서를 생성하는 스킬'이라고만 쓰면?",
      options: [
        { text: '명확해서 잘 작동해요' },
        { text: '너무 추상적이라 언제 실행할지 클로드가 판단 못 해요' },
        { text: '상관없어요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. Description에 실제 트리거 표현을 구체적으로 써야 정확하게 실행돼요.',
    },
    codeBlocks: [
      {
        label: '1단계 — Skill Creator 설치',
        code: `/plugin
→ marketplaces → skillCreator 검색 → install
→ reload plugins`,
      },
      {
        label: '2단계 — 나만의 스킬 생성',
        code: `[내가 자주 하는 반복 작업] 자동화 스킬을 만들어줘.

입력: [필요한 정보들]
출력: [원하는 결과물 형태]
항상 포함할 것: [체크리스트 항목들]
트리거 표현 예시: [실제로 말할 법한 표현 3개]`,
      },
      {
        label: '3단계 — 스킬 테스트',
        code: '[트리거 표현]해줘',
      },
    ],
    ahaMessage: '스킬은 처음부터 완벽할 필요 없어요. 쓰면서 갈고 닦는 나만의 자동화예요!',
  },
  {
    id: '3-3',
    chapter: 3,
    difficulty: '🔴고급',
    time: '약 10분',
    title: 'Subagent 만들기',
    description: 'Subagent는 별도의 컨텍스트 공간을 가진 AI 직원이에요. 파일 100개를 뒤져도 메인 컨텍스트가 오염되지 않아요.',
    insight: 'Subagent 모델은 Sonnet 추천 — Opus를 쓰면 토큰이 눈에 띄게 빠르게 닳아요',
    thinkFirst: {
      question: '테스트 작성 작업을 Subagent에게 맡기면?',
      options: [
        { text: '메인 컨텍스트가 오염돼요' },
        { text: '별도 컨텍스트에서 처리되어 메인이 깨끗하게 유지돼요' },
        { text: '느려져요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. Subagent는 자기만의 컨텍스트 공간에서 일하고 결과 요약만 돌려줘요.',
    },
    codeBlocks: [
      {
        code: `/agents
→ Create new agent
→ Project level 선택
→ Generate with Claude 선택

입력 내용:
너는 [역할명] 전담 AI야.
내가 [작업]을 주면 [결과물]로 만들어줘.
완료 후 반드시 "완료 ✓"로 끝내줘.

설정:
- 모델: Sonnet (권장)
- Memory: Enable (필수)
- 권한: 역할에 맞는 최소 권한`,
      },
    ],
    ahaMessage: '첫 번째 AI 직원이 생겼어요! 이제 당신은 AI를 채용하는 사람이에요!',
  },
  {
    id: '3-4',
    chapter: 3,
    difficulty: '🔴고급',
    time: '약 10분',
    title: 'Agent Teams — AI 팀 꾸리기',
    description: '여러 Subagent가 동시에 병렬로 일하는 Agent Teams를 경험해봐요. 10분 작업이 3~4분으로 줄어들어요.',
    insight: '병렬 처리 가능한 것: 독립적인 작업들 / 병렬 처리 금지: 의존성이 있는 작업들',
    thinkFirst: {
      question: '프론트엔드, 백엔드, 테스트 작성을 동시에 진행하려면?',
      options: [
        { text: '불가능해요' },
        { text: 'Agent Teams로 병렬 처리 가능해요' },
        { text: '순서대로 해야만 해요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 독립적인 작업들은 각각 다른 Agent에게 맡겨 동시에 처리할 수 있어요.',
    },
    codeBlocks: [
      {
        code: `todo.md를 읽고
독립적으로 처리 가능한 작업들을
agent teams로 병렬 처리해줘.

각 agent 완료 시 메인에 보고하고
전체 완료 후 결과 요약해줘.`,
      },
    ],
    ahaMessage: '이제 당신은 AI 팀장이에요. 여러 AI가 동시에 일하는 걸 눈으로 봐요!',
  },
  {
    id: '3-5',
    chapter: 3,
    difficulty: '🔴고급',
    time: '약 7분',
    title: 'Hooks 자동화 파이프라인',
    description: '특정 이벤트가 발생할 때 자동으로 실행되는 파이프라인을 만들어요. 커밋, 저장, 에러마다 자동 처리가 가능해요.',
    insight: 'Hooks = 조건 없이 자동 실행 트리거 / Skill과 함께 쓰면 완전 자동화 달성',
    thinkFirst: {
      question: 'git commit마다 테스트를 자동 실행하려면?',
      options: [
        { text: '매번 수동으로 테스트해요' },
        { text: 'Hook을 만들면 commit 시 자동 실행돼요' },
        { text: '불가능해요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. pre-commit Hook은 커밋 직전 자동으로 테스트를 실행해줘요.',
    },
    codeBlocks: [
      {
        code: `git commit 직전에 자동으로 테스트가
실행되는 Hook을 만들어줘.

조건:
- 테스트 실패 시: commit 중단 + 실패 내용 출력
- 테스트 통과 시: commit 진행`,
      },
    ],
    ahaMessage: 'Hook이 있으면 실수로 깨진 코드를 커밋할 일이 없어요!',
  },
  {
    id: '3-6',
    chapter: 3,
    difficulty: '🔴고급',
    time: '약 15분',
    title: '통합 데모 — 나의 완성 워크플로우',
    description: '지금까지 배운 모든 것을 하나의 워크플로우로 연결해요. 이걸 실행하는 순간 당신은 에이전틱 엔지니어가 됩니다.',
    insight: '이 단계를 마치면 — 코드를 짜는 사람이 아니라 AI 에이전트를 설계하는 사람이 됩니다',
    thinkFirst: {
      question: '진짜 1인 개발자의 풀 워크플로우는?',
      options: [
        { text: '혼자 모든 코드를 직접 작성' },
        { text: 'AI에게 시키고 기다리기' },
        { text: 'WAT 설계 → Skills + Agents 구성 → 병렬 실행 → 자동화' },
      ],
      correctIndex: 2,
      explanation: '맞아요. 진짜 에이전틱 엔지니어는 AI를 설계하고 지휘하는 사람이에요.',
    },
    showDreamProject: true,
    codeBlocks: [
      {
        label: '1단계 — 음성으로 계획 전달',
        code: `/voice
(스페이스바를 누른 채 말하기)
"[내 꿈 프로젝트]의 오늘 작업을
 todo.md로 정리하고 시작해줘"`,
      },
      {
        label: '2단계 — WAT로 설계',
        code: `todo.md 읽고 WAT 프레임워크로 설계해줘.
독립 작업은 agent teams로 병렬 처리.
각 단계마다 테스트 작성 포함.`,
      },
      {
        label: '3단계 — 크로스 AI 리뷰',
        code: `지금까지의 작업 계획을 export해줘.
(export된 내용을 ChatGPT나 Gemini에 붙여넣어
 다른 시각의 피드백을 받고 클로드에 공유)`,
      },
      {
        label: '4단계 — 자동 완성',
        code: `크로스 리뷰 피드백 반영해서
나머지 작업을 agent teams로 완성해줘.
완료 후 todo.md 업데이트하고 요약 보고해줘.`,
      },
    ],
    ahaMessage: '축하해요! 당신은 이제 에이전틱 엔지니어입니다 🎉',
  },
];

export const TOTAL_STEPS = steps.length;

export function getStepsByChapter(chapterId: 1 | 2 | 3): Step[] {
  return steps.filter((s) => s.chapter === chapterId);
}

export function getStep(id: string): Step | undefined {
  return steps.find((s) => s.id === id);
}

export function getNextStep(currentId: string): Step | undefined {
  const idx = steps.findIndex((s) => s.id === currentId);
  if (idx === -1 || idx >= steps.length - 1) return undefined;
  return steps[idx + 1];
}
