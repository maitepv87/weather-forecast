import styles from "./EmptyState.module.css";

export const EmptyState = ({ message, icon }) => {
  return (
    <div className={styles.empty} role="status">
      {icon && <div className={styles.icon}>{icon}</div>}
      <p>{message || "No results found. Try a different search."}</p>
    </div>
  );
};
