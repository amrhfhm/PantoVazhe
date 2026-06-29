import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import styles from './Settings.module.css';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.toggleKnob} />
    </button>
  );
}

function Row({ label, children }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      {children}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const settings = useGameStore((s) => s.settings);
  const theme = useGameStore((s) => s.theme);
  const updateSettings = useGameStore((s) => s.actions.updateSettings);
  const setTheme = useGameStore((s) => s.actions.setTheme);

  const supportsVibration = typeof navigator.vibrate === 'function';

  const handleThemeToggle = () => {
    const next = theme === 'violet' ? 'coral' : 'violet';
    setTheme(next);
    localStorage.setItem('pantovazheh_theme', next);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label={S.back}>
          <ArrowRight size={24} weight="bold" />
        </button>
        <h1 className={styles.title}>{S.settingsTitle}</h1>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>صدا</h2>
          <Row label={S.sound}>
            <Toggle
              checked={settings.soundEnabled}
              onChange={(v) => {
                updateSettings({ soundEnabled: v });
                localStorage.setItem('pantovazheh_sound', v ? '1' : '0');
              }}
            />
          </Row>
        </div>

        {supportsVibration && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>لرزش</h2>
            <Row label={S.vibration}>
              <Toggle
                checked={settings.vibrationEnabled}
                onChange={(v) => {
                  updateSettings({ vibrationEnabled: v });
                  localStorage.setItem('pantovazheh_vibration', v ? '1' : '0');
                }}
              />
            </Row>
          </div>
        )}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>نمایش</h2>
          <Row label={S.showRuleTooltips}>
            <Toggle
              checked={settings.showRuleTooltips}
              onChange={(v) => updateSettings({ showRuleTooltips: v })}
            />
          </Row>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>درباره</h2>
          <Row label="نسخه">
            <span className={styles.secondary}>{S.version}</span>
          </Row>
          <Row label={S.contact}>
            <a href="mailto:info@pantovazheh.ir" className={styles.link}>ایمیل</a>
          </Row>
          <Row label={S.about}>
            <button className={styles.link} onClick={() => navigate('/about')}>مشاهده</button>
          </Row>
        </div>

        <div className={styles.devSection}>
          <h2 className={styles.devTitle}>{S.developerSection}</h2>
          <Row label="تم برند">
            <Toggle checked={theme === 'coral'} onChange={handleThemeToggle} />
          </Row>
          <p className={styles.devHint}>{theme === 'violet' ? S.themeViolet : S.themeCoral}</p>
        </div>
      </div>
    </div>
  );
}
