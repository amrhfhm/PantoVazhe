import { TEAM_COLORS } from '../../data/teamColors.js';
import styles from './TeamColorPicker.module.css';

export default function TeamColorPicker({ value, onChange }) {
  return (
    <div className={styles.picker}>
      {TEAM_COLORS.map((c) => (
        <button
          key={c.hex}
          type="button"
          className={`${styles.circle} ${value === c.hex ? styles.selected : ''}`}
          style={{ backgroundColor: c.hex }}
          title={c.name}
          onClick={() => onChange(c.hex)}
        />
      ))}
    </div>
  );
}
