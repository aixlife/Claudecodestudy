import { useEffect } from 'react';
import { Router, Route, Switch } from 'wouter';
import { useAppStore } from './store/useAppStore';
import Onboarding from './components/Onboarding';
import LearningScreen from './components/LearningScreen';
import Completion from './components/Completion';
import CommunityHome from './pages/community/CommunityHome';
import CommunityBoard from './pages/community/CommunityBoard';
import CommunityMembers from './pages/community/CommunityMembers';
import CommunitySubmit from './pages/community/CommunitySubmit';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function MainApp() {
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

export default function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/community" component={CommunityHome} />
        <Route path="/community/board/:board" component={CommunityBoard} />
        <Route path="/community/members" component={CommunityMembers} />
        <Route path="/community/submit" component={CommunitySubmit} />
        <Route component={MainApp} />
      </Switch>
    </Router>
  );
}
