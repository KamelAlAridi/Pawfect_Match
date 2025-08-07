import { useEffect, useState } from "react";
import styles from "../CSSmodules/MainPage.module.css";
import * as api from "../../api/petApi.js";
import PetCard from "../components/PetCard";
import Search from "../components/Search.jsx";

const itemsPerPage = 20;

export default function MainPage() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const allPets = await api.getPets();
        setPets(allPets);
        setFilteredPets(allPets);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };

    fetchPets();
  }, []);

  function filterPets() {
    setCurrentPage(1);
    if (type !== "" && gender !== "") {
      const filtered = pets.filter((pet) => pet.type === type);
      setFilteredPets(filtered.filter((pet) => pet.gender === gender));
      return;
    }
    if (type !== "") {
      setFilteredPets(pets.filter((pet) => pet.type === type));
      return;
    }
    if (gender !== "") {
      setFilteredPets(pets.filter((pet) => pet.gender === gender));
      return;
    }
    setFilteredPets(pets);
  }

  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Every Pet Deserves a Loving Home.</h1>
        <h1 className={styles.header}>
          <span className={styles.inheader}>Adopt</span> a Pet Today
        </h1>
      </div>
      <Search
        setGender={setGender}
        setType={setType}
        type={type}
        gender={gender}
        filterPets={filterPets}
      />
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
