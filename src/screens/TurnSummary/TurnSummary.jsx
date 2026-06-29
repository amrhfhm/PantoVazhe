import { useNavigate } from 'react-router-dom';
import styles from './TurnSummary.module.css';
import Button from '../../components/Button/Button.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function TurnSummary() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const activeTurn = useGameStore((s) => s.activeTurn);
  const toggleCardResult = useGameStore((s) => s.actions.toggleCardResult);
  const nextTeam = useGameStore((s) => s.actions.nextTeam);
  const remainingDeck = useGameStore((s) => s.remainingDeck);

  const team = teams[currentTeamIndex];
  const teamColor = team?.color || '#1D4ED8';

  const correctCards = activeTurn.cardsPlayed.filter((c) => c.result === 'correct');
  const points = correctCards.reduce((sum, c) => sum + (c.card.points || 1), 0);

  const handleEndTurn = () => {
    if (remainingDeck.length === 0) {
      navigate('/round-scoreboard');
    } else {
      nextTeam();
      navigate('/loading');
    }
  };

  return (
    <div className={styles.screen} style={{ backgroundColor: teamColor + 'dd' }}>
      <div className={styles.header}>
        <h1 className={styles.title}>{S.turnSummaryTitle}</h1>
        <div className={styles.pointsBadge}>+{points} {S.points}</div>
      </div>

      <div className={styles.ruleBanner}>
        <span>{S.ruleWarning}</span>
      </div>

      <div className={styles.list}>
        {activeTurn.cardsPlayed.map(({ card, result }) => (
          <div key={card.id} className={styles.row}>
            <span className={styles.cardName}>{card.word}</span>
            <button
              className={`${styles.chip} ${result === 'correct' ? styles.correct : styles.skipped}`}
              style={result === 'correct' ? { backgroundColor: teamColor } : {}}
              onClick={() => toggleCardResult(card.id)}
              aria-label={`تغییر نتیجه ${card.word}`}
            >
              {result === 'correct' ? `${card.points}●` : '—'}
            </button>
          </div>
        ))}
        {activeTurn.cardsPlayed.length === 0 && (
          <p className={styles.empty}>هیچ کارتی بازی نشد</p>
        )}
      </div>

      <div className={styles.bottom}>
        <Button variant="primary" onClick={handleEndTurn} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)' }}>
          {S.endTurn}
        </Button>
      </div>
    </div>
  );
}
