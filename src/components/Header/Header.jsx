import styles from "./Header.module.css";
import githubLogo from "../../assets/github.png";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Weather Forecast</h1>
        <a
          href="https://github.com/maitepv87/weather-forecast"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubLogo} alt="GitHub" className={styles.githubLogo} />
        </a>
      </div>
    </header>
  );
};
