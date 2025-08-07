import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../../api/petApi";
import styles from "../CSSmodules/PetPage.module.css";
import FavButton from "../components/FavButton";
import UnFavButton from "../components/UnFavButton";

export default function PetPage({ isAuthenticated }) {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [btnText, setBtnText] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const foundPet = await api.getPetById(id);
        if (isAuthenticated) {
          const favorite = await api.isPetFavorite(
            id,
            JSON.parse(localStorage.getItem("user"))?.id
          );
          setIsFav(favorite.isFavorite);
        }
        setPet(foundPet);
      } catch (err) {
        console.error(err);
        setError("Failed to load pet.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) return <p>Loading pet details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={pet.photo} alt={pet.name} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{pet.name}</h2>

        <div className={styles.infoRow}>
          <span className={styles.label}>Type:</span>
          <span className={styles.value}>{pet.type}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Gender:</span>
          <span className={styles.value}>{pet.gender}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>{pet.phone_num}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Added:</span>
          <span className={styles.value}>
            {new Date(pet.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      {isFav ? (
        <UnFavButton
          petid={id}
          setIsFav={setIsFav}
          btnText={btnText}
          setBtnText={setBtnText}
        />
      ) : (
        <FavButton
          petid={id}
          setIsFav={setIsFav}
          btnText={btnText}
          setBtnText={setBtnText}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
}
