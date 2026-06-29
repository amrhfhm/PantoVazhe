import { S } from '../../strings.js';
import styles from './RuleBadge.module.css';

const ROUND_LABELS = [S.round1Badge, S.round2Badge, S.round3Badge];

export default function RuleBadge({ round }) {
  return (
    <span className={`${styles.badge} ${styles[`round${round}`]}`}>
      {ROUND_LABELS[round - 1]}
    </span>
  );
}
