import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner = ({ size = 64, color = "#00bfff", label }) => {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div
        className={styles.spinner}
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};
