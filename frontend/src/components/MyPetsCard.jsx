import styles from "../CSSmodules/MyPetsCard.module.css";
import { deletePet } from "../../api/petApi";

export default function MyPetsCard({ pet, onDelete }) {
  const handleDelete = async () => {
    try {
      await deletePet(pet.id);
      onDelete(pet.id);
    } catch (err) {
      console.error("Failed to delete pet:", err);
      alert("Failed to delete pet. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.parag}>{pet.name}</p>
        <p className={styles.parag}>{pet.type}</p>
        <p className={styles.parag}>{pet.gender}</p>
        <button className={styles.btn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
