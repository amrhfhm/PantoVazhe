import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trash } from '@phosphor-icons/react';
import styles from './Setup.module.css';
import Button from '../../components/Button/Button.jsx';
import TeamColorPicker from '../../components/TeamColorPicker/TeamColorPicker.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';
import { baseCards } from '../../data/baseCards.js';

export default function Setup() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const settings = useGameStore((s) => s.settings);
  const { setTeams, addTeam, removeTeam, updateTeam, updateSettings, startGame, setGamePhase } =
    useGameStore((s) => s.actions);

  const handleStart = () => {
    if (settings.deckType === 'ai' || settings.deckType === 'both') {
      setGamePhase('LOADING_AI_CARDS');
      navigate('/ai-loading');
    } else {
      startGame(baseCards);
      navigate('/round-intro');
    }
  };

  const canStart = teams.length >= 2 && teams.every((t) => t.name.trim());

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowRight size={24} weight="bold" />
        </button>
        <h1 className={styles.headerTitle}>{S.setupTitle}</h1>
      </div>

      <div className={styles.content}>
        {/* Teams */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{S.teams}</div>
          {teams.map((team, i) => (
            <div key={team.id} className={styles.teamCard}>
              <div className={styles.teamHeader}>
                <span className={styles.teamLabel}>{S.team} {i + 1}</span>
                {teams.length > 2 && (
                  <button className={styles.removeBtn} onClick={() => removeTeam(team.id)}>
                    <Trash size={20} />
                  </button>
                )}
              </div>
              <input
                className={styles.input}
                value={team.name}
                onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                placeholder={`${S.teamName} ${i + 1}`}
              />
              <TeamColorPicker
                value={team.color}
                onChange={(hex) => updateTeam(team.id, { color: hex })}
              />
            </div>
          ))}
          {teams.length < 6 && (
            <Button variant="secondary" onClick={addTeam}>+ {S.addTeam}</Button>
          )}
        </div>

        {/* Timer */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>تنظیمات</div>
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>{S.timerDuration}</span>
            <div className={styles.stepper}>
              <button
                className={styles.stepperBtn}
                onClick={() => updateSettings({ timerDuration: Math.max(30, settings.timerDuration - 10) })}
              >−</button>
              <span className={styles.stepperValue}>{settings.timerDuration}</span>
              <button
                className={styles.stepperBtn}
                onClick={() => updateSettings({ timerDuration: Math.min(120, settings.timerDuration + 10) })}
              >+</button>
            </div>
          </div>

          {/* Card count */}
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>{S.cardCount}</span>
            <div className={styles.stepper}>
              <button
                className={styles.stepperBtn}
                onClick={() => updateSettings({ cardCount: Math.max(20, settings.cardCount - 5) })}
              >−</button>
              <span className={styles.stepperValue}>{settings.cardCount}</span>
              <button
                className={styles.stepperBtn}
                onClick={() => updateSettings({ cardCount: Math.min(60, settings.cardCount + 5) })}
              >+</button>
            </div>
          </div>

          {/* Allow skips */}
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>{S.allowSkips}</span>
            <button
              className={`${styles.toggle} ${settings.allowSkips ? styles.toggleOn : styles.toggleOff}`}
              onClick={() => updateSettings({ allowSkips: !settings.allowSkips })}
            >
              <span className={`${styles.toggleKnob} ${settings.allowSkips ? styles.toggleKnobOn : styles.toggleKnobOff}`} />
            </button>
          </div>
        </div>

        {/* Deck type */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>{S.deckType}</div>
          <div className={styles.deckOptions}>
            {[
              { key: 'base', label: S.deckBase },
              { key: 'ai', label: S.deckAI },
              { key: 'both', label: S.deckBoth },
            ].map((opt) => (
              <div
                key={opt.key}
                className={`${styles.deckOption} ${settings.deckType === opt.key ? styles.deckOptionActive : ''}`}
                onClick={() => updateSettings({ deckType: opt.key })}
              >
                <div className={`${styles.radio} ${settings.deckType === opt.key ? styles.radioActive : ''}`}>
                  {settings.deckType === opt.key && <span className={styles.radioDot} />}
                </div>
                <span className={styles.deckOptionLabel}>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.fixedBottom}>
        <Button variant="primary" onClick={handleStart} disabled={!canStart}>
          {S.startGame}
        </Button>
      </div>
    </div>
  );
}
