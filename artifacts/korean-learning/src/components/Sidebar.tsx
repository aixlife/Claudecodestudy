import { useAppStore, resolveModule } from '../store/useAppStore';
import { getTrack } from '../data/tracks';

export default function Sidebar() {
  const selectedTrack = useAppStore((s) => s.selectedTrack);
  const currentModuleId = useAppStore((s) => s.currentModuleId);
  const completedModules = useAppStore((s) => s.completedModules);
  const dreamProject = useAppStore((s) => s.dreamProject);
  const sessionMinutes = useAppStore((s) => s.sessionMinutes);
  const setCurrentModule = useAppStore((s) => s.setCurrentModule);
  const isModuleAccessible = useAppStore((s) => s.isModuleAccessible);
  const getModuleSequence = useAppStore((s) => s.getModuleSequence);

  if (!selectedTrack) return null;
  const track = getTrack(selectedTrack);
  if (!track) return null;

  const seq = getModuleSequence();
  const completedCount = seq.filter((id) => completedModules.includes(id)).length;

  return (
    <aside className="w-[320px] h-screen overflow-y-auto flex-shrink-0 hidden md:flex flex-col bg-white border-r border-[#E8E0D6]">
      {/* 로고 */}
      <div className="p-5 border-b border-[#E8E0D6]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base text-[#D97757] uppercase tracking-tight">Claude Code Study</span>
        </div>
      </div>

      {/* 트랙 정보 */}
      <div className="p-5 border-b border-[#E8E0D6]">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-base" style={{ color: track.color }}>{track.title}</span>
        </div>
        {dreamProject && (
          <div className="p-3 bg-[#FCEEE7] rounded-lg">
            <p className="text-xs text-[#9D9087] mb-1">나의 프로젝트</p>
            <p className="text-sm text-[#1A1714] font-medium leading-snug">{dreamProject}</p>
          </div>
        )}
      </div>

      {/* 진행 상태 */}
      <div className="px-5 py-4 border-b border-[#E8E0D6]">
        <div className="flex items-center justify-between text-sm text-[#6B6560]">
          <span>{completedCount}/{seq.length} 완료</span>
          <span>{sessionMinutes}분 학습</span>
        </div>
        <div className="mt-2.5 h-2 bg-[#F5F0EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D97757] rounded-full transition-all duration-500"
            style={{ width: `${seq.length > 0 ? (completedCount / seq.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 모듈 목록 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1.5">
          {seq.map((moduleId, idx) => {
            const mod = resolveModule(moduleId);
            const isCompleted = completedModules.includes(moduleId);
            const isCurrent = moduleId === currentModuleId;
            const accessible = isModuleAccessible(moduleId);

            return (
              <button
                key={moduleId}
                onClick={() => accessible && setCurrentModule(moduleId)}
                disabled={!accessible}
                className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all duration-150 ${
                  isCurrent
                    ? 'bg-[#FCEEE7] border border-[#D97757]/30'
                    : accessible
                    ? 'hover:bg-[#F5F0EB] border border-transparent'
                    : 'opacity-40 cursor-not-allowed border border-transparent'
                }`}
              >
                {/* 노드 아이콘 */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  isCompleted
                    ? 'bg-[#2D7D52] text-white'
                    : isCurrent
                    ? 'bg-[#D97757] text-white'
                    : 'bg-[#E8E0D6] text-[#9D9087]'
                }`}>
                  {isCompleted ? '✓' : idx + 1}
                </div>

                {/* 모듈 정보 */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    isCurrent ? 'text-[#D97757]' : 'text-[#1A1714]'
                  }`}>
                    {mod?.title || moduleId}
                  </p>
                  {mod?.metaphor && (
                    <p className="text-xs text-[#9D9087] truncate mt-0.5">
                      {mod.metaphor}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 완료 표시 */}
        {completedCount === seq.length && seq.length > 0 && (
          <div className="text-center mt-5 text-[#D97757] text-base font-semibold">Done</div>
        )}
      </div>
    </aside>
  );
}
