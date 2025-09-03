import styles from "./SearchBox.module.css";

export const SearchBox = ({ value, onChange }) => {
  return (
    <div className={styles.searchBox}>
      <input
        type="search"
        id="searchTerm"
        name="searchTerm"
        placeholder="Enter city name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
