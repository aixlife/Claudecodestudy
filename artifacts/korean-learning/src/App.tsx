import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Onboarding from './components/Onboarding';
import ProfileSetup from './components/ProfileSetup';
import TrackSelection from './components/TrackSelection';
import LearningScreen from './components/LearningScreen';
import Completion from './components/Completion';

export default function App() {
  const screen = useAppStore((s) => s.screen);
  const completedModules = useAppStore((s) => s.completedModules);
  const getModuleSequence = useAppStore((s) => s.getModuleSequence);
  const goToScreen = useAppStore((s) => s.goToScreen);

  useEffect(() => {
    const seq = getModuleSequence();
    if (
      seq.length > 0 &&
      seq.every((id) => completedModules.includes(id)) &&
      screen === 'learning'
    ) {
      // Aha 메시지를 충분히 보여준 후 completion으로 전환
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
