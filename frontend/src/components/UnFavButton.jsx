import styles from "../CSSmodules/UnFavButton.module.css";
import { removeFromFavorites } from "../../api/petApi";

export default function UnFavButton({ petid, setIsFav, btnText, setBtnText }) {
  const handleRmvFromFavorites = async () => {
    const user = localStorage.getItem("user");

    const userId = JSON.parse(user)?.id;
    if (!userId) {
      setBtnText("Please log in to add/remove pets to/from favorites.");
      return;
    }

    const removed = await removeFromFavorites(petid, userId).catch((error) => {
      console.error("Error adding pet to favorites:", error);
      setBtnText("Failed to remove pet from favorites. Try again later.");
      setTimeout(() => {
        setBtnText("");
      }, 3000);
      return;
    });
    if (removed) {
      setBtnText("Pet removed from favorites");
      setTimeout(() => {
        setBtnText("");
      }, 3000);
      setIsFav(false);
    }
  };

  return (
    <>
      <div className={styles.err}>{btnText}</div>
      <div className={styles.unfavButtonContainer}>
        <button className={styles.unfavButton} onClick={handleRmvFromFavorites}>
          <span className={styles.unfavText}>Rmv from Favorites</span>
        </button>
      </div>
    </>
  );
}
