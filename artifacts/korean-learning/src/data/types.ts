// ===== 게이트 시스템 =====
export type GateType = 'confirm' | 'input' | 'execute';

export interface Gate {
  type: GateType;
  prompt: string;
  placeholder?: string;     // input 타입용
  checkItems?: string[];    // execute 타입용
}

// ===== 기존 유지 타입 =====
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

// ===== 모듈 (기존 Step 대체) =====
export interface Module {
  id: string;                // "C0", "C1", ..., "T1-1", "T2-1" 등
  title: string;
  metaphor?: string;         // "가게 창업" 비유
  description: string;
  difficulty: 'basic' | 'practical' | 'advanced';
  time: string;
  insight?: string;
  thinkFirst?: ThinkFirst;
  installGuide?: {
    title: string;
    steps: string[];
  };
  codeBlocks: CodeBlock[];
  keywords?: Keyword[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  gate: Gate;
  ahaMessage: string;
  isOptional?: boolean;
  showDreamProject?: boolean;
}

// ===== 트랙 =====
export type TrackId = 'automation' | 'landing' | 'dashboard' | 'freestyle';

export interface HookCopy {
  entry: string;      // 트랙 진입 시
  midpoint: string;   // 중간 성취
  completion: string; // 완료 시
}

export interface Track {
  id: TrackId;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;             // 트랙별 테마 컬러
  hookCopy: HookCopy;
  moduleSequence: string[];  // ["C0","C1",...,"T1-1","C5",...]
  midpointModuleId: string;  // 중간 성취 후킹 카피 표시 지점
}

// ===== 스크린 =====
export type Screen = 'onboarding' | 'track-selection' | 'learning' | 'completion';
