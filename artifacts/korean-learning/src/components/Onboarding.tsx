import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { tracks } from '../data/tracks';

export default function Onboarding() {
  const { dreamProject, setDreamProject, goToScreen } = useAppStore();
  const [localProject, setLocalProject] = useState(dreamProject);

  const handleStart = () => {
    if (localProject.trim()) {
      setDreamProject(localProject.trim());
      goToScreen('track-selection');
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
        <span style={{ color: '#1A1714', fontSize: 14, fontWeight: 600 }}>바이브코딩 마스터클래스</span>
      </div>

      <div className="w-full max-w-[560px]">
        {/* Hero */}
        <div className="text-center mb-10">
          <div
            className="inline-block text-sm font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ color: '#D97757', background: '#FCEEE7', fontSize: 12, letterSpacing: '0.05em' }}
          >
            프로젝트형 바이브코딩 학습
          </div>
          <h1
            className="mb-4"
            style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, color: '#1A1714' }}
          >
            뭘 만들고 싶은지부터<br />시작하세요
          </h1>
          <p style={{ color: '#6B6560', fontSize: 15, lineHeight: 1.7 }}>
            클로드 코드 앱을 설치하고, 내 컴퓨터에서 직접 만들어봐요.<br />
            도구는 상관없어요 — <span style={{ fontWeight: 600 }}>핵심 개념</span>을 배우면 어디서든 써요.<br />
            <span style={{ color: '#D97757', fontWeight: 600 }}>현재 전부 무료</span>예요.
          </p>
        </div>

        {/* Dream project input */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <label
            className="block mb-1 font-semibold"
            style={{ fontSize: 15, color: '#1A1714' }}
          >
            먼저, 무엇을 만들어보고 싶으세요?
          </label>
          <p style={{ fontSize: 12, color: '#9D9087', marginBottom: 12 }}>
            가게 창업처럼 — 어떤 가게를 열고 싶은지 정하는 것부터 시작해요
          </p>
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
            onFocus={(e) => { e.currentTarget.style.borderColor = '#D97757'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E0D6'; }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleStart();
              }
            }}
          />
        </div>

        {/* Track preview cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="rounded-xl p-4"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E0D6',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <div className="text-2xl mb-2">{track.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1714', marginBottom: 4 }}>
                {track.title}
              </div>
              <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.4 }}>
                {track.subtitle}
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
            if (localProject.trim()) e.currentTarget.style.background = '#B85C35';
          }}
          onMouseLeave={(e) => {
            if (localProject.trim()) e.currentTarget.style.background = '#D97757';
          }}
        >
          트랙 선택하러 가기 →
        </button>

        <p className="text-center mt-4" style={{ fontSize: 13, color: '#9D9087' }}>
          클로드 코드 앱 필요 · <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" style={{ color: '#D97757', textDecoration: 'underline' }}>다운로드</a>
        </p>

        {/* KakaoTalk CTA */}
        <div className="mt-8 text-center">
          <p style={{ fontSize: 13, color: '#9D9087', marginBottom: 12 }}>
            막히는 부분이 있으면 언제든 질문하세요
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <a
              href="https://open.kakao.com/o/gT0uVxJh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-150"
              style={{ background: '#FEE500', color: '#3C1E1E', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              💬 카카오톡 오픈채팅
            </a>
            <a
              href="https://www.threads.com/@naminsoo_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-150"
              style={{ border: '1.5px solid #E8E0D6', color: '#6B6560', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}
            >
              📱 Threads
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
