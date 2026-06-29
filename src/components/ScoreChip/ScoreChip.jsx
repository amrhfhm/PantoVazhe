import styles from './ScoreChip.module.css';

export default function ScoreChip({ points, active }) {
  return (
    <span className={`${styles.chip} ${points >= 3 ? styles.high : styles.normal}`}>
      {points} امتیاز
    </span>
  );
}
