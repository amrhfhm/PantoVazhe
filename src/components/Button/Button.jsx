import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  type = 'button',
  className = '',
  style,
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${size !== 'md' ? styles[size] : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
