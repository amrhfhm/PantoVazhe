import styles from './Card.module.css';
import ScoreChip from '../ScoreChip/ScoreChip.jsx';

export default function Card({ card, swipeDir, showRuleTooltip }) {
  if (!card) return null;
  return (
    <div
      className={`${styles.card} ${swipeDir === 'left' ? styles.swipeLeft : ''} ${swipeDir === 'right' ? styles.swipeRight : ''}`}
    >
      <div className={styles.top}>
        <span className={styles.category}>{card.category}</span>
        <ScoreChip points={card.points} />
      </div>
      <div className={styles.word}>{card.word}</div>
      <div className={styles.description}>{card.description}</div>
    </div>
  );
}
