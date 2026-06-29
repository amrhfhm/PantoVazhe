import { useNavigate } from 'react-router-dom';
import styles from './RoundScoreboard.module.css';
import Button from '../../components/Button/Button.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function RoundScoreboard() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const currentRound = useGameStore((s) => s.currentRound);
  const nextRound = useGameStore((s) => s.actions.nextRound);

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const isLastRound = currentRound >= 3;

  const handleNext = () => {
    if (isLastRound) {
      navigate('/game-over');
    } else {
      nextRound();
      navigate('/round-intro');
    }
  };

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>{S.roundScores} {currentRound}</h1>

      <div className={styles.list}>
        {sorted.map((team, i) => (
          <div key={team.id} className={styles.row}>
            <span className={styles.rank}>{i + 1}</span>
            <div className={styles.colorDot} style={{ backgroundColor: team.color }} />
            <span className={styles.name}>{team.name}</span>
            {i === 0 && <span className={styles.crown}>👑</span>}
            <span className={styles.score}>{team.score}</span>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <Button variant="primary" onClick={handleNext}>
          {isLastRound ? S.finalResults : S.nextRound}
        </Button>
      </div>
    </div>
  );
}
