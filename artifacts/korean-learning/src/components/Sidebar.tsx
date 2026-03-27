import { steps, chapters, getStepsByChapter } from '../data/steps';
import { useAppStore } from '../store/useAppStore';

interface JourneyNodeProps {
  status: 'complete' | 'current' | 'locked';
  isLast?: boolean;
}

function JourneyNode({ status }: JourneyNodeProps) {
  return (
    <div className="relative flex-shrink-0">
      {status === 'complete' && (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center node-complete-animation"
          style={{ background: '#D97757' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {status === 'current' && (
        <div className="relative">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#FFFFFF', border: '2px solid #D97757' }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#D97757' }} />
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid #FCEEE7',
              animation: 'pulse-ring 1.5s ease-out infinite',
            }}
          />
        </div>
      )}
      {status === 'locked' && (
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: '#F5F0EB' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="6" width="8" height="6" rx="1" stroke="#9D9087" strokeWidth="1.5" />
            <path d="M5 6V4.5a2 2 0 014 0V6" stroke="#9D9087" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { dreamProject, currentStep, completedSteps, sessionMinutes, setCurrentStep } = useAppStore();

  const completedCount = completedSteps.length;
  const totalSteps = steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;

  const truncatedProject = dreamProject.length > 30
    ? dreamProject.slice(0, 30) + '…'
    : dreamProject;

  const handleStepClick = (stepId: string) => {
    const stepIdx = steps.findIndex(s => s.id === stepId);
    const currentIdx = steps.findIndex(s => s.id === currentStep);
    if (completedSteps.includes(stepId) || stepId === currentStep || stepIdx <= currentIdx) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{
        width: 280,
        minWidth: 280,
        background: '#FFFFFF',
        borderRight: '1px solid #E8E0D6',
      }}
    >
      {/* Logo area */}
      <div className="px-4 py-4" style={{ borderBottom: '1px solid #E8E0D6' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
            style={{ background: '#D97757' }}
          >
            C
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1714' }}>Claude Code 마스터클래스</span>
        </div>
      </div>

      {/* Dream project + progress */}
      <div className="px-4 py-4" style={{ borderBottom: '1px solid #E8E0D6' }}>
        {/* Dream project box */}
        <div
          className="rounded-xl p-3 mb-3"
          style={{
            background: '#FCEEE7',
            borderLeft: '3px solid #D97757',
          }}
        >
          <div style={{ fontSize: 11, color: '#D97757', fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            나의 목표
          </div>
          <div style={{ fontSize: 13, color: '#1A1714', fontWeight: 600, lineHeight: 1.4 }}>
            {truncatedProject || '목표를 설정하세요'}
          </div>
        </div>

        {/* Progress */}
        <div style={{ fontSize: 12, color: '#6B6560', marginBottom: 6 }}>
          20단계 중 {completedCount}단계 완료
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 4, background: '#E8E0D6', marginBottom: 6 }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, background: '#D97757' }}
          />
        </div>
        <div style={{ fontSize: 11, color: '#9D9087' }}>
          오늘 {sessionMinutes}분 학습 중 ⏱
        </div>
      </div>

      {/* Journey map */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {chapters.map((chapter) => {
          const chapterSteps = getStepsByChapter(chapter.id);
          const chapterCompleted = chapterSteps.filter(s => completedSteps.includes(s.id)).length;
          const isChapterDone = chapterCompleted === chapterSteps.length;

          return (
            <div key={chapter.id} className="mb-6">
              {/* Chapter header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: '#F5F0EB', color: '#6B6560' }}
                >
                  {chapter.id}편
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1714', flex: 1 }}>
                  {chapter.title}
                </div>
                {isChapterDone ? (
                  <div
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#E8F5EE', color: '#2D7D52', fontWeight: 600 }}
                  >
                    ✓ 완료!
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: '#9D9087' }}>
                    {chapterCompleted}/{chapterSteps.length}
                  </div>
                )}
              </div>

              {/* Steps */}
              {chapterSteps.map((step, idx) => {
                const isComplete = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                const isLocked = !isComplete && !isCurrent && !completedSteps.includes(steps[steps.findIndex(s => s.id === step.id) - 1]?.id || '');
                const status: 'complete' | 'current' | 'locked' = isComplete ? 'complete' : isCurrent ? 'current' : 'locked';
                const isClickable = isComplete || isCurrent;
                const isLast = idx === chapterSteps.length - 1;

                return (
                  <div key={step.id} className="flex gap-3">
                    {/* Node + line column */}
                    <div className="flex flex-col items-center" style={{ width: 36 }}>
                      <JourneyNode status={status} isLast={isLast} />
                      {!isLast && (
                        <div
                          className="journey-line my-1"
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 16,
                            background: isComplete
                              ? '#D97757'
                              : 'repeating-linear-gradient(to bottom, #E8E0D6 0px, #E8E0D6 4px, transparent 4px, transparent 8px)',
                          }}
                        />
                      )}
                    </div>

                    {/* Step label */}
                    <div
                      className="flex-1 pb-3 cursor-pointer"
                      onClick={() => isClickable && handleStepClick(step.id)}
                      style={{ paddingTop: 6 }}
                    >
                      <div
                        className="flex items-center gap-1 flex-wrap"
                        style={{ fontSize: 12, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? '#D97757' : isComplete ? '#1A1714' : '#9D9087' }}
                      >
                        <span>{step.id}. {step.title}</span>
                        {isCurrent && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ background: '#FCEEE7', color: '#D97757', fontSize: 10, fontWeight: 600, animation: 'slide-up 0.3s ease' }}
                          >
                            지금 여기 👈
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 10, color: '#9D9087', marginTop: 1 }}>{step.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Final star */}
        <div className="flex gap-3 mb-4">
          <div className="flex flex-col items-center" style={{ width: 36 }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xl"
              style={{
                background: completedSteps.length === 20 ? '#FFD700' : '#F5F0EB',
                transition: 'all 0.5s',
              }}
            >
              ⭐
            </div>
          </div>
          <div style={{ paddingTop: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: completedSteps.length === 20 ? '#D97757' : '#9D9087' }}>
              꿈 프로젝트 완성
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
