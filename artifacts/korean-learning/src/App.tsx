import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Onboarding from './components/Onboarding';
import ProfileSetup from './components/ProfileSetup';
import TrackSelection from './components/TrackSelection';
import LearningScreen from './components/LearningScreen';
import Completion from './components/Completion';

export default function App() {
  const screen = useAppStore((s) => s.screen);
  const nickname = useAppStore((s) => s.nickname);
  const selectedTrack = useAppStore((s) => s.selectedTrack);
  const completedModules = useAppStore((s) => s.completedModules);
  const getModuleSequence = useAppStore((s) => s.getModuleSequence);
  const goToScreen = useAppStore((s) => s.goToScreen);

  // 재방문자 자동 스킵: nickname과 트랙이 있으면 온보딩 건너뛰기
  useEffect(() => {
    if (screen === 'onboarding' && nickname && selectedTrack) {
      goToScreen('learning');
    } else if (screen === 'onboarding' && nickname) {
      goToScreen('track-selection');
    }
  }, []);

  // 트랙 완료 감지
  useEffect(() => {
    const seq = getModuleSequence();
    if (
      seq.length > 0 &&
      seq.every((id) => completedModules.includes(id)) &&
      screen === 'learning'
    ) {
      const timer = setTimeout(() => goToScreen('completion'), 2500);
      return () => clearTimeout(timer);
    }
  }, [completedModules.length]);

  if (screen === 'onboarding') return <Onboarding />;
  if (screen === 'profile-setup') return <ProfileSetup />;
  if (screen === 'track-selection') return <TrackSelection />;
  if (screen === 'learning') return <LearningScreen />;
  if (screen === 'completion') return <Completion />;
  return <Onboarding />;
}
