import { useState, useEffect, useRef } from 'react';
import { Step } from '../data/steps';
import { useAppStore } from '../store/useAppStore';

interface StepContentProps {
  step: Step;
  onComplete: () => void;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-full transition-all duration-150"
      style={{
        border: '1px solid rgba(232,224,214,0.3)',
        color: copied ? '#2D7D52' : '#9D9087',
        fontSize: 11,
        padding: '3px 10px',
        background: 'rgba(255,255,255,0.05)',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {copied ? '복사됨 ✓' : '복사'}
    </button>
  );
}

interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

function Confetti({ active }: { active: boolean }) {
  const colors = ['#D97757', '#FCEEE7', '#B85C35', '#F5F0EB', '#FFD700'];
  const particles: ConfettiParticle[] = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + i * 12,
    color: colors[i % colors.length],
    delay: i * 0.1,
    size: 6 + Math.random() * 4,
  }));

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm confetti-particle"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: `${45 + p.x}%`,
            top: '40%',
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function StepContent({ step, onComplete }: StepContentProps) {
  const { dreamProject, completedSteps } = useAppStore();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAha, setShowAha] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isCompleted = completedSteps.includes(step.id);

  useEffect(() => {
    setSelectedOption(null);
    setShowAha(false);
    setShowHint(false);
    setShowConfetti(false);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step.id]);

  useEffect(() => {
    if (isCompleted) {
      setShowAha(true);
    }
  }, [isCompleted]);

  const handleComplete = () => {
    setShowConfetti(true);
    setShowAha(true);
    setTimeout(() => setShowConfetti(false), 1400);
    onComplete();
  };

  const difficultyColor: Record<string, string> = {
    '🟢기초': '#2D7D52',
    '🟡실전': '#B87D2B',
    '🔴고급': '#C0392B',
  };

  const difficultyBg: Record<string, string> = {
    '🟢기초': '#E8F5EE',
    '🟡실전': '#FEF9EE',
    '🔴고급': '#FDECEA',
  };

  const chapterLabel = ['', '1편 · 입문편', '2편 · 실전편', '3편 · 고급편'][step.chapter];

  return (
    <div
      ref={contentRef}
      className="flex-1 overflow-y-auto"
      style={{ background: '#FAF9F6' }}
    >
      <Confetti active={showConfetti} />

      <div className="max-w-[720px] mx-auto px-6 py-8 pb-20">
        {/* Step header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {/* Step badge */}
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: '#F5F0EB', color: '#6B6560' }}
            >
              Step {step.id}
            </span>
            {/* Difficulty */}
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: difficultyBg[step.difficulty] || '#F5F0EB',
                color: difficultyColor[step.difficulty] || '#6B6560',
              }}
            >
              {step.difficulty}
            </span>
            {/* Chapter */}
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: '#FCEEE7', color: '#D97757' }}
            >
              {chapterLabel}
            </span>
            {/* Time */}
            <span style={{ fontSize: 12, color: '#9D9087' }}>{step.time}</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A1714', lineHeight: 1.3, marginBottom: 10 }}>
            {step.title}
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.7 }}>
            {step.description}
          </p>
        </div>

        {/* Dream project highlight (step 3-6) */}
        {step.showDreamProject && dreamProject && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{ background: '#FCEEE7', border: '2px solid #D97757' }}
          >
            <div style={{ fontSize: 11, color: '#D97757', fontWeight: 600, marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              나의 목표
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1714' }}>
              {dreamProject}
            </div>
          </div>
        )}

        {/* Insight box */}
        {step.insight && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{ background: '#FCEEE7', borderLeft: '3px solid #D97757' }}
          >
            <div
              style={{ fontSize: 11, color: '#D97757', fontWeight: 700, marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              핵심 포인트
            </div>
            <div style={{ fontSize: 14, color: '#1A1714', lineHeight: 1.6 }}>{step.insight}</div>
          </div>
        )}

        {/* Install guide */}
        {step.installGuide && (
          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1714', marginBottom: 12 }}>
              📦 {step.installGuide.title}
            </div>
            <ol className="space-y-2">
              {step.installGuide.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ background: '#D97757', fontSize: 11, marginTop: 1 }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 14, color: '#1A1714', lineHeight: 1.5 }}>
                    {s.includes('claude.ai/download') ? (
                      <>
                        <a
                          href="https://claude.ai/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#D97757', textDecoration: 'underline' }}
                        >
                          claude.ai/download
                        </a>{' '}
                        방문 → 링크 클릭
                      </>
                    ) : s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Think First */}
        {step.thinkFirst && (
          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1714', marginBottom: 10 }}>
              잠깐, 먼저 생각해볼까요? 🤔
            </div>
            <div style={{ fontSize: 15, color: '#1A1714', marginBottom: 14, lineHeight: 1.6 }}>
              {step.thinkFirst.question}
            </div>
            <div className="space-y-2">
              {step.thinkFirst.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === step.thinkFirst!.correctIndex;
                const hasSelected = selectedOption !== null;
                let className = 'option-card';
                if (isSelected && isCorrect) className += ' selected-correct';
                else if (isSelected && !isCorrect) className += ' selected-incorrect';
                else if (hasSelected && !isSelected) className += ' selected-other';

                return (
                  <div
                    key={idx}
                    className={className}
                    onClick={() => !hasSelected && setSelectedOption(idx)}
                    style={{ userSelect: 'none' }}
                  >
                    <div style={{ fontSize: 14, color: '#1A1714', lineHeight: 1.5 }}>
                      {String.fromCharCode(65 + idx)}. {opt.text}
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedOption !== null && (
              <div
                className="rounded-lg p-3 mt-3 explanation-slide"
                style={{
                  background: selectedOption === step.thinkFirst.correctIndex ? '#E8F5EE' : '#FCEEE7',
                  border: `1px solid ${selectedOption === step.thinkFirst.correctIndex ? '#2D7D52' : '#D97757'}`,
                }}
              >
                {selectedOption === step.thinkFirst.correctIndex ? (
                  <div className="flex items-start gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 mt-0.5"
                      style={{ background: '#2D7D52', color: 'white' }}
                    >
                      ✓ 맞아요!
                    </span>
                    <span style={{ fontSize: 13, color: '#1A1714', lineHeight: 1.5 }}>
                      {step.thinkFirst.explanation}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: '#1A1714' }}>
                    한 번 더 생각해봐요 🙂 다른 선택지도 눌러보세요!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Comparison table (step 3-1) */}
        {step.comparisonTable && (
          <div
            className="rounded-xl overflow-hidden mb-6"
            style={{ border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F5F0EB' }}>
                  {step.comparisonTable.headers.map((h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: '10px 14px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#1A1714',
                        textAlign: 'left',
                        borderBottom: '1px solid #E8E0D6',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.comparisonTable.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{ background: ri % 2 === 0 ? '#FFFFFF' : '#FAF9F6' }}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: '10px 14px',
                          fontSize: 13,
                          color: ci === 4 ? '#D97757' : '#1A1714',
                          fontWeight: ci === 4 ? 600 : 400,
                          borderBottom: ri < step.comparisonTable!.rows.length - 1 ? '1px solid #E8E0D6' : 'none',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Code blocks */}
        {step.codeBlocks.length > 0 && (
          <div className="mb-6">
            <div
              style={{ fontSize: 13, fontWeight: 600, color: '#6B6560', marginBottom: 12 }}
            >
              📋 Claude 앱에서 해보세요
            </div>
            <div className="space-y-4">
              {step.codeBlocks.map((block, idx) => (
                <div key={idx}>
                  {block.label && (
                    <div
                      className="text-xs font-semibold mb-2 px-2.5 py-1 rounded-full inline-block"
                      style={{ background: '#F5F0EB', color: '#6B6560' }}
                    >
                      {block.label}
                    </div>
                  )}
                  <div className="code-block relative">
                    <div className="absolute top-3 right-3">
                      <CopyButton code={block.code} />
                    </div>
                    <pre style={{ margin: 0, paddingRight: 60 }}>{block.code}</pre>
                  </div>
                  {block.tip && (
                    <div
                      className="mt-2 flex items-start gap-2"
                      style={{ fontSize: 12, color: '#9D9087', lineHeight: 1.5 }}
                    >
                      <span>💡</span>
                      <span>{block.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completion section */}
        <div
          className="rounded-xl p-6"
          style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div style={{ borderTop: '1px solid #E8E0D6', marginBottom: 16, paddingTop: 0 }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1714', marginBottom: 16 }}>
            Claude 앱에서 해보셨나요?
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className="flex-1 py-3 rounded-full font-semibold text-white transition-all duration-150"
              style={{
                background: isCompleted ? '#2D7D52' : '#D97757',
                fontSize: 14,
                cursor: isCompleted ? 'default' : 'pointer',
                minWidth: 180,
                boxShadow: isCompleted ? 'none' : '0 4px 12px rgba(217,119,87,0.25)',
              }}
              onMouseEnter={(e) => {
                if (!isCompleted) e.currentTarget.style.background = '#B85C35';
              }}
              onMouseLeave={(e) => {
                if (!isCompleted) e.currentTarget.style.background = '#D97757';
              }}
            >
              {isCompleted ? '✅ 완료! 다음으로 →' : '✅ 해봤어요! 다음으로 →'}
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-5 py-3 rounded-full font-semibold transition-all duration-150"
              style={{
                border: '1.5px solid #D4C9BB',
                color: '#6B6560',
                background: 'transparent',
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D97757';
                e.currentTarget.style.color = '#D97757';
                e.currentTarget.style.background = '#FCEEE7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D4C9BB';
                e.currentTarget.style.color = '#6B6560';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              ❓ 잘 모르겠어요
            </button>
          </div>

          {/* Hint accordion */}
          {showHint && (
            <div
              className="mt-4 rounded-xl p-4 explanation-slide"
              style={{ background: '#F5F0EB', border: '1px solid #E8E0D6' }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1714', marginBottom: 8 }}>
                도움말 💬
              </div>
              <div style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.6 }}>
                걱정하지 마세요! Claude Code 앱을 열고 터미널에서 위의 명령어를 그대로 복사해서 붙여넣어 보세요.
                오류가 발생하면 오류 메시지 전체를 클로드에게 보여주면 해결해줘요.
                <br /><br />
                Claude 앱이 없다면{' '}
                <a
                  href="https://claude.ai/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#D97757', textDecoration: 'underline' }}
                >
                  여기서 다운로드
                </a>
                하세요.
              </div>
            </div>
          )}

          {/* Aha message */}
          {showAha && (
            <div
              className="mt-4 rounded-xl p-4 slide-up"
              style={{ background: '#E8F5EE', border: '1px solid #2D7D52' }}
            >
              <div className="flex items-start gap-2">
                <span style={{ fontSize: 18 }}>✨</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#2D7D52', marginBottom: 4 }}>
                    아하! 포인트
                  </div>
                  <div style={{ fontSize: 14, color: '#1A1714', lineHeight: 1.6 }}>
                    {step.ahaMessage}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
