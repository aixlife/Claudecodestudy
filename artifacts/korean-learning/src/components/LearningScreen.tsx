import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ModuleContent from './ModuleContent';
import { useAppStore } from '../store/useAppStore';
import { getTrack } from '../data/tracks';
import { usePresence } from '../hooks/usePresence';

export default function LearningScreen() {
  const startSession = useAppStore((s) => s.startSession);
  const incrementSessionMinutes = useAppStore((s) => s.incrementSessionMinutes);
  const selectedTrack = useAppStore((s) => s.selectedTrack);
  const completedModules = useAppStore((s) => s.completedModules);
  const getModuleSequence = useAppStore((s) => s.getModuleSequence);
  const goToScreen = useAppStore((s) => s.goToScreen);
  const nickname = useAppStore((s) => s.nickname);
  const level = useAppStore((s) => s.level);

  const { activeCount, isConnected } = usePresence(nickname, level || 'beginner');
  const [showPresence, setShowPresence] = useState(true);

  // 10초 후에도 연결 안 되면 presence 숨김
  useEffect(() => {
    if (isConnected) { setShowPresence(true); return; }
    const timer = setTimeout(() => setShowPresence(false), 10000);
    return () => clearTimeout(timer);
  }, [isConnected]);

  // 세션 타이머
  useEffect(() => {
    startSession();
    const interval = setInterval(() => incrementSessionMinutes(), 60000);
    return () => clearInterval(interval);
  }, []);

  const track = selectedTrack ? getTrack(selectedTrack) : null;
  const seq = getModuleSequence();
  const completedCount = seq.filter((id) => completedModules.includes(id)).length;
  const progress = seq.length > 0 ? (completedCount / seq.length) * 100 : 0;

  return (
    <div className="h-screen flex bg-[#FAF9F6]">
      {/* 프로그레스 바 (최상단) */}
      <div className="fixed top-0 left-0 right-0 z-50 progress-bar-track" style={{ height: 3 }}>
        <div
          className="progress-bar-fill h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: track?.color || '#D97757' }}
        />
      </div>

      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* 상단 바 */}
        <div className="h-14 border-b border-[#E8E0D6] bg-white/80 backdrop-blur-sm flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => goToScreen('track-selection')}
              className="text-sm text-[#9D9087] hover:text-[#D97757] transition-colors flex-shrink-0"
            >
              &larr;
            </button>
            {track && (
              <span className="text-base font-medium truncate" style={{ color: track.color }}>
                {track.title}
              </span>
            )}
            <span className="text-sm text-[#9D9087] flex-shrink-0">
              {completedCount}/{seq.length}
            </span>
            {showPresence && (
              isConnected ? (
                <span className="inline-flex items-center text-sm text-[#2D7D52] font-medium flex-shrink-0">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#2D7D52] mr-1.5 animate-pulse" />
                  {activeCount}명 학습 중
                </span>
              ) : (
                <span className="inline-flex items-center text-sm text-[#9D9087] flex-shrink-0">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#9D9087] mr-1.5" />
                  연결 중...
                </span>
              )
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://open.kakao.com/o/gT0uVxJh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-full font-medium transition-colors"
              style={{ background: '#FEE500', color: '#3C1E1E' }}
            >
              질문하기
            </a>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-full border border-[#E8E0D6] text-[#6B6560] hover:border-[#D97757] hover:text-[#D97757] transition-colors"
            >
              Claude 웹
            </a>
          </div>
        </div>

        {/* 모바일 진행바 */}
        <div className="md:hidden px-4 py-2 border-b border-[#E8E0D6] bg-white">
          <div className="flex items-center justify-between text-xs text-[#9D9087] mb-1">
            <span>{completedCount}/{seq.length} 완료</span>
            <div className="flex items-center gap-2">
              {showPresence && isConnected && (
                <span className="text-[#2D7D52] font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2D7D52] mr-0.5 animate-pulse" />
                  {activeCount}명
                </span>
              )}
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="h-1.5 bg-[#F5F0EB] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: track?.color || '#D97757' }}
            />
          </div>
        </div>

        {/* 모듈 콘텐츠 */}
        <ModuleContent />
      </div>
    </div>
  );
}
