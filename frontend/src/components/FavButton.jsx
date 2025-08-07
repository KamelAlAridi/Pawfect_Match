import styles from "../CSSmodules/FavButton.module.css";
import { addToFavorites } from "../../api/petApi";

export default function FavButton({ petid, setIsFav, btnText, setBtnText }) {
  const handleAddToFavorites = async () => {
    const user = localStorage.getItem("user");

    const userId = JSON.parse(user)?.id;
    if (!userId) {
      setBtnText("Please log in to add/remove pets to/from favorites.");
      return;
    }

    const added = await addToFavorites(petid, userId).catch((error) => {
      console.error("Error adding pet to favorites:", error);
      setBtnText("Failed to add pet to favorites. Try again later");
      setTimeout(() => {
        setBtnText("");
      }, 3000);
      return;
    });
    if (added) {
      setBtnText("Pet added to favorites");
      setTimeout(() => {
        setBtnText("");
      }, 3000);
      setIsFav(true);
    }
  };

  return (
    <>
      <div className={styles.err}>{btnText}</div>
      <div className={styles.favButtonContainer}>
        <button className={styles.favButton} onClick={handleAddToFavorites}>
          <span className={styles.favText}>Add to Favorites</span>
        </button>
      </div>
    </>
  );
}
