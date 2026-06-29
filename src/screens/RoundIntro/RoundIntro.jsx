import { useNavigate } from 'react-router-dom';
import styles from './RoundIntro.module.css';
import Button from '../../components/Button/Button.jsx';
import RuleBadge from '../../components/RuleBadge/RuleBadge.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

const ROUND_NAMES = [S.round1Name, S.round2Name, S.round3Name];
const ROUND_DESCS = [S.round1Desc, S.round2Desc, S.round3Desc];
const ROUND_NUMS = ['۱', '۲', '۳'];

export default function RoundIntro() {
  const navigate = useNavigate();
  const currentRound = useGameStore((s) => s.currentRound);
  const { setGamePhase } = useGameStore((s) => s.actions);

  const handleStart = () => {
    setGamePhase('LOADING_TRANSITION');
    navigate('/loading');
  };

  return (
    <div className={styles.screen}>
      <div className={styles.roundNumber}>{ROUND_NUMS[currentRound - 1]}</div>
      <RuleBadge round={currentRound} />
      <div className={styles.roundName}>{ROUND_NAMES[currentRound - 1]}</div>
      <div className={styles.roundDesc}>{ROUND_DESCS[currentRound - 1]}</div>
      <Button variant="primary" onClick={handleStart} className={styles.btn}>
        {S.letsGo}
      </Button>
    </div>
  );
}
