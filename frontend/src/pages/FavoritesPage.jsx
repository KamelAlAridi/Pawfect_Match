import { useEffect, useState } from "react";
import { getFavorites } from "../../api/petApi";
import styles from "../CSSmodules/FavoritesPage.module.css";
import PetCard from "../components/PetCard";

const itemsPerPage = 20;

export default function FavoritesPage({ user }) {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const favPets = await getFavorites(user.id);
        setPets(favPets);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };

    fetchPets();
  }, []);

  const totalPages = Math.ceil(pets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {currentItems.map((pet, index) => (
          <PetCard
            key={index}
            image_url={pet.photo}
            name={pet.name}
            id={pet.id}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className={styles.pageButton}
        >
          Prev
        </button>
        <span className={styles.pageInfo}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}
