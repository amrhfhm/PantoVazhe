import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import styles from './Rules.module.css';
import RuleBadge from '../../components/RuleBadge/RuleBadge.jsx';
import { S } from '../../strings.js';

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowRight size={24} weight="bold" />
        </button>
        <h1 className={styles.headerTitle}>{S.rulesTitle}</h1>
      </div>

      <div className={styles.content}>
        <div className={`${styles.roundCard} ${styles.round1}`}>
          <RuleBadge round={1} />
          <div className={styles.roundTitle}>{S.round1Name}</div>
          <div className={styles.roundDesc}>{S.round1Desc}</div>
        </div>

        <div className={`${styles.roundCard} ${styles.round2}`}>
          <RuleBadge round={2} />
          <div className={styles.roundTitle}>{S.round2Name}</div>
          <div className={styles.roundDesc}>{S.round2Desc}</div>
        </div>

        <div className={`${styles.roundCard} ${styles.round3}`}>
          <RuleBadge round={3} />
          <div className={styles.roundTitle}>{S.round3Name}</div>
          <div className={styles.roundDesc}>{S.round3Desc}</div>
        </div>

        <div className={styles.notesSection}>
          <div className={styles.notesTitle}>{S.importantNotes}</div>
          <ul className={styles.notesList}>
            <li className={styles.noteItem}>{S.note1}</li>
            <li className={styles.noteItem}>{S.note2}</li>
            <li className={styles.noteItem}>{S.note3}</li>
            <li className={styles.noteItem}>{S.note4}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
