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

export interface Keyword {
  term: string;
  explanation: string;
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
  keywords?: Keyword[];
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
    keywords: [
      { term: '루트 디렉토리', explanation: '프로젝트 폴더의 가장 바깥쪽 최상위 위치예요. 건물로 치면 1층 입구에 해당해요. 클로드는 여기서 실행해야 프로젝트 전체 구조를 한눈에 볼 수 있어요.' },
      { term: '터미널', explanation: '마우스 대신 텍스트 명령어로 컴퓨터를 조작하는 검은 화면이에요. 맥에서는 기본 앱인 "터미널", 윈도우에서는 "명령 프롬프트" 또는 "PowerShell"이 같은 역할을 해요.' },
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
    keywords: [
      { term: 'CLAUDE.md', explanation: '새로 온 알바생에게 주는 업무 매뉴얼 파일이에요. 이게 없으면 클로드는 매번 "우리 프로젝트는 어떻게 돌아가요?"부터 물어봐야 해요. .md는 그냥 메모장 같은 텍스트 파일 형식이에요.' },
      { term: '프로덕션 DB', explanation: '실제 손님들이 쓰는 찐 데이터 저장소예요. 쇼핑몰이라면 진짜 고객들의 주문·결제 정보가 담긴 곳이에요. 여기서 실수하면 실제 서비스에 문제가 생겨요.' },
      { term: '.env 파일', explanation: '금고 비밀번호를 적어둔 쪽지예요. API 키, 비밀번호 같은 민감한 정보를 저장해요. 다른 사람에게 절대 보내면 안 되는 숨김 파일이에요.' },
      { term: '커밋(commit)', explanation: '게임의 세이브 버튼이에요. 코드를 변경한 뒤 "이 상태로 저장!"을 눌러 기록을 남기는 거예요. 나중에 이 시점으로 언제든 되돌아올 수 있어요.' },
      { term: '트리 형태', explanation: '회사 조직도처럼 폴더와 파일을 위아래 계층으로 보여주는 방식이에요. 맨 위에 루트 폴더, 아래에 하위 폴더들이 나뭇가지처럼 뻗어 있어요.' },
      { term: '컨벤션(Convention)', explanation: '"우리 팀은 이렇게 쓰기로 해요" 하는 사전 약속이에요. 맞춤법 규칙처럼 코드를 어떻게 쓸지 팀원들이 정해둔 규칙이에요.' },
      { term: 'PascalCase / camelCase', explanation: '영어 단어를 붙여 쓸 때 대문자를 어디에 놓느냐의 약속이에요. PascalCase는 MyButton처럼 모든 단어 첫 글자를 대문자로, camelCase는 myButton처럼 두 번째 단어부터 대문자로 써요.' },
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
    keywords: [
      { term: 'Plan Mode', explanation: '건축가가 벽 쌓기 전에 설계도 먼저 그리는 것처럼, 클로드가 코드를 바로 작성하는 대신 계획서를 먼저 보여주는 모드예요. "이렇게 하면 될까요?" 하고 물어보는 것과 같아요.' },
      { term: 'write 권한', explanation: '파일에 글을 쓰거나 새 파일을 만들 수 있는 열쇠예요. Plan Mode에서는 이 열쇠를 뺀 상태라 클로드가 계획만 말하고 실제로 파일을 건드리지 않아요.' },
      { term: '토큰', explanation: '클로드가 읽고 처리하는 텍스트의 단위예요. 단어 하나 반 정도예요. 잘못된 방향으로 코드를 잔뜩 만들면 이 토큰(=비용)이 낭비돼요. 플랜을 먼저 확인하면 방지할 수 있어요.' },
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
    keywords: [
      { term: 'Thinking Log', explanation: '클로드가 답하기 전에 "이건 이렇게 해볼까... 아니면 저렇게?" 하고 혼자 생각하는 과정이 보이는 창이에요. 여기서 이상한 가정을 하고 있으면 Escape로 미리 잡을 수 있어요.' },
      { term: 'Escape', explanation: '달리는 차의 비상 정지 버튼이에요. 클로드가 엉뚱한 방향으로 달리고 있을 때 Escape를 누르면 즉시 멈춰요. 한 번 더 누르면 직전 입력으로 되감아줘요.' },
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
    keywords: [
      { term: '드래그앤드롭', explanation: '파일 아이콘을 마우스로 꾹 누른 채 끌어서 원하는 곳에 올려놓는 동작이에요. 사진을 클로드 터미널 창으로 이렇게 가져다 놓으면 바로 첨부돼요.' },
      { term: '레퍼런스 이미지', explanation: '헤어샵에서 "이 사진처럼 잘라주세요"하고 보여주는 참고 사진이에요. 말로 설명하면 오해가 생기지만 이미지는 정확하게 의도를 전달해요.' },
      { term: '아키텍처 다이어그램', explanation: '서비스의 전체 구조를 보여주는 설계도예요. "어디서 어디로 데이터가 흐르는지"를 화살표와 박스로 그린 그림이에요.' },
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
    keywords: [
      { term: '컨텍스트(Context)', explanation: '클로드의 단기 기억이에요. 대화가 길어질수록 점점 꽉 차서 예전 내용을 잊어버리기 시작해요. /compact로 중요한 것만 추려서 공간을 확보할 수 있어요.' },
      { term: '/compact', explanation: '두꺼운 책을 핵심 요약본으로 만드는 것이에요. 지금까지 대화의 중요한 내용은 남기면서 클로드의 기억 공간을 늘려줘요.' },
      { term: '/clear', explanation: '낙서판을 완전히 지우는 것이에요. 이전 대화를 싹 다 지우고 완전히 새로 시작할 때 써요. 새 기능 작업을 시작할 때 좋아요.' },
      { term: '!bash 명령어', explanation: '"!" 느낌표를 앞에 붙이면 클로드 안에서 터미널 명령을 바로 실행할 수 있어요. !git status처럼요. 터미널 창을 따로 열지 않아도 돼요.' },
      { term: '커스텀 슬래시 명령어', explanation: 'TV 리모컨 즐겨찾기 버튼처럼, 자주 하는 작업을 /내이름 하나로 실행하도록 나만의 단축키를 만드는 것이에요.' },
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
    keywords: [
      { term: '/memory', explanation: '클로드에게 "이거 기억해줘"라고 하면 자동으로 파일에 적어두는 메모장이에요. 다음 대화 세션이 시작될 때 이 메모를 꺼내 읽어요.' },
      { term: '세션(Session)', explanation: '클로드와 나누는 하나의 대화 단위예요. 채팅 창을 새로 열면 새 세션이 시작돼요. 마치 매일 아침 새 업무 일지를 펴는 것과 같아요.' },
      { term: '패턴', explanation: '"이 팀장은 항상 보고서를 이 형식으로 쓰더라"처럼 반복적으로 나타나는 일하는 방식의 공통 형태예요. 클로드가 이 패턴을 기억해두면 다음에 자동으로 맞춰줘요.' },
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
    keywords: [
      { term: 'Lazy Loading', explanation: '식당 메뉴판에 모든 요리 사진을 실어놓지 않고, 손님이 "이거 보여줘"할 때만 사진을 가져오는 방식이에요. 처음 열릴 때 훨씬 빠르고 가벼워요.' },
      { term: 'API 엔드포인트', explanation: '서버와 대화하는 주소예요. 우체통 주소처럼요. 예를 들어 /api/users 라는 주소로 요청을 보내면 서버가 사용자 목록을 돌려줘요.' },
      { term: '참조 경로', explanation: '파일이 어디 있는지 알려주는 지도 주소예요. "docs/api.md를 봐"처럼요. CLAUDE.md에 내용을 직접 쓰는 대신 "거기 가서 읽어"라고만 적어두는 것이에요.' },
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
    keywords: [
      { term: 'MCP', explanation: '클로드에 꽂는 USB 포트 같은 거예요. Notion, GitHub, Slack 같은 외부 서비스에 연결하게 해주는 플러그인이에요. 연결만 해도 설명이 클로드 메모리를 차지해요.' },
      { term: '비활성화(Disable)', explanation: '플러그를 완전히 뽑는 게 아니라 전원 스위치만 끄는 것이에요. 연결 설정은 그대로이고 지금은 쓰지 않는 상태로 대기시키는 거예요.' },
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
    keywords: [
      { term: 'Mermaid 다이어그램', explanation: '텍스트로 그림을 그리는 마법이에요. "A → B → C"라고 글자로 쓰면 자동으로 화살표 흐름도가 만들어져요. 복잡한 구조를 그림으로 설명할 때 써요.' },
      { term: '아키텍처(Architecture)', explanation: '건물 설계도처럼 프로그램의 전체 구조와 각 부분이 어떻게 연결되는지 보여주는 청사진이에요. 클로드가 이 그림을 보면 전체를 즉시 파악해요.' },
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
    keywords: [
      { term: '컨텍스트 오염', explanation: '요리사에게 동시에 10가지 요리를 시키면 다 어설프게 나오는 것처럼, 한 대화에서 여러 기능을 동시에 만들면 클로드의 집중력이 흐트러져서 품질이 떨어지는 현상이에요.' },
      { term: '세션 분리', explanation: '피자집, 치킨집, 초밥집을 한 요리사에게 동시에 맡기는 대신 각각 전문점에 따로 주문하는 것이에요. 클로드도 기능별로 대화를 새로 시작하면 훨씬 집중해서 잘 만들어줘요.' },
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
    keywords: [
      { term: 'TDD(테스트 주도 개발)', explanation: '요리를 완성할 때마다 간을 보는 습관이에요. 마지막에 한꺼번에 먹어보는 것보다 중간중간 확인하는 게 훨씬 안전해요. 코드도 작은 기능을 만들 때마다 바로 검사해요.' },
      { term: '유닛 테스트', explanation: '공장에서 제품 하나씩 품질 검사하듯이, 기능 하나하나가 제대로 작동하는지 자동으로 확인하는 검사예요. 한 번 만들면 이후에 자동으로 계속 검사해줘요.' },
      { term: '스택 트레이스', explanation: '"어디서 → 어디서 → 여기서 에러 났어요"라고 순서대로 알려주는 오류 경위서예요. 이걸 그대로 클로드에 붙여넣으면 원인을 정확하게 찾아줘요.' },
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
    keywords: [
      { term: 'todo.md', explanation: '클로드와 함께 보는 할 일 목록 파일이에요. 물리적인 포스트잇 대신 텍스트 파일로 만든 체크리스트예요. 새 세션에서 이 파일을 보여주면 클로드가 어디서 이어서 시작할지 바로 알아요.' },
      { term: '체크리스트 형식', explanation: '[ ] 는 아직 안 한 것, [x] 는 완료한 것이에요. 클로드가 작업을 마칠 때마다 [ ]를 [x]로 바꿔줘요. 눈으로 진행 상황을 한눈에 볼 수 있어요.' },
      { term: '연속성', explanation: '드라마를 다음 날 이어 보는 것처럼, 여러 날에 걸쳐 작업해도 맥락이 끊기지 않고 이어지는 것이에요. todo.md가 있으면 "지난번에 어디까지 했더라?"가 필요 없어요.' },
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
    keywords: [
      { term: 'WAT 프레임워크', explanation: '복잡한 요리를 할 때 레시피(Workflow), 요리사(Agents), 도구(Tools)를 먼저 정하는 것처럼 AI 작업을 설계하는 방법이에요. 이 순서대로 생각하면 복잡한 프로젝트도 헷갈리지 않아요.' },
      { term: 'Workflow(작업 흐름)', explanation: '"1단계 재료 준비 → 2단계 볶기 → 3단계 담기"처럼 작업이 순서대로 흘러가는 단계별 흐름이에요. 이걸 먼저 글로 적어두면 나머지가 자연스럽게 따라와요.' },
      { term: 'Agent(에이전트)', explanation: '"너는 번역만 해", "너는 디자인만 해"처럼 특정 역할만 전담하는 AI 실행 단위예요. 제너럴리스트보다 스페셜리스트가 각 분야에서 더 잘해요.' },
      { term: 'Plain English', explanation: '전문 용어 없이 누구나 이해할 수 있는 일상 언어로 쓴 글이에요. AI에게 지시할 때 어렵게 쓰는 것보다 쉽고 명확하게 쓰는 게 훨씬 좋은 결과를 내요.' },
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
    keywords: [
      { term: 'Skill', explanation: '클로드에게 만들어주는 업무 매뉴얼이에요. 한 번 만들면 "주간 보고서 써줘"라고만 해도 정해진 형식으로 자동 실행돼요. 스마트폰 앱처럼 필요할 때 꺼내 쓰는 개념이에요.' },
      { term: '자동 트리거', explanation: '"주간 보고서"라는 말을 하면 자동으로 보고서 Skill이 켜지는 것이에요. 특정 키워드가 탐지되면 자동 실행되는 스마트홈 기기처럼요.' },
      { term: '컨텍스트 차지', explanation: '클로드의 기억 공간을 사용하는 것이에요. CLAUDE.md나 MCP는 항상 메모리를 차지하지만, Skill은 이름과 간단한 설명만 올려두고 실제 내용은 필요할 때만 꺼내요.' },
    ],
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
    keywords: [
      { term: '플러그인(Plugin)', explanation: '클로드의 기본 기능에 추가 기능을 덧붙이는 앱이에요. 스마트폰에 앱을 설치하면 기능이 늘어나는 것처럼, Skill Creator 플러그인을 설치하면 스킬 만들기가 자동화돼요.' },
      { term: 'Description', explanation: '스킬의 자기소개서예요. "나는 언제 실행돼야 하는 스킬이에요"라고 클로드에게 알려주는 역할이에요. 구체적일수록 클로드가 정확한 타이밍에 실행해요.' },
      { term: '트리거 표현', explanation: '스킬을 실행시키는 특정 말이에요. "주간 보고서", "리포트 써줘", "보고서 만들어" 처럼 실제로 사람이 말할 법한 표현을 미리 등록해두면 클로드가 알아챠요.' },
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
    keywords: [
      { term: 'Subagent', explanation: '메인 클로드와 별도로 고용한 AI 직원이에요. 자기만의 작업 공간에서 일하고 결과만 보고해줘요. 회사의 외부 용역업체처럼, 내 메인 작업을 방해하지 않고 독립적으로 일해요.' },
      { term: '컨텍스트 공간', explanation: 'AI가 한 번에 기억하고 처리할 수 있는 정보의 책상 공간이에요. Subagent는 자기만의 별도 책상에서 일하기 때문에 아무리 많은 파일을 뒤져도 메인 책상이 지저분해지지 않아요.' },
      { term: 'Sonnet', explanation: 'Anthropic이 만든 클로드 AI 모델 중 하나예요. 비용 대비 성능이 균형 잡혀 있어서 Subagent에 쓰기 딱 좋아요. Opus는 더 똑똑하지만 비용이 많이 들어요.' },
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
    keywords: [
      { term: 'Agent Teams', explanation: '여러 AI 직원이 동시에 일하는 팀이에요. 한 명이 디자인하는 동안 다른 한 명이 코딩하고, 또 다른 한 명이 테스트하는 방식으로 시간을 확 줄일 수 있어요.' },
      { term: '병렬 처리', explanation: '은행 창구가 1개면 줄을 서야 하지만 창구가 10개면 동시에 10명씩 처리할 수 있는 것처럼, 여러 작업을 동시에 처리하는 방식이에요. 순서대로 하는 것보다 훨씬 빠르게 완료돼요.' },
      { term: '의존성', explanation: '설계도 없이 건물을 지을 수 없는 것처럼, 한 작업이 끝나야 다음 작업을 시작할 수 있는 순서 관계예요. 의존성이 없는 작업들만 병렬로 돌릴 수 있어요.' },
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
    keywords: [
      { term: 'Hook', explanation: '현관문이 열리면 자동으로 조명이 켜지는 스마트홈처럼, 특정 이벤트가 발생할 때 자동으로 실행되는 장치예요. "저장했을 때", "커밋할 때" 같은 순간에 자동으로 작동해요.' },
      { term: 'pre-commit', explanation: '코드를 저장(커밋)하기 직전에 자동으로 실행되는 Hook이에요. 저장 버튼을 누르는 순간 "잠깐, 먼저 테스트 통과 확인할게요"라고 자동으로 검사해줘요.' },
      { term: '파이프라인', explanation: '세탁기 → 건조기 → 다림질처럼 여러 작업이 물처럼 흘러가며 자동으로 이어지는 구조예요. 한 단계가 끝나면 자동으로 다음 단계로 넘어가요.' },
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
    keywords: [
      { term: '에이전틱 엔지니어링', explanation: '오케스트라 지휘자처럼 AI 팀원들을 설계하고 지휘해서 복잡한 작업을 자동화하는 기술이에요. 코드를 직접 짜는 것이 아니라 "누가 어떤 일을 할지"를 설계하는 역할이에요.' },
      { term: '크로스 AI 리뷰', explanation: '같은 증상으로 두 의사에게 소견을 물어보는 것처럼, 클로드가 만든 결과물을 ChatGPT나 Gemini에게 검토시키는 방법이에요. 다른 AI의 시각으로 약점을 잡아낼 수 있어요.' },
      { term: 'export', explanation: '지금까지 한 작업 내용을 파일로 내보내는 것이에요. 한글 문서를 PDF로 저장하는 것과 비슷해요. 클로드 대화 내용을 다른 AI에 공유할 때 이 기능을 써요.' },
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
