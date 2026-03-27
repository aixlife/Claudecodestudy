import { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import StepContent from './StepContent';
import { useAppStore } from '../store/useAppStore';
import { steps, getNextStep, TOTAL_STEPS } from '../data/steps';

export default function LearningScreen() {
  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    completeStep,
    goToScreen,
    startSession,
    incrementSessionMinutes,
    sessionMinutes,
  } = useAppStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startSession();
    timerRef.current = setInterval(() => {
      incrementSessionMinutes();
    }, 60000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const step = steps.find((s) => s.id === currentStep);
  const progressPercent = (completedSteps.length / TOTAL_STEPS) * 100;

  const handleComplete = () => {
    completeStep(currentStep);
    const next = getNextStep(currentStep);
    if (next) {
      setTimeout(() => {
        setCurrentStep(next.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1200);
    } else {
      setTimeout(() => {
        goToScreen('completion');
      }, 1500);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !completedSteps.includes(currentStep)) {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') {
        handleComplete();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, completedSteps]);

  if (!step) return null;

  const chapterTitle = ['', '1편 · 입문편', '2편 · 실전편', '3편 · 고급편'][step.chapter];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FAF9F6' }}>
      {/* Progress bar top */}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-3 flex-shrink-0"
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid #E8E0D6',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile: chapter indicator */}
            <div className="md:hidden flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ background: '#D97757' }}
              >
                C
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: '#FCEEE7', color: '#D97757' }}
            >
              {chapterTitle}
            </span>
            <span
              style={{ fontSize: 14, fontWeight: 600, color: '#1A1714' }}
              className="hidden sm:block truncate max-w-[200px] md:max-w-[300px]"
            >
              {step.title}
            </span>
          </div>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-150"
            style={{
              border: '1.5px solid #D4C9BB',
              color: '#6B6560',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
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
            Claude 앱 열기 ↗
          </a>
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden px-4 py-2" style={{ borderBottom: '1px solid #E8E0D6', background: '#FFFFFF' }}>
          <div className="flex items-center gap-3">
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: 4, background: '#E8E0D6' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%`, background: '#D97757' }}
              />
            </div>
            <span style={{ fontSize: 11, color: '#9D9087', whiteSpace: 'nowrap' }}>
              {completedSteps.length}/20
            </span>
          </div>
        </div>

        {/* Step content */}
        <StepContent step={step} onComplete={handleComplete} />
      </div>
    </div>
  );
}
