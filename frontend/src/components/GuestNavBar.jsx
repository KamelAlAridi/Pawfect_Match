import { useNavigate } from "react-router-dom";
import styles from "../CSSmodules/GuestNavBar.module.css";

export default function GuestNavBar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.iconContainer}>
          <img src="/images/pawFav.png" className={styles.icon} />
        </div>
        <button
          className={styles.sign_button}
          onClick={navigate.bind(null, "/")}
        >
          About
        </button>
        <button
          className={styles.sign_button}
          onClick={navigate.bind(null, "/signin")}
        >
          Sign in
        </button>
        <button
          className={styles.sign_button}
          onClick={navigate.bind(null, "/signup")}
        >
          Sign up
        </button>
      </nav>
    </>
  );
}
