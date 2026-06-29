import styles from './LoadingTransition.module.css';
import logoSvg from '../../assets/logo.svg';

export default function LoadingTransition({ topColor, bottomColor }) {
  return (
    <div className={styles.container}>
      <div className={styles.top} style={{ backgroundColor: topColor }} />
      <div className={styles.bottom} style={{ backgroundColor: bottomColor }} />
      <img src={logoSvg} alt="logo" width={80} className={styles.logo} />
    </div>
  );
}
