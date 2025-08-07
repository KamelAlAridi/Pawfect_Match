import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSSmodules/CustomButton.module.css";

export default function CustomButton({ text, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div>
      <button className={styles.button} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
}
