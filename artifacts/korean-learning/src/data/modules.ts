import type { Module } from './types';

// ===== 필수 공통 모듈 (C0 ~ C8.5) =====

export const commonModules: Module[] = [
  {
    id: 'C0',
    title: '시작하기: 설치부터 첫 실행까지',
    metaphor: '가게를 열기 전에 매장 열쇠부터 받아야죠',
    description: '클로드 코드 앱을 설치하고, 프로젝트 폴더를 만들고, 첫 실행까지. 여기서부터 모든 것이 시작됩니다. 앱에서 바로 시작할 수도 있고, 터미널에서 할 수도 있어요.',
    difficulty: 'basic',
    time: '약 7분',
    insight: 'AI는 거울입니다. 방향은 내가 정합니다. 실패를 두려워하지 마세요 — 되돌리기는 언제든 가능해요.',
    installGuide: {
      title: 'Claude Code 설치하기',
      steps: [
        'claude.ai/download 방문 → Claude 앱 다운로드 (Mac / Windows)',
        '앱 설치 후 실행 → Anthropic 계정으로 로그인',
        '프로젝트 폴더 만들기 — 맥: 문서(Documents) 또는 홈 폴더 아래에 "Projects" 폴더를 만들고 그 안에 프로젝트별 폴더를 만들어요. 윈도우: 문서(Documents) 폴더 아래에 같은 방식으로. 바탕화면도 가능하지만, 정리가 어려워져요.',
        '앱 상단의 "코드" 탭 클릭 → 대화창 하단에서 프로젝트 폴더 선택 → 바로 시작!',
      ],
    },
    thinkFirst: {
      question: '클로드 코드를 시작하려면 가장 먼저 할 일은?',
      options: [
        { text: '앱을 설치하고, 내 프로젝트 폴더에서 실행한다' },
        { text: '웹 브라우저에서 바로 코딩한다' },
        { text: '코딩을 먼저 배운다' },
      ],
      correctIndex: 0,
      explanation: '맞아요. 클로드 코드는 내 컴퓨터에서, 내 폴더에서 직접 실행하는 도구예요. 코딩을 몰라도 시작할 수 있어요!',
    },
    comparisonTable: {
      headers: ['방법', '시작 방법', '특징', '추천 대상'],
      rows: [
        ['앱 (코드 탭)', '앱 열기 → 상단 "코드" 탭 → 하단에서 폴더 선택', '마우스로 조작, 초보자 친화적', '처음 시작하는 분'],
        ['터미널/CLI', '터미널 열기 → cd 폴더 → claude 입력', '키보드 중심, 자동화 가능', '터미널에 익숙한 분'],
        ['IDE 확장', 'VS Code/JetBrains에서 확장 설치', '코드 에디터와 통합', '이미 IDE 사용하는 분'],
      ],
    },
    codeBlocks: [
      {
        label: '방법 A — 앱에서 시작하기 (추천)',
        code: `1. Claude 앱 실행
2. 상단 메뉴에서 "코드" 탭 클릭
3. 대화창 하단의 폴더 아이콘으로 프로젝트 폴더 선택
4. 대화창에 바로 명령 입력!`,
        tip: '가장 쉬운 방법이에요. 터미널을 몰라도 됩니다.',
      },
      {
        label: '방법 B — 터미널에서 시작하기',
        code: `mkdir ~/Projects/my-first-project\ncd ~/Projects/my-first-project\nclaude`,
        tip: 'mkdir은 "폴더 만들기", cd는 "폴더로 이동" 명령이에요. 아래 용어 설명에서 자세히 알아보세요.',
      },
      {
        label: '첫 대화 — 어떤 방법이든 똑같이',
        code: '안녕! 이 폴더에 간단한 웹페이지를 만들어줘.\n제목은 "나의 첫 프로젝트"로 해줘.',
        tip: '클로드가 파일을 만들면 폴더에 들어가서 직접 확인해보세요. 더블클릭하면 브라우저에서 열려요!',
      },
    ],
    keywords: [
      { term: 'Claude 앱의 코드 탭', explanation: 'Claude 앱을 열면 상단에 "채팅", "Cowork", "코드" 탭이 있어요. "코드" 탭을 누르면 클로드 코드 모드가 시작돼요. 대화창 하단에서 폴더를 선택하고 바로 대화하면서 코딩할 수 있어요. 터미널을 몰라도 됩니다.' },
      { term: '터미널', explanation: '마우스 대신 텍스트 명령어로 컴퓨터를 조작하는 검은 화면이에요. 맥에서는 기본 앱인 "터미널"(Spotlight에서 "터미널" 검색), 윈도우에서는 "명령 프롬프트" 또는 "PowerShell"이 같은 역할을 해요.' },
      { term: 'mkdir', explanation: '"make directory"의 줄임말로, "폴더 만들기" 명령이에요. mkdir my-project 이라고 치면 my-project라는 이름의 새 폴더가 만들어져요.' },
      { term: 'cd', explanation: '"change directory"의 줄임말로, "폴더 이동" 명령이에요. cd my-project 이라고 치면 그 폴더 안으로 들어가요. cd ~는 홈 폴더(내 기본 위치)로 돌아가는 거예요.' },
      { term: '~ (물결표)', explanation: '내 컴퓨터의 "홈 폴더"를 뜻하는 기호예요. 맥에서는 /Users/내이름, 윈도우에서는 C:\\Users\\내이름 과 같아요. ~/Projects는 "홈 폴더 안의 Projects 폴더"란 뜻이에요.' },
      { term: 'Projects 폴더', explanation: '코딩 프로젝트를 모아두는 전용 폴더예요. 문서(Documents) 폴더나 홈 폴더 바로 아래에 하나 만들어두면 나중에 프로젝트가 여러 개 생겨도 깔끔하게 정리돼요.' },
      { term: '프로젝트 폴더', explanation: '내가 만들 프로그램의 모든 파일이 들어갈 집이에요. 가게로 치면 매장 공간이죠. 클로드는 이 폴더를 기준으로 작업해요.' },
      { term: '루트 디렉토리', explanation: '프로젝트 폴더의 가장 바깥쪽 최상위 위치예요. 건물로 치면 1층 입구에 해당해요. 클로드는 여기서 실행해야 프로젝트 전체를 한눈에 볼 수 있어요.' },
      { term: '웹페이지 (HTML)', explanation: '인터넷에서 보는 모든 화면은 HTML이라는 언어로 만들어져요. 클로드에게 "웹페이지 만들어줘"라고 하면 .html 파일을 만들어주고, 이걸 더블클릭하면 브라우저에서 바로 볼 수 있어요.' },
    ],
    gate: {
      type: 'execute',
      prompt: '클로드 코드를 설치하고 첫 실행을 해보셨나요?',
      checkItems: [
        '클로드 앱을 설치했다',
        '프로젝트 폴더를 만들었다 (어디든 OK)',
        '앱의 Code 탭 또는 터미널에서 클로드를 실행해봤다',
      ],
    },
    ahaMessage: '축하해요! 이제 내 컴퓨터에서 AI와 함께 코딩할 준비가 됐어요! 앱이든 터미널이든, 어디서 해도 결과는 같아요.',
  },
  {
    id: 'C1',
    title: '아이디어를 기획서로 만들기',
    metaphor: '사업계획서 없이 가게를 여는 사람은 없어요',
    description: 'AI와 대화하면서 막연한 아이디어를 구체적인 기획서로 바꿔보세요. "뭘 만들고 싶은지"가 명확해야 클로드도 잘 도와줄 수 있어요.',
    difficulty: 'basic',
    time: '약 7분',
    insight: '좋은 기획서 = 클로드에게 주는 최고의 지시서. 기획이 구체적일수록 결과물 품질이 올라가요.',
    thinkFirst: {
      question: '"앱 하나 만들어줘"라고만 하면?',
      options: [
        { text: '클로드가 알아서 멋진 앱을 만들어요' },
        { text: '클로드가 뭘 만들지 몰라서 엉뚱한 결과가 나와요' },
        { text: '에러가 나요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 클로드는 "어떤 앱인지, 누가 쓰는지, 핵심 기능이 뭔지" 알아야 제대로 만들어요.',
    },
    codeBlocks: [
      {
        label: '기획서 작성 요청',
        code: `나는 [간단한 아이디어 설명]을 만들고 싶어.

다음 항목으로 기획서를 작성해줘:
1. 프로젝트 이름
2. 한 줄 설명
3. 타겟 사용자
4. 핵심 기능 3가지
5. 기술 스택 추천
6. 첫 번째로 만들 MVP 범위`,
        tip: '[간단한 아이디어 설명]에 내 아이디어를 넣으세요. 완벽하지 않아도 됩니다.',
      },
    ],
    keywords: [
      { term: '기획서', explanation: '가게 사업계획서처럼 "뭘 만들 건지, 누구를 위한 건지, 어떻게 만들 건지"를 정리한 문서예요. 이게 있으면 클로드도 정확히 뭘 해야 하는지 알아요.' },
      { term: 'MVP', explanation: '최소 기능 제품(Minimum Viable Product)이에요. 핵심 기능만 먼저 만들어서 빠르게 테스트하는 거예요. 가게로 치면 메뉴 100개 대신 인기 메뉴 3개로 먼저 오픈하는 것이에요.' },
      { term: '기술 스택', explanation: '가게를 지을 때 벽돌로 할지, 나무로 할지 고르듯이 프로그램을 만들 때 어떤 도구/언어를 쓸지 정하는 것이에요. 클로드가 프로젝트에 맞는 최적의 조합을 추천해줘요.' },
    ],
    gate: {
      type: 'input',
      prompt: '만들고 싶은 것을 한 줄로 적어보세요 (완벽하지 않아도 됩니다)',
      placeholder: '예: 우리 팀 회의록을 자동 정리하는 도구',
    },
    ahaMessage: '아이디어가 기획서로 바뀌었어요! 이제 클로드가 뭘 만들어야 하는지 정확히 알아요!',
  },
  {
    id: 'C2',
    title: '시장과 경쟁 서비스 조사',
    metaphor: '옆 가게가 뭘 파는지 먼저 봐야 우리만의 강점이 보여요',
    description: '비슷한 서비스가 이미 있는지, 있다면 우리는 어떻게 차별화할지 AI와 함께 조사해보세요.',
    difficulty: 'basic',
    time: '약 5분',
    insight: '경쟁 조사를 건너뛰면 이미 있는 걸 다시 만드는 실수를 하게 돼요.',
    thinkFirst: {
      question: '비슷한 서비스가 이미 있다면?',
      options: [
        { text: '포기해야 해요' },
        { text: '차별점을 찾아서 더 나은 버전을 만들면 돼요' },
        { text: '모르는 척 하고 만들면 돼요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 경쟁 서비스의 부족한 점을 찾으면 그게 우리의 기회예요.',
    },
    codeBlocks: [
      {
        code: `[내 프로젝트]와 비슷한 서비스를 조사해줘.

각 서비스별로:
- 핵심 기능
- 장점 / 단점
- 가격 정책

마지막에 우리만의 차별점 3가지를 제안해줘.`,
        tip: '클로드가 웹 검색 도구(MCP)를 쓸 수 있으면 더 정확한 결과가 나와요.',
      },
    ],
    keywords: [
      { term: '경쟁 분석', explanation: '옆 가게 메뉴판을 보고 우리 가게만의 시그니처 메뉴를 정하는 과정이에요. 남들이 뭘 하는지 알아야 우리만의 강점을 찾을 수 있어요.' },
      { term: '차별점', explanation: '"우리 가게에서만 먹을 수 있는 메뉴"같은 거예요. 비슷한 서비스는 많지만 이 한 가지 때문에 우리 서비스를 선택하게 만드는 포인트예요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '경쟁 서비스를 조사하고 차별점을 찾는 방법을 이해했나요?',
    },
    ahaMessage: '이제 우리만의 강점이 뭔지 알게 됐어요!',
  },
  {
    id: 'C3',
    title: '프로젝트 셋업 (CLAUDE.md)',
    metaphor: '새 직원에게 회사 매뉴얼을 주듯이, 클로드에게 프로젝트 매뉴얼을 줘요',
    description: '/init 명령어로 CLAUDE.md 파일을 만들어요. 이 파일은 클로드의 두뇌 — 매 세션마다 자동으로 읽어요.',
    difficulty: 'basic',
    time: '약 5분',
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
      { term: 'CLAUDE.md', explanation: '새로 온 알바생에게 주는 업무 매뉴얼 파일이에요. 이게 없으면 클로드는 매번 "우리 프로젝트는 어떻게 돌아가요?"부터 물어봐야 해요.' },
      { term: '/init', explanation: '클로드에게 "프로젝트 매뉴얼 초안을 만들어줘"라고 하는 명령이에요. 현재 폴더를 분석해서 자동으로 CLAUDE.md를 생성해줘요.' },
      { term: '컨벤션(Convention)', explanation: '"우리 팀은 이렇게 쓰기로 해요" 하는 사전 약속이에요. 맞춤법 규칙처럼 코드를 어떻게 쓸지 정해둔 규칙이에요.' },
    ],
    gate: {
      type: 'execute',
      prompt: 'CLAUDE.md를 만들어보셨나요?',
      checkItems: [
        '/init으로 CLAUDE.md를 생성했다',
        '프로젝트 규칙과 구조를 추가했다',
      ],
    },
    ahaMessage: 'CLAUDE.md가 있으면 매 세션마다 클로드가 즉시 맥락을 파악하고 시작해요!',
  },
  {
    id: 'C4',
    title: 'AI에게 제대로 지시하기',
    metaphor: '신입사원에게 업무를 지시할 때, 계획서 없이 "그냥 해봐"라고 하면 안 되죠',
    description: 'Plan Mode로 계획을 먼저 세우고, 승인 후 실행하세요. 이미지 참조, Mermaid 다이어그램도 활용해요.',
    difficulty: 'basic',
    time: '약 7분',
    insight: '플랜 없이 바로 실행 = 엉뚱한 방향으로 코드 대량 생성 위험 / 이미지 1장 = 설명 수백 단어',
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
        label: '2단계 — 이미지로 소통하기',
        code: `원하는 디자인 레퍼런스 이미지를 터미널에 드래그앤드롭 후:

이 디자인 스타일을 참고해서
내 랜딩페이지 헤더를 만들어줘.`,
        tip: '이미지가 텍스트 설명보다 훨씬 정확하고 효율적이에요.',
      },
      {
        label: '3단계 — 계획 검토 후 승인',
        code: '이대로 진행해줘\n(또는: 2번 단계를 먼저 하고 나머지를 진행해줘)',
      },
    ],
    keywords: [
      { term: 'Plan Mode', explanation: '건축가가 벽 쌓기 전에 설계도 먼저 그리는 것처럼, 클로드가 코드를 작성하는 대신 계획서를 먼저 보여주는 모드예요.' },
      { term: '드래그앤드롭', explanation: '파일을 마우스로 꾹 누른 채 끌어서 터미널 창에 올려놓는 동작이에요. 사진을 이렇게 가져다 놓으면 바로 첨부돼요.' },
      { term: 'Mermaid 다이어그램', explanation: '텍스트로 그림을 그리는 마법이에요. "A → B → C"라고 쓰면 자동으로 화살표 흐름도가 만들어져요.' },
    ],
    gate: {
      type: 'execute',
      prompt: 'Plan Mode를 사용해보셨나요?',
      checkItems: [
        'Shift+Tab으로 Plan Mode를 켜봤다',
        '계획을 확인한 후 승인해봤다',
      ],
    },
    ahaMessage: '플랜을 먼저 보고 승인하는 습관 — 이게 고수와 초보의 차이예요!',
  },
  {
    id: 'C5',
    title: '디버깅과 오류 해결',
    metaphor: '불량품 검수 — 문제가 생기면 에러 로그를 그대로 보여주세요',
    description: 'Escape로 멈추고, 에러 로그를 그대로 붙여넣고, 테스트로 품질을 잡아요. AI 코딩의 안전망이에요.',
    difficulty: 'practical',
    time: '약 7분',
    insight: 'AI가 수백 줄을 바꿔도 내가 다 못 봄 → 테스트가 유일한 품질 안전망',
    thinkFirst: {
      question: '클로드가 엉뚱한 방향으로 코드를 쓰고 있다면?',
      options: [
        { text: '끝까지 기다려본다' },
        { text: 'Escape로 즉시 멈추고 방향을 수정한다' },
        { text: '새 세션을 시작한다' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 잘못된 가정 위에 쌓인 코드는 전부 쓸모없어요. 초반에 잡는 게 핵심이에요.',
    },
    codeBlocks: [
      {
        label: 'Escape 연습',
        code: `1. 아무 명령이나 입력 (예: 간단한 버튼 만들어줘)
2. 실행 중간에 Escape 한 번 → 중단 확인
3. Escape 한 번 더 → 이전 프롬프트로 되감기 확인`,
      },
      {
        label: '에러 발생 시 — 로그 그대로 붙여넣기',
        code: `[에러 로그 전체 복사 후 붙여넣기]
이 에러를 분석하고 수정해줘.`,
        tip: '에러 메시지를 해석하려 하지 마세요. 그대로 붙여넣는 게 가장 정확해요.',
      },
      {
        label: '테스트 작성 습관',
        code: `방금 만든 기능에 대한
유닛 테스트를 작성해줘.
테스트가 모두 통과하면 commit해줘.`,
      },
    ],
    keywords: [
      { term: 'Escape', explanation: '달리는 차의 비상 정지 버튼이에요. 클로드가 엉뚱한 방향으로 달릴 때 Escape를 누르면 즉시 멈춰요.' },
      { term: 'Thinking Log', explanation: '클로드가 답하기 전에 혼자 생각하는 과정이 보이는 창이에요. 이상한 가정을 하고 있으면 Escape로 미리 잡을 수 있어요.' },
      { term: '유닛 테스트', explanation: '공장에서 제품 하나씩 품질 검사하듯이, 기능 하나하나가 제대로 작동하는지 자동으로 확인하는 검사예요.' },
    ],
    gate: {
      type: 'execute',
      prompt: 'Escape와 에러 로그 붙여넣기를 실습해보셨나요?',
      checkItems: [
        'Escape로 실행을 중단해봤다',
        '에러 로그를 클로드에 붙여넣어봤다',
      ],
    },
    ahaMessage: 'Escape는 실수를 0원으로 되돌리는 마법 버튼이에요!',
  },
  {
    id: 'C6',
    title: '디자인과 UI 다듬기',
    metaphor: '가게 인테리어 — 기능도 중요하지만 보기 좋은 떡이 먹기도 좋아요',
    description: '이미지 드래그앤드롭으로 원하는 디자인을 정확하게 전달하세요. 스크린샷 피드백으로 UI를 빠르게 개선해요.',
    difficulty: 'practical',
    time: '약 5분',
    insight: 'UI 스타일을 말로 설명하면 토큰 낭비에 결과도 부정확. 이미지 1장이 설명 수백 단어와 동등.',
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
        label: '이미지로 디자인 요청',
        code: `원하는 디자인 레퍼런스 이미지를 터미널에 드래그앤드롭 후:

이 디자인 스타일을 참고해서
내 페이지의 헤더를 만들어줘.
배경은 따뜻한 크림색으로 해줘.`,
      },
      {
        label: '스크린샷으로 수정 요청',
        code: `[현재 화면 스크린샷 드래그앤드롭]

이 화면에서:
1. 버튼 크기를 좀 더 키워줘
2. 간격이 너무 좁아, 패딩을 늘려줘
3. 폰트 색상을 더 진하게 해줘`,
      },
    ],
    keywords: [
      { term: '레퍼런스 이미지', explanation: '헤어샵에서 "이 사진처럼 잘라주세요"하고 보여주는 참고 사진이에요. 말보다 정확하게 의도를 전달해요.' },
      { term: '패딩(Padding)', explanation: '택배 상자 안의 뽁뽁이처럼, 내용물과 테두리 사이의 여백이에요. 패딩이 넉넉하면 답답하지 않고 보기 좋아요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '이미지 드래그앤드롭으로 디자인을 전달하는 방법을 이해했나요?',
    },
    ahaMessage: '이미지 드래그앤드롭 — 이걸 아는 사람과 모르는 사람의 결과물이 달라요!',
  },
  {
    id: 'C7',
    title: '배포하기: 세상에 공개하기',
    metaphor: '가게 오픈! 이제 손님이 찾아올 수 있어요',
    description: '만든 프로젝트를 인터넷에 올려서 누구나 접속할 수 있게 배포해요. 클로드에게 시키면 몇 분이면 돼요.',
    difficulty: 'practical',
    time: '약 7분',
    insight: '배포가 어려운 게 아니라 안 해본 게 어려운 거예요. 클로드와 함께라면 첫 배포도 가능해요.',
    thinkFirst: {
      question: '내가 만든 프로젝트를 다른 사람도 볼 수 있게 하려면?',
      options: [
        { text: '내 컴퓨터를 계속 켜놔야 해요' },
        { text: '인터넷 서버에 배포하면 돼요' },
        { text: '불가능해요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 배포하면 누구든 링크만으로 내 프로젝트에 접속할 수 있어요.',
    },
    codeBlocks: [
      {
        code: `이 프로젝트를 배포하고 싶어.
가장 쉬운 방법으로 배포해줘.
무료 옵션이 있으면 그걸로 해줘.`,
        tip: '정적 사이트는 Vercel/Netlify, 서버가 필요하면 Cloudflare/GCP를 추천해요.',
      },
    ],
    keywords: [
      { term: '배포(Deploy)', explanation: '가게 문을 여는 것이에요. 내 컴퓨터에서만 보이던 프로젝트를 인터넷에 올려서 다른 사람도 볼 수 있게 하는 것이에요.' },
      { term: '서버', explanation: '24시간 열려 있는 가게처럼, 항상 켜져 있어서 누가 접속해도 응답해주는 컴퓨터예요. 내 컴퓨터 대신 클라우드의 컴퓨터를 빌리는 거예요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '배포의 개념과 방법을 이해했나요?',
    },
    ahaMessage: '내가 만든 것이 세상에 나왔어요! 링크를 누구에게든 공유할 수 있어요!',
  },
  {
    id: 'C8',
    title: '피드백 받고 개선하기',
    metaphor: '손님 반응을 보고 메뉴를 개선하는 과정이에요',
    description: 'todo.md로 클로드와 작업을 공유하고, 피드백을 반영해서 계속 개선해요. 며칠에 걸친 프로젝트도 맥락을 잃지 않아요.',
    difficulty: 'practical',
    time: '약 5분',
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
        code: '오늘 해야 할 작업 목록을\ntodo.md 파일에 체크리스트로 만들어줘.',
      },
      {
        label: '2단계 — 작업 시작',
        code: 'todo.md 파일 읽고\n첫 번째 항목부터 시작해줘.',
      },
      {
        label: '3단계 — 세션 종료 전',
        code: '오늘 완료한 항목을 todo.md에 업데이트해줘.',
      },
    ],
    keywords: [
      { term: 'todo.md', explanation: '클로드와 함께 보는 할 일 목록 파일이에요. 새 세션에서 이 파일을 보여주면 클로드가 어디서 이어서 시작할지 바로 알아요.' },
      { term: '연속성', explanation: '드라마를 다음 날 이어 보는 것처럼, 여러 날에 걸쳐 작업해도 맥락이 끊기지 않고 이어지는 것이에요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: 'todo.md로 작업을 관리하는 방법을 이해했나요?',
    },
    ahaMessage: 'todo.md가 있으면 며칠에 걸친 프로젝트도 맥락을 잃지 않아요!',
  },
  {
    id: 'C8.5',
    title: '성찰 체크포인트',
    metaphor: '가게 운영 중간 점검 — 내가 직접 판단하고 있는지 돌아보기',
    description: '"생각의 외주화"를 방지하는 시간이에요. AI가 만든 결과를 무조건 수락하지 말고, 내가 이해하고 판단하고 있는지 체크해요.',
    difficulty: 'practical',
    time: '약 3분',
    insight: 'AI가 시키는 대로만 하면 여러분은 AI의 조수가 돼요. 방향은 항상 내가 정해야 해요.',
    thinkFirst: {
      question: '클로드가 제안한 코드를 무조건 수락하면?',
      options: [
        { text: '빠르게 진행돼서 좋아요' },
        { text: '내가 이해 못 한 코드가 쌓여서 나중에 문제가 돼요' },
        { text: '클로드가 알아서 잘 해줘요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 이해 없이 수락하면 "내 프로젝트"가 아니라 "AI가 만든 프로젝트"가 돼요.',
    },
    codeBlocks: [
      {
        label: '성찰 질문 3가지',
        code: `스스로에게 물어보세요:

1. 클로드가 왜 이렇게 만들었는지 설명할 수 있는가?
2. 이 결과물의 방향을 내가 정했는가, AI가 정했는가?
3. 다음에 비슷한 상황이 오면 클로드 없이도 판단할 수 있는가?`,
      },
    ],
    keywords: [
      { term: '생각의 외주화', explanation: '모든 판단을 AI에게 맡기고 나는 그냥 "확인" 버튼만 누르는 상태예요. 편리하지만 위험해요 — 내 프로젝트인데 내가 모르는 코드투성이가 되니까요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '위 3가지 질문에 스스로 답해보셨나요?',
    },
    ahaMessage: 'AI는 도구이고, 방향은 내가 정한다 — 이 원칙을 잊지 마세요!',
  },
];

// ===== 선택적 공통 모듈 (C9 ~ C13) =====

export const optionalModules: Module[] = [
  {
    id: 'C9',
    title: '결제 연동',
    metaphor: '가게에 카드 결제기를 설치하는 거예요',
    description: 'Stripe, Toss Payments 등으로 실제 결제를 받을 수 있게 연동해요.',
    difficulty: 'advanced',
    time: '약 15분',
    isOptional: true,
    insight: '결제는 절대 직접 만들지 마세요. Stripe 하나로 100개국 통화, 사기 탐지, PCI 인증을 모두 해결할 수 있어요.',
    thinkFirst: {
      question: '결제 시스템을 직접 만들어야 할까요?',
      options: [
        { text: '네, 처음부터 만들어야 해요' },
        { text: '아니요, 검증된 결제 서비스를 연동하는 게 안전해요' },
        { text: '결제 기능 없이도 돼요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 결제는 보안이 중요해서 Stripe 같은 전문 서비스를 연동하는 게 안전하고 빨라요.',
    },
    codeBlocks: [
      {
        code: `이 프로젝트에 결제 기능을 추가하고 싶어.
Stripe를 연동해서 월 구독 결제를 받을 수 있게 해줘.

필요한 것:
- 가격 페이지
- 결제 버튼
- 결제 성공/실패 처리`,
      },
    ],
    keywords: [
      { term: 'Stripe', explanation: '전 세계에서 가장 많이 쓰는 온라인 결제 서비스예요. 신용카드, 계좌이체 등 다양한 결제를 처리해줘요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '결제 연동 방법을 이해했나요?',
    },
    ahaMessage: '이제 여러분의 서비스로 수익을 만들 수 있어요!',
  },
  {
    id: 'C10',
    title: '데이터베이스 연결',
    metaphor: '가게 창고 — 데이터를 안전하게 보관하는 곳이에요',
    description: '사용자 정보, 게시물, 설정 값 등을 저장하고 불러오는 데이터베이스를 연결해요.',
    difficulty: 'practical',
    time: '약 10분',
    isOptional: true,
    insight: '새로고침하면 사라지는 데이터는 진짜 서비스가 아니에요. DB 연결 하나로 여러분의 앱이 진짜 제품이 됩니다.',
    thinkFirst: {
      question: '데이터베이스가 왜 필요할까요?',
      options: [
        { text: '멋있어 보여서' },
        { text: '사용자 데이터를 저장하고 다시 불러오려면 필요해요' },
        { text: '없어도 상관없어요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 페이지를 새로고침해도 데이터가 사라지지 않으려면 데이터베이스가 필요해요.',
    },
    codeBlocks: [
      {
        code: `이 프로젝트에 Supabase 데이터베이스를 연결해줘.

필요한 테이블:
- users (이름, 이메일)
- [프로젝트에 맞는 테이블]

CRUD 기능을 포함해줘.`,
        tip: 'Supabase는 무료 플랜으로 시작할 수 있어요.',
      },
    ],
    keywords: [
      { term: '데이터베이스(DB)', explanation: '엑셀 표 같은 거예요. 행과 열로 데이터를 정리해서 저장하고, 필요할 때 검색해서 꺼내요.' },
      { term: 'CRUD', explanation: '데이터 관리의 기본 4가지: 만들기(Create), 읽기(Read), 수정(Update), 삭제(Delete)예요.' },
      { term: 'Supabase', explanation: '무료로 시작할 수 있는 데이터베이스 서비스예요. 별도 서버 없이 바로 데이터를 저장할 수 있어요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '데이터베이스 연결 방법을 이해했나요?',
    },
    ahaMessage: '이제 데이터를 안전하게 저장하고 불러올 수 있어요!',
  },
  {
    id: 'C11',
    title: '인증과 로그인',
    metaphor: '가게 출입증 — 누가 들어왔는지 확인하는 시스템이에요',
    description: '회원가입, 로그인, 로그아웃 기능을 추가해요. 소셜 로그인도 가능해요.',
    difficulty: 'practical',
    time: '약 10분',
    isOptional: true,
    insight: '비밀번호를 직접 저장하면 해킹 시 사용자 피해가 직결돼요. Supabase Auth나 소셜 로그인을 쓰면 이 책임을 전문가에게 맡길 수 있어요.',
    thinkFirst: {
      question: '로그인 시스템을 직접 만들어야 할까요?',
      options: [
        { text: '비밀번호 저장부터 직접 구현해야 해요' },
        { text: 'Supabase Auth 같은 서비스를 쓰면 안전하게 빠르게 만들 수 있어요' },
        { text: '로그인 없이도 다 되요' },
      ],
      correctIndex: 1,
      explanation: '맞아요. 인증은 보안이 중요해서 검증된 서비스를 쓰는 게 안전해요.',
    },
    codeBlocks: [
      {
        code: `이 프로젝트에 로그인 기능을 추가해줘.
Supabase Auth를 사용하고,
구글 소셜 로그인도 포함해줘.`,
      },
    ],
    keywords: [
      { term: '인증(Authentication)', explanation: '"여러분이 정말 여러분이 맞는지" 확인하는 과정이에요. 신분증 검사와 같아요.' },
      { term: '소셜 로그인', explanation: '구글, 카카오 계정으로 한 번에 로그인하는 기능이에요. 별도 회원가입 없이 기존 계정을 그대로 써요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: '인증 시스템 구현 방법을 이해했나요?',
    },
    ahaMessage: '이제 사용자별로 맞춤 경험을 제공할 수 있어요!',
  },
  {
    id: 'C12',
    title: '자동화: Skills, Agents, Hooks',
    metaphor: '업무 매뉴얼 표준화 + 팀원 채용 + 자동 파이프라인',
    description: '반복 업무를 Skill로, 독립 작업을 Subagent로, 이벤트 기반 자동화를 Hook으로. 진짜 에이전틱 엔지니어링의 시작이에요.',
    difficulty: 'advanced',
    time: '약 20분',
    isOptional: true,
    insight: 'Skill: 이름+설명만 로드 → 20개 만들어도 부담 없음 / Subagent: 별도 컨텍스트 / Hook: 이벤트 트리거',
    comparisonTable: {
      headers: ['항목', '프롬프트', 'CLAUDE.md', 'MCP', 'Skill'],
      rows: [
        ['평소 컨텍스트', '없음', '항상 차지', '항상 차지', '거의 없음(50바이트)'],
        ['재사용성', '수동 복붙', '자동 로드', '자동 로드', '자동 트리거'],
        ['용도', '일회성', '핵심 규칙', '외부 도구', '반복 업무'],
      ],
    },
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
    codeBlocks: [
      {
        label: 'Skill 만들기',
        code: `[내가 자주 하는 반복 작업] 자동화 스킬을 만들어줘.
입력: [필요한 정보들]
출력: [원하는 결과물 형태]
트리거 표현 예시: [실제로 말할 법한 표현 3개]`,
      },
      {
        label: 'Subagent 만들기',
        code: `/agents
→ Create new agent
→ 너는 [역할명] 전담 AI야.
→ 모델: Sonnet (권장) / Memory: Enable`,
      },
      {
        label: 'Hook 설정',
        code: `git commit 직전에 자동으로 테스트가
실행되는 Hook을 만들어줘.
테스트 실패 시: commit 중단
테스트 통과 시: commit 진행`,
      },
    ],
    keywords: [
      { term: 'Skill', explanation: '클로드에게 만들어주는 업무 매뉴얼이에요. 한 번 만들면 "주간 보고서 써줘"라고만 해도 정해진 형식으로 자동 실행돼요.' },
      { term: 'Subagent', explanation: '메인 클로드와 별도로 고용한 AI 직원이에요. 자기만의 작업 공간에서 일하고 결과만 보고해줘요.' },
      { term: 'Hook', explanation: '현관문이 열리면 자동으로 조명이 켜지는 스마트홈처럼, 특정 이벤트 발생 시 자동으로 실행되는 장치예요.' },
    ],
    gate: {
      type: 'confirm',
      prompt: 'Skill, Subagent, Hook의 차이를 이해했나요?',
    },
    ahaMessage: '이제 AI 팀을 설계하고 지휘하는 에이전틱 엔지니어가 됐어요!',
  },
  {
    id: 'C13',
    title: '컨텍스트 관리 마스터',
    metaphor: '가게 창고 정리 — 어디에 뭐가 있는지 알아야 효율적으로 일해요',
    description: '슬래시 명령어, Lazy Loading, MCP 관리, 한 세션=한 기능 원칙. 토큰을 아끼고 품질을 높이는 비결이에요.',
    difficulty: 'practical',
    time: '약 10분',
    isOptional: true,
    insight: '컨텍스트 = 클로드의 단기 기억 / 꽉 차면 성능 급락',
    thinkFirst: {
      question: '/compact와 /clear의 차이는?',
      options: [
        { text: '/compact는 요약을 유지하며 정리, /clear는 전부 삭제해요' },
        { text: '완전히 같아요' },
        { text: '/compact가 더 강력해요' },
      ],
      correctIndex: 0,
      explanation: '맞아요. compact는 핵심 기억은 남기고 공간만 확보해요.',
    },
    codeBlocks: [
      {
        label: '핵심 슬래시 명령어',
        code: `/context   → 현재 토큰 사용량 확인
/clear     → 컨텍스트 전체 초기화
/compact   → 요약 유지 + 공간 확보
/memory    → 기억 저장/확인
/mcp       → 연결된 도구 목록 확인`,
      },
      {
        label: 'Lazy Loading 구조',
        code: `내 CLAUDE.md를 Lazy Loading 구조로 리팩토링해줘.
API 스펙, DB 스키마, 상세 컨벤션은
별도 파일(docs/)로 분리하고
CLAUDE.md에는 참조 경로만 남겨줘.`,
      },
      {
        label: 'MCP 관리',
        code: '/mcp → 목록에서 지금 작업에 불필요한 MCP 옆 disable 클릭',
        tip: 'MCP는 연결만 해도 컨텍스트를 차지해요. 쓸 때만 켜세요.',
      },
    ],
    keywords: [
      { term: '컨텍스트(Context)', explanation: '클로드의 단기 기억이에요. 대화가 길어질수록 점점 꽉 차서 예전 내용을 잊어버리기 시작해요.' },
      { term: 'Lazy Loading', explanation: '식당 메뉴판에 모든 사진을 싣지 않고, "이거 보여줘"할 때만 가져오는 방식이에요.' },
      { term: 'MCP', explanation: '클로드에 꽂는 USB 포트 같은 거예요. Notion, GitHub 같은 외부 서비스에 연결하게 해주는 플러그인이에요.' },
    ],
    gate: {
      type: 'execute',
      prompt: '슬래시 명령어를 실행해보셨나요?',
      checkItems: [
        '/context로 토큰 사용량을 확인해봤다',
        '/compact 또는 /clear를 사용해봤다',
      ],
    },
    ahaMessage: '컨텍스트를 관리하는 순간 클로드의 답변 품질이 확 달라져요!',
  },
];

// ===== 유틸리티 =====

export const allModules: Module[] = [...commonModules, ...optionalModules];

export function getModule(id: string): Module | undefined {
  return allModules.find((m) => m.id === id);
}
