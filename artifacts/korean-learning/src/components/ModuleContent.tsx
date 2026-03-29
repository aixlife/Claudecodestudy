import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppStore, resolveModule } from '../store/useAppStore';
import { getTrack } from '../data/tracks';
import GateSystem from './GateSystem';
import PromptBuilder from './PromptBuilder';
import Footer from './Footer';
import type { Module, CodeBlock, Keyword } from '../data/types';

// ===== 스크롤 시 페이드인되는 섹션 래퍼 =====
function ScrollSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {children}
    </div>
  );
}

// ===== 섹션 구분선 =====
function SectionDivider() {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="flex-1 h-px bg-[#E8E0D6]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#D97757]/40" />
      <div className="flex-1 h-px bg-[#E8E0D6]" />
    </div>
  );
}

// URL을 클릭 가능한 링크로 변환
function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s]*|claude\.ai\/[^\s]*)/g;
  const parts = text.split(urlRegex);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0;
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-[#D97757] underline hover:text-[#B85C35] transition-colors">
          {part}
        </a>
      );
    }
    return part;
  });
}

// 코드 블록 컴포넌트
function CodeBlockView({ block }: { block: CodeBlock }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(block.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-5">
      {block.label && (
        <p className="text-sm font-semibold text-[#6B6560] mb-2">{block.label}</p>
      )}
      <div className="relative group">
        <pre className="code-block p-5 rounded-xl text-base overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {block.code}
        </pre>
        <button
          onClick={copy}
          className="absolute top-3 right-3 px-3 py-1.5 text-sm rounded-md bg-[#2A2520] text-[#9D9087] hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? '복사됨!' : '복사'}
        </button>
      </div>
      {block.tip && (
        <p className="mt-2 text-sm text-[#9D9087] leading-relaxed">Tip: {block.tip}</p>
      )}
    </div>
  );
}

