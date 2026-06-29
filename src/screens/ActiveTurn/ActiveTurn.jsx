import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pause } from '@phosphor-icons/react';
import styles from './ActiveTurn.module.css';
import Button from '../../components/Button/Button.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';
import PauseScreen from '../Pause/Pause.jsx';

export default function ActiveTurn() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const currentRound = useGameStore((s) => s.currentRound);
  const remainingDeck = useGameStore((s) => s.remainingDeck);
  const activeTurn = useGameStore((s) => s.activeTurn);
  const settings = useGameStore((s) => s.settings);
  const gamePhase = useGameStore((s) => s.gamePhase);
  const markCard = useGameStore((s) => s.actions.markCard);
  const commitTurn = useGameStore((s) => s.actions.commitTurn);
  const pauseGame = useGameStore((s) => s.actions.pauseGame);

  const team = teams[currentTeamIndex];
  const teamColor = team?.color || '#1D4ED8';
  const currentCard = remainingDeck[0];

  const [timeLeft, setTimeLeft] = useState(settings.timerDuration);
  const [isPaused, setIsPaused] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [cardExiting, setCardExiting] = useState(null);

  useEffect(() => {
    if (gamePhase === 'PAUSED') {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, [gamePhase]);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      commitTurn();
      navigate('/turn-summary');
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1;
        if (next <= 10) setIsUrgent(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, timeLeft, commitTurn, navigate]);

  useEffect(() => {
    if (remainingDeck.length === 0) {
      commitTurn();
      navigate('/turn-summary');
    }
  }, [remainingDeck.length, commitTurn, navigate]);

  const handleAction = useCallback((result) => {
    if (!currentCard) return;
    setCardExiting(result);
    setTimeout(() => {
      markCard(currentCard, result);
      setCardExiting(null);
    }, 250);
  }, [currentCard, markCard]);

  const handlePause = () => {
    pauseGame();
    setIsPaused(true);
  };

  const handleResume = () => {
    useGameStore.getState().actions.resumeGame();
    setIsPaused(false);
  };

  const roundRules = ['توضیح کلامی', 'یک کلمه', 'پانتومیم'];

  return (
    <div className={styles.screen} style={{ backgroundColor: teamColor }}>
      <div className={styles.topBar}>
        <button className={styles.pauseBtn} onClick={handlePause} aria-label={S.pause}>
          <Pause size={24} weight="bold" />
        </button>
        <span className={styles.roundLabel}>{S.round} {currentRound} — {roundRules[currentRound - 1]}</span>
        <span className={styles.score}>+{activeTurn.pointsEarned}</span>
      </div>

      <div className={`${styles.timer} ${isUrgent ? styles.urgent : ''}`}>
        {timeLeft}
      </div>

      <div className={styles.cardArea}>
        {currentCard && (
          <div
            className={`${styles.card} ${cardExiting === 'correct' ? styles.exitLeft : ''} ${cardExiting === 'skipped' ? styles.exitRight : ''}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.category}>{currentCard.category}</span>
              <span className={styles.scoreChip} style={{ backgroundColor: teamColor }}>
                {currentCard.points}●
              </span>
            </div>
            <h2 className={styles.word}>{currentCard.word}</h2>
            <p className={styles.description}>{currentCard.description}</p>
            {settings.showRuleTooltips && (
              <div className={styles.ruleTooltip}>
                <span>{roundRules[currentRound - 1]}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {settings.allowSkips && (
          <Button variant="secondary" onClick={() => handleAction('skipped')} style={{ flex: 1, borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
            {S.skip}
          </Button>
        )}
        <Button variant="primary" onClick={() => handleAction('correct')} style={{ flex: 2, backgroundColor: 'rgba(255,255,255,0.2)' }}>
          ✓ {S.correct}
        </Button>
      </div>

      {isPaused && <PauseScreen onResume={handleResume} />}
    </div>
  );
}
