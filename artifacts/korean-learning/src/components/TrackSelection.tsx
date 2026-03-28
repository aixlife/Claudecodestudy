import { useAppStore } from '../store/useAppStore';
import { tracks } from '../data/tracks';
import type { TrackId } from '../data/types';
import Footer from './Footer';

export default function TrackSelection() {
  const dreamProject = useAppStore((s) => s.dreamProject);
  const selectTrack = useAppStore((s) => s.selectTrack);
  const startSession = useAppStore((s) => s.startSession);
  const goToScreen = useAppStore((s) => s.goToScreen);

  const handleSelectTrack = (trackId: TrackId) => {
    selectTrack(trackId);
    startSession();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* 헤더 */}
      <div className="w-full border-b border-[#E8E0D6] bg-white/80 backdrop-blur-sm">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-[#D97757] tracking-tight uppercase text-lg">Claude Code Study</span>
          <button
            onClick={() => goToScreen('profile-setup')}
            className="text-sm text-[#9D9087] hover:text-[#D97757] transition-colors"
          >
            &larr; Back
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="max-w-[900px] w-full">
          {/* 꿈 프로젝트 리마인드 */}
          {dreamProject && (
            <div className="mb-8 p-4 bg-[#FCEEE7] rounded-xl border border-[#D97757]/20">
              <p className="text-sm text-[#6B6560]">나의 프로젝트</p>
              <p className="font-semibold text-[#1A1714] mt-1">{dreamProject}</p>
            </div>
          )}

          {/* 트랙 선택 안내 */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1714] mb-2">
            어떤 것을 만들고 싶으세요?
          </h1>
          <p className="text-[#6B6560] mb-8 text-lg">
            트랙을 선택하면 필요한 모듈이 자동으로 구성돼요. 모든 트랙은 <span className="font-semibold text-[#D97757]">무료</span>예요.
          </p>

          {/* 트랙 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(track.id)}
                className="group text-left p-6 bg-white rounded-2xl border-2 border-[#E8E0D6] hover:border-[#D97757] transition-all duration-200 hover:shadow-lg hover:shadow-[#D97757]/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1714] group-hover:text-[#D97757] transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-sm text-[#9D9087]">{track.subtitle}</p>
                  </div>
                </div>

                <p className="text-[#6B6560] text-sm mb-4 leading-relaxed">
                  {track.description}
                </p>

                {/* 후킹 카피 */}
                <div className="p-3 bg-[#F5F0EB] rounded-lg">
                  <p className="text-sm text-[#1A1714] font-medium italic">
                    "{track.hookCopy.entry}"
                  </p>
                </div>

                {/* 모듈 수 */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#9D9087]">
                    {track.moduleSequence.length}개 모듈
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: track.color + '15', color: track.color }}
                  >
                    시작하기 →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 하단 안내 */}
          <p className="text-center text-sm text-[#9D9087] mt-8 mb-8">
            트랙은 나중에 변경할 수 있어요. 일단 끌리는 걸로 시작해보세요!
          </p>
          <Footer />
        </div>
      </div>
    </div>
  );
}
