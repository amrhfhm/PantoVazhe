import { useNavigate } from 'react-router-dom';
import { ArrowRight, EnvelopeSimple, InstagramLogo } from '@phosphor-icons/react';
import styles from './About.module.css';
import logoSvg from '../../assets/logo.svg';
import { S } from '../../strings.js';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label={S.back}>
          <ArrowRight size={24} weight="bold" />
        </button>
        <h1 className={styles.title}>{S.aboutTitle}</h1>
      </div>

      <div className={styles.content}>
        <img src={logoSvg} alt="logo" width={120} className={styles.logo} />
        <h2 className={styles.appName}>{S.appName}</h2>
        <p className={styles.version}>{S.version}</p>
        <p className={styles.desc}>{S.aboutDesc}</p>

        <div className={styles.credits}>
          <p className={styles.creditsLabel}>{S.credits}</p>
          <p className={styles.creditsName}>{S.creditName}</p>
        </div>

        <div className={styles.links}>
          <a href="mailto:info@pantovazheh.ir" className={styles.iconLink} aria-label="ایمیل">
            <EnvelopeSimple size={28} weight="bold" />
          </a>
          <a href="https://instagram.com/pantovazheh" className={styles.iconLink} aria-label="اینستاگرام">
            <InstagramLogo size={28} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}
