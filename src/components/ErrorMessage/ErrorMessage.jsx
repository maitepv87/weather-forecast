import styles from "./ErrorMessage.module.css";

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.error} role="alert">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.retryBtn}>
          Try again
        </button>
      )}
    </div>
  );
};
