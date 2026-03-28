import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TrackId, Screen } from '../data/types';
import { getModule } from '../data/modules';
import { getTrack, getTrackModule } from '../data/tracks';

interface AppState {
  // 사용자 정보
  dreamProject: string;

  // 화면/네비게이션
  screen: Screen;
  selectedTrack: TrackId | null;
  currentModuleId: string;

  // 진행 상태
  completedModules: string[];
  gateResponses: Record<string, string>;

  // 세션
  startTime: number | null;
  sessionMinutes: number;

  // 액션
  setDreamProject: (project: string) => void;
  goToScreen: (screen: Screen) => void;
  selectTrack: (trackId: TrackId) => void;
  setCurrentModule: (moduleId: string) => void;
  completeModule: (moduleId: string) => void;
  saveGateResponse: (moduleId: string, response: string) => void;
  startSession: () => void;
  incrementSessionMinutes: () => void;
  reset: () => void;

  // 파생 (getter 느낌의 헬퍼)
  getModuleSequence: () => string[];
  getCurrentModuleIndex: () => number;
  getTotalModules: () => number;
  getNextModuleId: () => string | undefined;
  isModuleCompleted: (moduleId: string) => boolean;
  isModuleAccessible: (moduleId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      dreamProject: '',
      screen: 'onboarding',
      selectedTrack: null,
      currentModuleId: 'C0',
      completedModules: [],
      gateResponses: {},
      startTime: null,
      sessionMinutes: 0,

      setDreamProject: (project) => set({ dreamProject: project }),

      goToScreen: (screen) => set({ screen }),

      selectTrack: (trackId) => {
        const track = getTrack(trackId);
        if (!track) return;
        set({
          selectedTrack: trackId,
          currentModuleId: track.moduleSequence[0] || 'C0',
          screen: 'learning',
        });
      },

      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),

      completeModule: (moduleId) => {
        const { completedModules } = get();
        if (!completedModules.includes(moduleId)) {
          set({ completedModules: [...completedModules, moduleId] });
        }
      },

      saveGateResponse: (moduleId, response) => {
        const { gateResponses } = get();
        set({ gateResponses: { ...gateResponses, [moduleId]: response } });
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

      reset: () =>
        set({
          dreamProject: '',
          screen: 'onboarding',
          selectedTrack: null,
          currentModuleId: 'C0',
          completedModules: [],
          gateResponses: {},
          startTime: null,
          sessionMinutes: 0,
        }),

      // 헬퍼
      getModuleSequence: () => {
        const { selectedTrack } = get();
        if (!selectedTrack) return [];
        const track = getTrack(selectedTrack);
        return track?.moduleSequence || [];
      },

      getCurrentModuleIndex: () => {
        const { currentModuleId } = get();
        const seq = get().getModuleSequence();
        return seq.indexOf(currentModuleId);
      },

      getTotalModules: () => {
        return get().getModuleSequence().length;
      },

      getNextModuleId: () => {
        const seq = get().getModuleSequence();
        const idx = get().getCurrentModuleIndex();
        if (idx === -1 || idx >= seq.length - 1) return undefined;
        return seq[idx + 1];
      },

      isModuleCompleted: (moduleId) => {
        return get().completedModules.includes(moduleId);
      },

      isModuleAccessible: (moduleId) => {
        const { completedModules } = get();
        const seq = get().getModuleSequence();
        const idx = seq.indexOf(moduleId);
        if (idx === 0) return true;
        if (idx === -1) return false;
        // 이전 모듈이 완료되었으면 접근 가능
        return completedModules.includes(seq[idx - 1]);
      },
    }),
    {
      name: 'claude-masterclass-v2',
    }
  )
);

// 모듈 데이터 조회 헬퍼 (공통 + 트랙전용 통합)
export function resolveModule(moduleId: string) {
  return getModule(moduleId) || getTrackModule(moduleId);
}
