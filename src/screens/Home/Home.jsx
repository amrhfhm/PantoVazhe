import { useNavigate } from 'react-router-dom';
import { GearSix } from '@phosphor-icons/react';
import styles from './Home.module.css';
import Button from '../../components/Button/Button.jsx';
import logoSvg from '../../assets/logo.svg';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function Home() {
  const navigate = useNavigate();
  const gamePhase = useGameStore((s) => s.gamePhase);
  const hasIncompleteGame = gamePhase !== 'IDLE' && gamePhase !== 'GAME_OVER';

  const handleNewGame = () => {
    navigate('/setup');
  };

  const handleResume = () => {
    const phase = useGameStore.getState().gamePhase;
    if (phase === 'ACTIVE_TURN' || phase === 'PAUSED') navigate('/active-turn');
    else if (phase === 'PRE_TURN') navigate('/pre-turn');
    else if (phase === 'TURN_SUMMARY') navigate('/turn-summary');
    else if (phase === 'ROUND_SCOREBOARD') navigate('/round-scoreboard');
    else if (phase === 'ROUND_INTRO') navigate('/round-intro');
    else navigate('/setup');
  };

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.settingsBtn} onClick={() => navigate('/settings')} aria-label="تنظیمات">
          <GearSix size={28} weight="bold" />
        </button>
      </div>

      <div className={styles.center}>
        <img src={logoSvg} alt="logo" width={120} />
        <h1 className={styles.title}>{S.appName}</h1>

        {hasIncompleteGame && (
          <div className={styles.banner}>
            <p className={styles.bannerText}>{S.resumeBanner}</p>
            <div className={styles.bannerActions}>
              <Button variant="primary" size="sm" onClick={handleResume}>{S.resume}</Button>
              <Button variant="secondary" size="sm" onClick={handleNewGame}>{S.newGame}</Button>
            </div>
          </div>
        )}

        <div className={styles.buttons}>
          <Button variant="primary" onClick={handleNewGame}>{S.newGame}</Button>
          <Button variant="secondary" onClick={() => navigate('/rules')}>{S.rules}</Button>
          <Button variant="text" onClick={() => navigate('/about')}>{S.support}</Button>
        </div>
      </div>
    </div>
  );
}
