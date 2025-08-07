import { useNavigate } from "react-router-dom";
import styles from "../CSSmodules/PetCard.module.css";

export default function PetCard({ image_url, name, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pet/${id}`);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <img src={image_url} className={styles.image} />
      <div className={styles.name}>{name}</div>
    </div>
  );
}
