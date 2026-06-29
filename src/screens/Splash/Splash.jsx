import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Splash.module.css';
import logoSvg from '../../assets/logo.svg';
import { S } from '../../strings.js';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/home'), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className={styles.screen} onClick={() => navigate('/home')}>
      <img src={logoSvg} alt="logo" width={200} className={styles.logo} />
      <div className={styles.textGroup}>
        <h1 className={styles.title}>{S.appName}</h1>
        <p className={styles.tagline}>{S.tagline}</p>
      </div>
    </div>
  );
}