// 키워드 섹션
function KeywordsSection({ keywords }: { keywords: Keyword[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div>
      <p className="text-sm font-semibold text-[#9D9087] mb-3">용어 설명</p>
      <div className="space-y-2">
        {keywords.map((kw) => (
          <div key={kw.term} className="rounded-lg border border-[#E8E0D6] overflow-hidden">
            <button
              onClick={() => setExpanded((p) => ({ ...p, [kw.term]: !p[kw.term] }))}
              className="w-full text-left px-4 py-3 flex items-center justify-between text-base hover:bg-[#F5F0EB] transition-colors"
            >
              <span className="font-medium text-[#D97757]">{kw.term}</span>
              <span className="text-[#9D9087] text-sm">{expanded[kw.term] ? '▲' : '▼'}</span>
            </button>
            {expanded[kw.term] && (
              <div className="px-4 pb-3 text-sm text-[#6B6560] leading-relaxed border-t border-[#E8E0D6] pt-3">
                {kw.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a
          href={`https://www.perplexity.ai/search?q=${encodeURIComponent(keywords.map(k => k.term).join(', ') + ' 프로그래밍 용어 설명')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#9D9087] hover:text-[#D97757] transition-colors"
        >
          <span>여기 없는 용어는 <span className="underline">스스로 찾아보기</span></span>
        </a>
      </div>
    </div>
  );
}

// ThinkFirst 퀴즈
function ThinkFirstQuiz({ thinkFirst }: { thinkFirst: NonNullable<Module['thinkFirst']> }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-6 bg-white rounded-xl border border-[#E8E0D6]">
      <p className="text-sm font-semibold text-[#D97757] mb-2">먼저 생각해보기</p>
      <p className="text-lg font-medium text-[#1A1714] mb-4">{thinkFirst.question}</p>
      <div className="space-y-3">
        {thinkFirst.options.map((opt, i) => {
          const isCorrect = i === thinkFirst.correctIndex;
          const isSelected = selected === i;
          const showResult = selected !== null;

          return (
            <button
              key={i}
              onClick={() => selected === null && setSelected(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all text-base ${
                showResult && isSelected && isCorrect
                  ? 'border-[#2D7D52] bg-[#E8F5EE]'
                  : showResult && isSelected && !isCorrect
                  ? 'border-[#D97757] border-dashed bg-[#FCEEE7]'
                  : showResult && isCorrect
                  ? 'border-[#2D7D52]/30 bg-[#E8F5EE]/50'
                  : 'border-[#E8E0D6] hover:border-[#D97757]/50'
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-4 p-4 bg-[#E8F5EE] rounded-lg text-base text-[#2D7D52] slide-up">
          {thinkFirst.explanation}
        </div>
      )}
    </div>
  );
}

export default function ModuleContent() {
  const currentModuleId = useAppStore((s) => s.currentModuleId);
  const selectedTrack = useAppStore((s) => s.selectedTrack);
  const completedModules = useAppStore((s) => s.completedModules);
  const gateResponses = useAppStore((s) => s.gateResponses);
  const dreamProject = useAppStore((s) => s.dreamProject);
  const completeModule = useAppStore((s) => s.completeModule);
  const saveGateResponse = useAppStore((s) => s.saveGateResponse);
  const setCurrentModule = useAppStore((s) => s.setCurrentModule);
  const getNextModuleId = useAppStore((s) => s.getNextModuleId);
  const getCurrentModuleIndex = useAppStore((s) => s.getCurrentModuleIndex);
  const getTotalModules = useAppStore((s) => s.getTotalModules);

  const mod = resolveModule(currentModuleId);
  const track = selectedTrack ? getTrack(selectedTrack) : null;
  const isCompleted = completedModules.includes(currentModuleId);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAha, setShowAha] = useState(false);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 중간 성취 후킹 카피
  const isMidpoint = track?.midpointModuleId === currentModuleId;

  const handleComplete = useCallback(() => {
    if (isCompleted) return;
    completeModule(currentModuleId);
    setShowConfetti(true);
    setShowAha(true);
    setTimeout(() => setShowConfetti(false), 1500);

    // 자동 다음 이동 (사이드바 클릭 시 취소됨)
    const nextId = getNextModuleId();
    if (nextId) {
      autoAdvanceRef.current = setTimeout(() => setCurrentModule(nextId), 1500);
    }
  }, [currentModuleId, isCompleted]);

  // 다음 이동 (완료 후 수동)
  const goNext = () => {
    const nextId = getNextModuleId();
    if (nextId) setCurrentModule(nextId);
  };

  // 모듈 변경 시 상태 리셋 + 자동이동 타이머 취소
  useEffect(() => {
    setShowAha(false);
    setShowConfetti(false);
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, [currentModuleId]);

  if (!mod) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#9D9087]">
        모듈을 찾을 수 없습니다 ({currentModuleId})
      </div>
    );
  }

  const idx = getCurrentModuleIndex();
  const total = getTotalModules();
  const difficultyLabel =
    mod.difficulty === 'basic' ? '기초' :
    mod.difficulty === 'practical' ? '실전' : '고급';

  // 섹션 카운터 (동적으로 존재하는 섹션만 번호 부여)
  let sectionNum = 0;
  const nextSection = () => ++sectionNum;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="confetti-particle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#D97757', '#2D7D52', '#FEE500', '#3B82F6', '#8B5CF6'][i % 5],
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-[900px] mx-auto px-8 py-10">

        {/* ===== 헤더 섹션: 배지 + 제목 + 설명 (즉시 표시) ===== */}
        <div>
          {/* 트랙 진입 후킹 카피 (첫 모듈에서만) */}
          {idx === 0 && track && (
            <div className="mb-8 p-5 rounded-xl border-2 border-dashed" style={{ borderColor: track.color + '40', backgroundColor: track.color + '08' }}>
              <p className="text-base font-medium italic text-[#1A1714]">"{track.hookCopy.entry}"</p>
            </div>
          )}

          {/* 배지 */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-sm px-3 py-1 rounded-full bg-[#F5F0EB] text-[#9D9087] font-medium">
              {idx + 1}/{total}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-[#F5F0EB] text-[#9D9087]">
              {difficultyLabel}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-[#F5F0EB] text-[#9D9087]">
              {mod.time}
            </span>
            {mod.isOptional && (
              <span className="text-sm px-3 py-1 rounded-full bg-[#FCEEE7] text-[#D97757]">선택</span>
            )}
          </div>

          {/* 제목 */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1714] mb-3">{mod.title}</h1>
          {mod.metaphor && (
            <p className="text-base text-[#D97757] italic mb-5">{mod.metaphor}</p>
          )}

          {/* 설명 */}
          <p className="text-lg text-[#6B6560] leading-relaxed">{mod.description}</p>
        </div>

        {/* ===== 꿈 프로젝트 ===== */}
        {mod.showDreamProject && dreamProject && (
          <ScrollSection>
            <SectionDivider />
            <div className="p-5 bg-[#FCEEE7] rounded-xl border border-[#D97757]/20">
              <p className="text-sm text-[#9D9087] mb-1">나의 프로젝트</p>
              <p className="text-lg font-semibold text-[#1A1714]">{dreamProject}</p>
            </div>
          </ScrollSection>
        )}

        {/* ===== 인사이트 ===== */}
        {mod.insight && (
          <ScrollSection delay={80}>
            <SectionDivider />
            <div className="p-5 bg-[#F5F0EB] rounded-xl border-l-4 border-[#D97757]">
              <p className="text-sm font-semibold text-[#D97757] mb-1">핵심 포인트</p>
              <p className="text-base text-[#1A1714] leading-relaxed">{mod.insight}</p>
            </div>
          </ScrollSection>
        )}

        {/* ===== 설치 가이드 ===== */}
        {mod.installGuide && (
          <ScrollSection delay={80}>
            <SectionDivider />
            <div className="p-6 bg-white rounded-xl border border-[#E8E0D6]">
              <p className="text-lg font-semibold text-[#1A1714] mb-4">{mod.installGuide.title}</p>
              <ol className="space-y-3">
                {mod.installGuide.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-[#6B6560]">
                    <span className="w-7 h-7 rounded-full bg-[#FCEEE7] text-[#D97757] flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{linkifyText(step)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollSection>
        )}

        {/* ===== ThinkFirst 퀴즈 ===== */}
        {mod.thinkFirst && (
          <ScrollSection delay={80}>
            <SectionDivider />
            <ThinkFirstQuiz key={currentModuleId} thinkFirst={mod.thinkFirst} />
          </ScrollSection>
        )}

        {/* ===== 비교 테이블 ===== */}
        {mod.comparisonTable && (
          <ScrollSection delay={80}>
            <SectionDivider />
            <div className="overflow-x-auto">
              <table className="w-full text-base border border-[#E8E0D6] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#F5F0EB]">
                    {mod.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-[#1A1714] border-b border-[#E8E0D6]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mod.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#E8E0D6] last:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-sm text-[#6B6560]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollSection>
        )}

        {/* ===== 코드 블록 ===== */}
        {mod.codeBlocks.length > 0 && (
          <ScrollSection delay={80}>
            <SectionDivider />
            <div>
              {mod.codeBlocks.map((block, i) => (
                <CodeBlockView key={i} block={block} />
              ))}
            </div>
          </ScrollSection>
        )}

        {/* ===== 키워드 ===== */}
        {mod.keywords && mod.keywords.length > 0 && (
          <ScrollSection delay={80}>
            <SectionDivider />
            <KeywordsSection keywords={mod.keywords} />
            <div className="mt-4 text-right">
              <a
                href="https://www.perplexity.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-[#9D9087] hover:text-[#D97757] transition-colors underline"
              >
                여기 없는 용어, 스스로 찾아보기 →
              </a>
            </div>
          </ScrollSection>
        )}

        {/* ===== 중간 성취 후킹 카피 ===== */}
        {isMidpoint && isCompleted && track && (
          <ScrollSection>
            <div className="mt-8 p-5 rounded-xl border-2" style={{ borderColor: track.color, backgroundColor: track.color + '10' }}>
              <p className="text-base font-bold text-[#1A1714]">{track.hookCopy.midpoint}</p>
            </div>
          </ScrollSection>
        )}

        {/* ===== 게이트 시스템 ===== */}
        <ScrollSection delay={100}>
          <GateSystem
            gate={mod.gate}
            moduleId={currentModuleId}
            isCompleted={isCompleted}
            savedResponse={gateResponses[currentModuleId]}
            onComplete={handleComplete}
            onSaveResponse={saveGateResponse}
          />
        </ScrollSection>

        {/* C4 완료 후 프롬프트 빌더 표시 (학습 중간에 실습 유도) */}
        {currentModuleId === 'C4' && isCompleted && (
          <ScrollSection delay={100}>
            <SectionDivider />
            <PromptBuilder />
          </ScrollSection>
        )}

        {/* Aha 메시지 */}
        {(isCompleted || showAha) && (
          <div className="mt-5 p-5 bg-[#E8F5EE] rounded-xl text-[#2D7D52] text-base font-medium slide-up">
            {mod.ahaMessage}
          </div>
        )}

        {/* 다음 버튼 (완료 후) */}
        {isCompleted && getNextModuleId() && (
          <button
            onClick={goNext}
            className="mt-8 w-full py-4 bg-[#D97757] text-white rounded-xl text-lg font-semibold hover:bg-[#B85C35] transition-colors"
          >
            다음 모듈로 →
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
