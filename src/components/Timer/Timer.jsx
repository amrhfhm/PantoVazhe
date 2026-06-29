import styles from './Timer.module.css';

export default function Timer({ timeLeft }) {
  const isUrgent = timeLeft <= 10;
  return (
    <div className={`${styles.timer} ${isUrgent ? styles.urgent : ''}`}>
      {timeLeft}
    </div>
  );
}
