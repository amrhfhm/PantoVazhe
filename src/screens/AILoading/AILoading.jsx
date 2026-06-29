import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AILoading.module.css';
import logoSvg from '../../assets/logo.svg';
import Button from '../../components/Button/Button.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';
import { generateAICards, getFallbackCards } from '../../services/aiCards.js';
import { baseCards } from '../../data/baseCards.js';

export default function AILoading() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { startGame } = useGameStore((s) => s.actions);
  const deckType = useGameStore((s) => s.settings.deckType);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      let deck = [];
      if (deckType === 'ai' || deckType === 'both') {
        const aiCards = await generateAICards(40);
        if (cancelled) return;
        if (!aiCards) {
          setError(true);
          return;
        }
        deck = deckType === 'both' ? [...baseCards, ...aiCards] : aiCards;
      } else {
        deck = baseCards;
      }
      startGame(deck);
      navigate('/round-intro');
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handleFallback = () => {
    startGame(baseCards);
    navigate('/round-intro');
  };

  return (
    <div className={styles.screen}>
      {!error ? (
        <>
          <img src={logoSvg} alt="logo" width={100} className={styles.logo} />
          <div className={styles.title}>{S.aiLoadingTitle}</div>
          <div className={styles.desc}>{S.aiLoadingDesc}</div>
          <div className={styles.dots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </>
      ) : (
        <div className={styles.errorBox}>
          <div className={styles.errorText}>{S.aiError}</div>
          <div className={styles.btnGroup}>
            <Button
              variant="secondary"
              onClick={() => { setError(false); }}
            >
              {S.retry}
            </Button>
            <Button variant="text" onClick={handleFallback}>{S.useFallback}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
