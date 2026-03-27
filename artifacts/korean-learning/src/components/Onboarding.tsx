import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { chapters } from '../data/steps';

export default function Onboarding() {
  const { dreamProject, setDreamProject, goToScreen } = useAppStore();
  const [localProject, setLocalProject] = useState(dreamProject);

  const handleStart = () => {
    if (localProject.trim()) {
      setDreamProject(localProject.trim());
      goToScreen('learning');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: '#FAF9F6' }}
    >
      {/* Top logo */}
      <div className="fixed top-6 left-6 flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: '#D97757' }}
        >
          C
        </div>
        <span style={{ color: '#1A1714', fontSize: 14, fontWeight: 600 }}>Claude Code 마스터클래스</span>
      </div>

      <div className="w-full max-w-[560px]">
        {/* Hero */}
        <div className="text-center mb-10">
          <div
            className="inline-block text-sm font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ color: '#D97757', background: '#FCEEE7', fontSize: 12, letterSpacing: '0.05em' }}
          >
            AI 에이전틱 엔지니어링
          </div>
          <h1
            className="mb-4"
            style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, color: '#1A1714' }}
          >
            나만의 AI 직원팀을<br />만들어보세요
          </h1>
          <p style={{ color: '#6B6560', fontSize: 15, lineHeight: 1.7 }}>
            입문부터 고급까지 — 클로드 코드의 진짜 힘을 경험합니다.<br />
            이 여정을 마치면, 코드를 짜는 사람이 아니라<br />
            AI 에이전트를 설계하는 사람이 됩니다.
          </p>
        </div>

        {/* Dream project input */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <label
            className="block mb-2 font-semibold"
            style={{ fontSize: 15, color: '#1A1714' }}
          >
            먼저, 무엇을 만들어보고 싶으세요?
          </label>
          <textarea
            value={localProject}
            onChange={(e) => setLocalProject(e.target.value)}
            rows={3}
            placeholder="예) 고객 응대 자동화 봇, AI 콘텐츠 제작 시스템, 나만의 업무 도우미..."
            className="w-full outline-none resize-none transition-all duration-150"
            style={{
              border: '1.5px solid #E8E0D6',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: 15,
              color: '#1A1714',
              background: '#FAF9F6',
              fontFamily: 'inherit',
              lineHeight: 1.6,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#D97757';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E8E0D6';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleStart();
              }
            }}
          />
          <p style={{ fontSize: 12, color: '#9D9087', marginTop: 8 }}>
            구체적일수록 마지막 단계에서 더 정확한 프롬프트가 만들어져요
          </p>
        </div>

        {/* Chapter preview cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="rounded-xl p-4"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E0D6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <div className="text-2xl mb-2">{ch.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1714', marginBottom: 4 }}>
                {ch.title}
              </div>
              <div style={{ fontSize: 12, color: '#6B6560', marginBottom: 6, lineHeight: 1.4 }}>
                {ch.subtitle}
              </div>
              <div
                className="inline-block rounded-full px-2 py-0.5"
                style={{ background: '#F5F0EB', color: '#9D9087', fontSize: 11 }}
              >
                {ch.stepLabel}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={!localProject.trim()}
          className="w-full py-4 rounded-full font-semibold text-white transition-all duration-150"
          style={{
            background: localProject.trim() ? '#D97757' : '#D4C9BB',
            fontSize: 16,
            cursor: localProject.trim() ? 'pointer' : 'not-allowed',
            boxShadow: localProject.trim() ? '0 4px 12px rgba(217,119,87,0.3)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (localProject.trim()) {
              e.currentTarget.style.background = '#B85C35';
            }
          }}
          onMouseLeave={(e) => {
            if (localProject.trim()) {
              e.currentTarget.style.background = '#D97757';
            }
          }}
        >
          여정 시작하기 →
        </button>

        <p className="text-center mt-4" style={{ fontSize: 13, color: '#9D9087' }}>
          총 20단계 · 예상 소요 시간 약 2-3시간 · 클로드 앱 필요
        </p>
      </div>
    </div>
  );
}
