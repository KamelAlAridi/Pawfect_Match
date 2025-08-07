import styles from "../CSSmodules/Search.module.css";

export default function Search({
  setGender,
  setType,
  type,
  gender,
  filterPets,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    filterPets(e);
  };
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <select
          className={styles.select}
          id="type"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value="">Select Type</option>
          <option value="Others">Others</option>
          <option value="Male">Dog</option>
          <option value="Female">Cat</option>
        </select>
        <select
          className={styles.select}
          id="gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button onClick={handleSubmit} type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
}
