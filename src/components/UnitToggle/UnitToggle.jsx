import styles from "./UnitToggle.module.css";

export const UnitToggle = ({ unit, onToggle }) => {
  const isCelsius = unit === "metric";

  return (
    <div className={styles.toggleWrapper}>
      <span className={!isCelsius ? styles.inactive : ""}>°C</span>
      <button
        className={`${styles.toggleSwitch} ${
          isCelsius ? styles.celsius : styles.fahrenheit
        }`}
        onClick={onToggle}
        aria-label={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
      >
        <div className={styles.thumb}></div>
      </button>
      <span className={isCelsius ? styles.inactive : ""}>°F</span>
    </div>
  );
};
