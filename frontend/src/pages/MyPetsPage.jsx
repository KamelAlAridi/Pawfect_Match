import { useEffect, useState } from "react";
import styles from "../CSSmodules/MyPetsPage.module.css";
import { getPetsByUserId } from "../../api/petApi";
import MyPetsCard from "../components/MyPetsCard";

export default function MyPetsPage({ user }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const allPets = await getPetsByUserId(user.id);
        setPets(allPets);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };
    fetchPets();
  }, []);

  function onDelete(id) {
    setPets(pets.filter((pet) => pet.id !== id));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{user.name}'s Pets</h1>
      <div>
        {pets.map((pet) => (
          <MyPetsCard key={pet.id} pet={pet} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
