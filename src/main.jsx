import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';

import Splash from './screens/Splash/Splash.jsx';
import Home from './screens/Home/Home.jsx';
import Rules from './screens/Rules/Rules.jsx';
import Setup from './screens/Setup/Setup.jsx';
import Loading from './screens/Loading/Loading.jsx';
import RoundIntro from './screens/RoundIntro/RoundIntro.jsx';
import PreTurn from './screens/PreTurn/PreTurn.jsx';
import ActiveTurn from './screens/ActiveTurn/ActiveTurn.jsx';
import TurnSummary from './screens/TurnSummary/TurnSummary.jsx';
import RoundScoreboard from './screens/RoundScoreboard/RoundScoreboard.jsx';
import AILoading from './screens/AILoading/AILoading.jsx';
import Settings from './screens/Settings/Settings.jsx';
import About from './screens/About/About.jsx';
import GameOver from './screens/GameOver/GameOver.jsx';

import useGameStore from './store/gameStore.js';

function AppInit() {
  const theme = useGameStore((s) => s.theme);
  React.useEffect(() => {
    const saved = localStorage.getItem('pantovazheh_theme');
    if (saved) {
      useGameStore.getState().actions.setTheme(saved);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppInit />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/round-intro" element={<RoundIntro />} />
        <Route path="/pre-turn" element={<PreTurn />} />
        <Route path="/active-turn" element={<ActiveTurn />} />
        <Route path="/turn-summary" element={<TurnSummary />} />
        <Route path="/round-scoreboard" element={<RoundScoreboard />} />
        <Route path="/ai-loading" element={<AILoading />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
