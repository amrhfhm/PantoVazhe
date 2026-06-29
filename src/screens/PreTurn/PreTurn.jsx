import { useNavigate } from 'react-router-dom';
import styles from './PreTurn.module.css';
import Button from '../../components/Button/Button.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function PreTurn() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const currentRound = useGameStore((s) => s.currentRound);
  const remainingDeck = useGameStore((s) => s.remainingDeck);
  const deck = useGameStore((s) => s.deck);
  const showRuleTooltips = useGameStore((s) => s.settings.showRuleTooltips);
  const startTurn = useGameStore((s) => s.actions.startTurn);

  const team = teams[currentTeamIndex];
  const teamColor = team?.color || '#1D4ED8';

  const roundRules = [
    'توضیح کلامی: کلمه رو با هر جمله‌ای که دوست داری توضیح بده. نمی‌تونی کلمه رو مستقیم بگی.',
    'یک کلمه: فقط یه کلمه می‌تونی بگی — همین!',
    'پانتومیم: هیچ کلمه‌ای نمی‌تونی بگی. فقط حرکت و اشاره!',
  ];

  const handleStart = () => {
    startTurn();
    navigate('/active-turn');
  };

  return (
    <div className={styles.screen} style={{ backgroundColor: teamColor }}>
      <div className={styles.teamName}>{team?.name}</div>

      <div className={styles.cardArea}>
        <div className={styles.card}>
          <div className={styles.roundBadge}>{currentRound}</div>
          <div className={styles.cardContent}>
            <div className={styles.roundLabel}>{S.round} {currentRound}</div>
            {showRuleTooltips && (
              <div className={styles.ruleTooltip}>
                <span className={styles.ruleText}>{roundRules[currentRound - 1]}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.counter}>
          {remainingDeck.length} {S.of} {deck.length} {S.cards}
        </div>
      </div>

      <div className={styles.bottom}>
        <Button variant="primary" onClick={handleStart} style={{ opacity: 0.95 }}>
          {S.startTurn}
        </Button>
      </div>
    </div>
  );
}
