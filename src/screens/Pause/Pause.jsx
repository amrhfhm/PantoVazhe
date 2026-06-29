import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pause.module.css';
import Button from '../../components/Button/Button.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function PauseScreen({ onResume }) {
  const navigate = useNavigate();
  const endGame = useGameStore((s) => s.actions.endGame);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEndGame = () => {
    endGame();
    navigate('/home');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <h2 className={styles.title}>{S.gamePaused}</h2>

        {!showConfirm ? (
          <div className={styles.buttons}>
            <Button variant="primary" onClick={onResume}>{S.continueGame}</Button>
            <Button variant="secondary" onClick={() => navigate('/settings')}>{S.settings}</Button>
            <button className={styles.endBtn} onClick={() => setShowConfirm(true)}>
              {S.endGame}
            </button>
          </div>
        ) : (
          <div className={styles.confirm}>
            <p className={styles.confirmText}>{S.endGameConfirm}</p>
            <div className={styles.confirmBtns}>
              <Button variant="primary" onClick={handleEndGame}>{S.yes}</Button>
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>{S.no}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
