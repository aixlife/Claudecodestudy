import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Onboarding from './components/Onboarding';
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
      goToScreen('completion');
    }
  }, [completedModules.length]);

  if (screen === 'onboarding') return <Onboarding />;
  if (screen === 'track-selection') return <TrackSelection />;
  if (screen === 'learning') return <LearningScreen />;
  if (screen === 'completion') return <Completion />;
  return <Onboarding />;
}
