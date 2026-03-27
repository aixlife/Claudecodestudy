import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { steps } from '../data/steps';

const appTypes = ['웹사이트', 'AI 챗봇', '업무 자동화', '데이터 분석', '기타'];
const audiences = ['나 혼자 사용', '팀과 함께', '고객에게', '교육 목적'];
const features = ['AI 대화', '자동화 워크플로우', '정보 시각화', '문서 생성'];
const techStacks = ['React', 'Next.js', 'Python', '상관없음'];

export default function Completion() {
  const { dreamProject, reset } = useAppStore();
  const [appType, setAppType] = useState('웹사이트');
  const [audience, setAudience] = useState('나 혼자 사용');
  const [feature, setFeature] = useState('AI 대화');
  const [techStack, setTechStack] = useState('React');
  const [copied, setCopied] = useState(false);

  const generatedPrompt = `${appType}를 만들어줘.
${audience}을 위한 앱이고,
핵심 기능은 ${feature}이야.
기술 스택: ${techStack}
한국어 UI, 깔끔하고 심플하게 만들어줘.
CLAUDE.md 먼저 생성하고, Plan Mode로 시작해줘.`;

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const stepEmojis: Record<string, string> = {
    '1-1': '📁', '1-2': '📝', '1-3': '📋', '1-4': '⎋', '1-5': '🖼️', '1-6': '⌨️',
    '2-1': '🧠', '2-2': '⚡', '2-3': '🔌', '2-4': '📊', '2-5': '🎯', '2-6': '🧪', '2-7': '📋', '2-8': '🔨',
    '3-1': '🛠️', '3-2': '⚙️', '3-3': '🤖', '3-4': '👥', '3-5': '🔗', '3-6': '🚀',
  };

  const selectStyle = {
    border: '1.5px solid #E8E0D6',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 14,
    color: '#1A1714',
    background: '#FAF9F6',
    width: '100%',
    fontFamily: 'inherit',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%239D9087' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 36,
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: '#FAF9F6', paddingBottom: 60 }}
    >
      {/* Progress bar full */}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: '100%' }} />
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h1
            style={{ fontSize: 32, fontWeight: 700, color: '#1A1714', lineHeight: 1.2, marginBottom: 10 }}
          >
            모든 여정을 완주했어요!
          </h1>
          <p style={{ fontSize: 16, color: '#6B6560' }}>
            당신은 이제 AI 에이전트를 설계하는 사람입니다.
          </p>
        </div>

        {/* Dream project highlight */}
        {dreamProject && (
          <div
            className="rounded-2xl p-6 mb-8 text-center"
            style={{ background: '#FCEEE7', border: '2px solid #D97757' }}
          >
            <div style={{ fontSize: 12, color: '#D97757', fontWeight: 600, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              나의 목표
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1714' }}>
              {dreamProject}
            </div>
          </div>
        )}

        {/* Step chips */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1714', marginBottom: 14 }}>
            완주한 20단계 🏆
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-xl px-3 py-2 flex items-center gap-2"
                style={{ background: '#E8F5EE', border: '1px solid #2D7D52' }}
              >
                <span style={{ fontSize: 16 }}>{stepEmojis[step.id] || '✓'}</span>
                <div>
                  <div style={{ fontSize: 10, color: '#2D7D52', fontWeight: 600 }}>Step {step.id}</div>
                  <div style={{ fontSize: 11, color: '#1A1714', lineHeight: 1.3 }} className="line-clamp-1">
                    {step.title}
                  </div>
                </div>
                <span style={{ marginLeft: 'auto', color: '#2D7D52', fontSize: 12 }}>✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final prompt builder */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1714', marginBottom: 4 }}>
            지금 바로 만들어봐요 🚀
          </div>
          <p style={{ fontSize: 13, color: '#9D9087', marginBottom: 20 }}>
            답을 선택하면 맞춤 프롬프트가 자동으로 만들어져요
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
            <div>
              <label style={{ fontSize: 12, color: '#6B6560', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                어떤 종류의 앱인가요?
              </label>
              <select
                value={appType}
                onChange={(e) => setAppType(e.target.value)}
                style={selectStyle}
              >
                {appTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#6B6560', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                누구를 위한 건가요?
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                style={selectStyle}
              >
                {audiences.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#6B6560', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                가장 중요한 기능은?
              </label>
              <select
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                style={selectStyle}
              >
                {features.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#6B6560', fontWeight: 600, marginBottom: 6, display: 'block' }}>
                선호하는 기술 스택은?
              </label>
              <select
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                style={selectStyle}
              >
                {techStacks.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Generated prompt */}
          <div className="code-block mb-4 relative">
            <pre style={{ margin: 0, fontSize: 13 }}>{generatedPrompt}</pre>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleCopyPrompt}
              className="flex-1 py-3 rounded-full font-semibold text-white transition-all duration-150"
              style={{
                background: copied ? '#2D7D52' : '#D97757',
                fontSize: 14,
                cursor: 'pointer',
                minWidth: 160,
                fontFamily: 'inherit',
                boxShadow: '0 4px 12px rgba(217,119,87,0.25)',
              }}
              onMouseEnter={(e) => {
                if (!copied) e.currentTarget.style.background = '#B85C35';
              }}
              onMouseLeave={(e) => {
                if (!copied) e.currentTarget.style.background = '#D97757';
              }}
            >
              {copied ? '복사됨 ✓' : '프롬프트 복사하기 📋'}
            </button>
            <a
              href="https://claude.ai/download"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-150"
              style={{
                border: '1.5px solid #D4C9BB',
                color: '#6B6560',
                fontSize: 14,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
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
              Claude Code 다운로드 →
            </a>
          </div>
        </div>

        {/* KakaoTalk CTA */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: '#FEE500', border: '2px solid #F5DC00' }}
        >
          <div className="text-center">
            <div style={{ fontSize: 18, fontWeight: 700, color: '#3C1E1E', marginBottom: 8 }}>
              함께 성장하는 커뮤니티에 참여하세요
            </div>
            <p style={{ fontSize: 14, color: '#5C4033', marginBottom: 16, lineHeight: 1.6 }}>
              막히는 부분은 질문하고, 다른 사람의 프로젝트도 구경해보세요.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://open.kakao.com/o/gT0uVxJh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold transition-all duration-150"
                style={{
                  background: '#3C1E1E',
                  color: '#FEE500',
                  fontSize: 14,
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2A1515';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3C1E1E';
                }}
              >
                💬 AI 활용 오픈채팅 참여하기
              </a>
              <a
                href="https://open.kakao.com/o/gKuUoE2h"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold transition-all duration-150"
                style={{
                  background: '#FFFFFF',
                  color: '#3C1E1E',
                  fontSize: 14,
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                  border: '2px solid #3C1E1E',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F5F0EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                💬 실전 프로젝트 채팅방
              </a>
            </div>
          </div>
        </div>

        {/* Activity intro section */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1714', marginBottom: 4 }}>
            더 깊이 배우고 싶다면
          </div>
          <p style={{ fontSize: 13, color: '#9D9087', marginBottom: 16 }}>
            AI 에이전틱 엔지니어링 전문가와 함께하세요
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#FAF9F6', border: '1px solid #E8E0D6' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>🏢</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1714', marginBottom: 4 }}>기업 강의 · 컨설팅</div>
              <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.5 }}>
                Claude Code를 우리 팀에 도입하고 싶다면. B2B 맞춤 교육과 AI 워크플로우 컨설팅을 제공합니다.
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#FAF9F6', border: '1px solid #E8E0D6' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>🎓</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1714', marginBottom: 4 }}>온라인 심화 강의</div>
              <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.5 }}>
                20단계 이후, 실전 프로젝트 중심의 심화 과정으로 진짜 AI 에이전트를 만들어보세요.
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <a
              href="https://www.threads.com/@naminsoo_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-150"
              style={{
                border: '1.5px solid #E8E0D6',
                color: '#6B6560',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D97757';
                e.currentTarget.style.color = '#D97757';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E0D6';
                e.currentTarget.style.color = '#6B6560';
              }}
            >
              📱 Threads에서 소식 받기
            </a>
            <a
              href="mailto:naminsoo@aixlife.co.kr"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-150"
              style={{
                border: '1.5px solid #E8E0D6',
                color: '#6B6560',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D97757';
                e.currentTarget.style.color = '#D97757';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E0D6';
                e.currentTarget.style.color = '#6B6560';
              }}
            >
              ✉️ 강의 · 컨설팅 문의
            </a>
            <a
              href="https://aixlife.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-150"
              style={{
                border: '1.5px solid #E8E0D6',
                color: '#6B6560',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D97757';
                e.currentTarget.style.color = '#D97757';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E0D6';
                e.currentTarget.style.color = '#6B6560';
              }}
            >
              🏠 aixlife.co.kr
            </a>
          </div>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={reset}
            style={{ fontSize: 13, color: '#9D9087', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
          >
            처음부터 다시 해보기
          </button>
        </div>
      </div>
    </div>
  );
}
