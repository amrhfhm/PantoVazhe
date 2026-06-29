import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameOver.module.css';
import Button from '../../components/Button/Button.jsx';
import ConfettiCanvas from '../../components/ConfettiCanvas/ConfettiCanvas.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function GameOver() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const resetGame = useGameStore((s) => s.actions.resetGame);
  const settings = useGameStore((s) => s.settings);

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const topScore = sorted[0]?.score;
  const winners = sorted.filter((t) => t.score === topScore);

  useEffect(() => {
    if (settings.vibrationEnabled) {
      navigator.vibrate?.([100, 50, 100, 50, 300]);
    }
  }, [settings.vibrationEnabled]);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/setup');
  };

  const handleHome = () => {
    resetGame();
    navigate('/home');
  };

  return (
    <div className={styles.screen}>
      <ConfettiCanvas colors={winners.map((w) => w.color)} />

      <div className={styles.content}>
        <h1 className={styles.title}>{S.gameOver}</h1>

        <div className={styles.winnerBox}>
          <p className={styles.winnerLabel}>{S.winner}</p>
          {winners.map((w) => (
            <div key={w.id} className={styles.winnerRow}>
              <div className={styles.winnerColor} style={{ backgroundColor: w.color }} />
              <span className={styles.winnerName}>{w.name}</span>
              <span className={styles.winnerScore} style={{ color: w.color }}>{w.score}</span>
            </div>
          ))}
        </div>

        <div className={styles.scoreList}>
          <h2 className={styles.scoresTitle}>{S.finalScores}</h2>
          {sorted.map((team, i) => (
            <div key={team.id} className={styles.scoreRow}>
              <span className={styles.scoreRank}>{i + 1}</span>
              <div className={styles.scoreDot} style={{ backgroundColor: team.color }} />
              <span className={styles.scoreName}>{team.name}</span>
              <span className={styles.scoreVal}>{team.score}</span>
            </div>
          ))}
        </div>

        <div className={styles.buttons}>
          <Button variant="primary" onClick={handlePlayAgain}>{S.playAgain}</Button>
          <Button variant="secondary" onClick={handleHome}>{S.backHome}</Button>
        </div>
      </div>
    </div>
  );
}
