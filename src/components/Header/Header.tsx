import styles from './Header.module.scss'

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="6" height="6" fill="currentColor" />
      <rect x="10" y="0" width="6" height="6" fill="currentColor" />
      <rect x="0" y="10" width="6" height="6" fill="currentColor" />
      <rect x="10" y="10" width="6" height="6" fill="currentColor" />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.75774 5H4.96986V11H3.75774V5ZM1.3335 6.8H2.54562V9.2H1.3335V6.8ZM6.18198 2H7.3941V12.8H6.18198V2ZM8.60622 3.2H9.81834V14H8.60622V3.2ZM11.0305 5H12.2426V11H11.0305V5ZM13.4547 6.8H14.6668V9.2H13.4547V6.8Z" fill="#F5F6F8"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14 10.9467V13.304C14.0001 13.4728 13.9361 13.6353 13.8211 13.7588C13.706 13.8823 13.5484 13.9575 13.38 13.9693C13.0887 13.9893 12.8507 14 12.6667 14C6.77533 14 2 9.22467 2 3.33333C2 3.14933 2.01 2.91133 2.03067 2.62C2.04248 2.45163 2.11772 2.29401 2.2412 2.17894C2.36468 2.06387 2.52722 1.99992 2.696 2H5.05333C5.13603 1.99992 5.2158 2.03057 5.27715 2.08601C5.33851 2.14145 5.37706 2.21772 5.38533 2.3C5.40067 2.45333 5.41467 2.57533 5.428 2.668C5.56049 3.59262 5.832 4.49189 6.23333 5.33533C6.29667 5.46867 6.25533 5.628 6.13533 5.71333L4.69667 6.74133C5.5763 8.79097 7.2097 10.4244 9.25933 11.304L10.286 9.868C10.328 9.80933 10.3892 9.76725 10.459 9.7491C10.5288 9.73095 10.6028 9.73787 10.668 9.76867C11.5113 10.1692 12.4104 10.4401 13.3347 10.572C13.4273 10.5853 13.5493 10.6 13.7013 10.6147C13.7835 10.6231 13.8596 10.6617 13.9149 10.7231C13.9702 10.7844 14.0008 10.8641 14.0007 10.9467H14Z" fill="#F5F6F8"/>
    </svg>
  )
}

export function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <button className={styles.menuBtn} aria-label="Открыть меню">
          <GridIcon />
          <span>МЕНЮ</span>
        </button>
        <div className={styles.divider} aria-hidden="true" />
        <button className={styles.iconBtn} aria-label="Звук">
          <SoundIcon />
        </button>
      </div>

      <div className={styles.center}>
        <a href="/" className={styles.logo} aria-label="МОНАВИ Президенция — на главную">
          <img src="/logo.png" alt="МОНАВИ Президенция" className={styles.logoImg} draggable={false} />
        </a>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Позвонить нам">
          <PhoneIcon />
        </button>
        <div className={styles.divider} aria-hidden="true" />
        <button className={styles.ctaBtn} aria-label="Познакомиться с проектом">
          <span className={styles.ctaDot} aria-hidden="true" />
          ПОЗНАКОМИТЬСЯ
        </button>
      </div>
    </header>
  )
}
