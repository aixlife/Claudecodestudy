import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  dreamProject: string;
  currentStep: string;
  completedSteps: string[];
  startTime: number | null;
  sessionMinutes: number;
  screen: 'onboarding' | 'learning' | 'completion';

  setDreamProject: (project: string) => void;
  setCurrentStep: (stepId: string) => void;
  completeStep: (stepId: string) => void;
  startSession: () => void;
  incrementSessionMinutes: () => void;
  goToScreen: (screen: 'onboarding' | 'learning' | 'completion') => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      dreamProject: '',
      currentStep: '1-1',
      completedSteps: [],
      startTime: null,
      sessionMinutes: 0,
      screen: 'onboarding',

      setDreamProject: (project) => set({ dreamProject: project }),
      setCurrentStep: (stepId) => set({ currentStep: stepId }),

      completeStep: (stepId) => {
        const { completedSteps } = get();
        if (!completedSteps.includes(stepId)) {
          set({ completedSteps: [...completedSteps, stepId] });
        }
      },

      startSession: () => {
        const { startTime } = get();
        if (!startTime) {
          set({ startTime: Date.now() });
        }
      },

      incrementSessionMinutes: () => {
        set((state) => ({ sessionMinutes: state.sessionMinutes + 1 }));
      },

      goToScreen: (screen) => set({ screen }),

      reset: () =>
        set({
          dreamProject: '',
          currentStep: '1-1',
          completedSteps: [],
          startTime: null,
          sessionMinutes: 0,
          screen: 'onboarding',
        }),
    }),
    {
      name: 'claude-masterclass-storage',
    }
  )
);
