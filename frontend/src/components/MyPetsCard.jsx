import styles from "../CSSmodules/MyPetsCard.module.css";

export default function MyPetsCard({ pet }) {
  console.log(pet);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p>{pet.name}</p>
        <p>{pet.type}</p>
        <p>{pet.gender}</p>
        <button>Delete</button>
      </div>
    </div>
  );
}
