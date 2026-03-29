import { useAppStore } from '../store/useAppStore';
import { getTrack } from '../data/tracks';
import PromptBuilder from './PromptBuilder';
import Footer from './Footer';

export default function Completion() {
  const dreamProject = useAppStore((s) => s.dreamProject);
  const selectedTrack = useAppStore((s) => s.selectedTrack);
  const completedModules = useAppStore((s) => s.completedModules);
  const sessionMinutes = useAppStore((s) => s.sessionMinutes);
  const reset = useAppStore((s) => s.reset);
  const goToScreen = useAppStore((s) => s.goToScreen);

  const track = selectedTrack ? getTrack(selectedTrack) : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-[720px] mx-auto px-6 py-12">
        {/* 완료 후킹 카피 */}
        {track && (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1714] mb-3">
              트랙 완료!
            </h1>
            <p className="text-lg font-medium italic" style={{ color: track.color }}>
              "{track.hookCopy.completion}"
            </p>
          </div>
        )}

        {/* 학습 통계 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="text-center p-4 bg-white rounded-xl border border-[#E8E0D6]">
            <p className="text-2xl font-bold text-[#D97757]">{completedModules.length}</p>
            <p className="text-xs text-[#9D9087]">완료 모듈</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-[#E8E0D6]">
            <p className="text-2xl font-bold text-[#2D7D52]">{sessionMinutes}</p>
            <p className="text-xs text-[#9D9087]">학습 시간(분)</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-[#E8E0D6]">
            <p className="text-xs font-bold" style={{ color: track?.color || '#D97757', paddingBottom: '4px' }}>
              트랙 완료
            </p>
            <p className="text-xs text-[#9D9087]">{track?.title || '자유형'}</p>
          </div>
        </div>

        {/* 꿈 프로젝트 */}
        {dreamProject && (
          <div className="mb-8 p-5 bg-[#FCEEE7] rounded-xl border border-[#D97757]/20">
            <p className="text-xs text-[#9D9087] mb-1">나의 프로젝트</p>
            <p className="text-lg font-bold text-[#1A1714]">{dreamProject}</p>
            <p className="text-sm text-[#6B6560] mt-2">이제 이걸 진짜로 만들어볼 차례예요</p>
          </div>
        )}

        {/* 프롬프트 빌더 (공통 컴포넌트) */}
        <div className="mb-8">
          <PromptBuilder />
        </div>

        {/* Claude Code 웹 */}
        <div className="text-center mb-8">
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold transition-all"
            style={{ background: '#D97757', boxShadow: '0 4px 12px rgba(217,119,87,0.3)' }}
          >
            Claude Code 웹에서 시작하기 →
          </a>
        </div>

        {/* 커뮤니티 CTA */}
        <div className="bg-white rounded-2xl border border-[#E8E0D6] p-6 mb-8">
          <h3 className="font-bold text-[#1A1714] mb-4">함께 성장하기</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://open.kakao.com/o/gT0uVxJh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl transition-colors"
              style={{ background: '#FEE500' }}
            >
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3C1E1E' }}>AI 활용 오픈채팅</p>
                <p className="text-xs" style={{ color: '#5C3C3C' }}>3,000+명이 함께합니다</p>
              </div>
            </a>
            <a
              href="https://open.kakao.com/o/gKuUoE2h"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl transition-colors"
              style={{ background: '#FEE500' }}
            >
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3C1E1E' }}>실전 프로젝트 채팅방</p>
                <p className="text-xs" style={{ color: '#5C3C3C' }}>700+명과 프로젝트 공유</p>
              </div>
            </a>
          </div>
        </div>

        {/* 더 깊이 배우기 */}
        <div className="bg-white rounded-2xl border border-[#E8E0D6] p-6 mb-8">
          <h3 className="font-bold text-[#1A1714] mb-4">더 깊이 배우고 싶다면</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#F5F0EB]">
              <p className="text-sm font-medium text-[#1A1714]">기업 강의 / 컨설팅</p>
              <p className="text-xs text-[#6B6560] mt-1">AI 활용 전략, 바이브코딩 워크샵</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F5F0EB]">
              <p className="text-sm font-medium text-[#1A1714]">온라인 심화 강의</p>
              <p className="text-xs text-[#6B6560] mt-1">에이전틱 엔지니어링 마스터 과정</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4 text-xs">
            <a href="https://www.threads.com/@naminsoo_ai" target="_blank" rel="noopener noreferrer" className="text-[#D97757] hover:underline">Threads</a>
            <a href="mailto:naminsoo@aixlife.co.kr" className="text-[#D97757] hover:underline">문의</a>
            <a href="https://aixlife.co.kr" target="_blank" rel="noopener noreferrer" className="text-[#D97757] hover:underline">aixlife.co.kr</a>
          </div>
        </div>

        {/* 다른 트랙 도전 */}
        <div className="text-center mb-12">
          <button
            onClick={() => { reset(); goToScreen('track-selection'); }}
            className="px-6 py-2.5 rounded-full border border-[#E8E0D6] text-sm text-[#6B6560] hover:border-[#D97757] hover:text-[#D97757] transition-colors"
          >
            다른 트랙으로 도전하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
