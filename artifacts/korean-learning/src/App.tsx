import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Onboarding from './components/Onboarding';
import LearningScreen from './components/LearningScreen';
import Completion from './components/Completion';

export default function App() {
  const screen = useAppStore((s) => s.screen);
  const completedSteps = useAppStore((s) => s.completedSteps);
  const goToScreen = useAppStore((s) => s.goToScreen);

  useEffect(() => {
    if (completedSteps.length === 20 && screen === 'learning') {
      goToScreen('completion');
    }
  }, [completedSteps.length]);

  if (screen === 'onboarding') return <Onboarding />;
  if (screen === 'learning') return <LearningScreen />;
  if (screen === 'completion') return <Completion />;
  return <Onboarding />;
}
