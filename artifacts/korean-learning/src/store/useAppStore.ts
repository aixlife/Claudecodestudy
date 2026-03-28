import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TrackId, Screen, UserLevel } from '../data/types';
import { getModule } from '../data/modules';
import { getTrack, getTrackModule } from '../data/tracks';

interface AppState {
  // 사용자 정보
  dreamProject: string;
  nickname: string;
  level: UserLevel | null;

  // 화면/네비게이션
  screen: Screen;
  selectedTrack: TrackId | null;
  currentModuleId: string;

  // 진행 상태
  completedModules: string[];
  completedTracks: string[];
  gateResponses: Record<string, string>;

  // 세션
  startTime: number | null;
  sessionMinutes: number;

  // 액션
  setDreamProject: (project: string) => void;
  setProfile: (nickname: string, level: UserLevel) => void;
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
  isTrackCompleted: (trackId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      dreamProject: '',
      nickname: '',
      level: null,
      screen: 'onboarding',
      selectedTrack: null,
      currentModuleId: 'C0',
      completedModules: [],
      completedTracks: [],
      gateResponses: {},
      startTime: null,
      sessionMinutes: 0,

      setDreamProject: (project) => set({ dreamProject: project }),

      setProfile: (nickname, level) => set({ nickname, level }),

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
        const { completedModules, completedTracks, selectedTrack } = get();
        if (!completedModules.includes(moduleId)) {
          const newCompleted = [...completedModules, moduleId];
          const updates: Partial<AppState> = { completedModules: newCompleted };

          // 트랙 완료 자동 감지
          if (selectedTrack && !completedTracks.includes(selectedTrack)) {
            const track = getTrack(selectedTrack);
            if (track && track.moduleSequence.every((id) => newCompleted.includes(id))) {
              updates.completedTracks = [...completedTracks, selectedTrack];
            }
          }
          set(updates);
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
          nickname: '',
          level: null,
          screen: 'onboarding',
          selectedTrack: null,
          currentModuleId: 'C0',
          completedModules: [],
          completedTracks: [],
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
        const { completedModules, completedTracks, selectedTrack } = get();
        // 완료된 트랙이면 모든 모듈 자유 접근
        if (selectedTrack && completedTracks.includes(selectedTrack)) return true;
        const seq = get().getModuleSequence();
        const idx = seq.indexOf(moduleId);
        if (idx === 0) return true;
        if (idx === -1) return false;
        return completedModules.includes(seq[idx - 1]);
      },

      isTrackCompleted: (trackId) => {
        return get().completedTracks.includes(trackId);
      },
    }),
    {
      name: 'claude-masterclass-v2',
      // screen은 저장하지 않음 → 항상 onboarding으로 시작
      partialize: (state) => ({
        dreamProject: state.dreamProject,
        nickname: state.nickname,
        level: state.level,
        selectedTrack: state.selectedTrack,
        currentModuleId: state.currentModuleId,
        completedModules: state.completedModules,
        completedTracks: state.completedTracks,
        gateResponses: state.gateResponses,
        startTime: state.startTime,
        sessionMinutes: state.sessionMinutes,
      }),
    }
  )
);

// 모듈 데이터 조회 헬퍼 (공통 + 트랙전용 통합)
export function resolveModule(moduleId: string) {
  return getModule(moduleId) || getTrackModule(moduleId);
}
