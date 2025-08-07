import { useRef, useState } from "react";
import * as api from "../../api/petApi.js";
import styles from "../CSSmodules/AddPetPage.module.css";

function AddPetPage({ user }) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [phone_num, setPhone] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (!phone_num) {
      setErr("Please enter a phone number.");
      return;
    }

    if (!photo) {
      setErr("Please select a photo.");
      return;
    }

    if (!name) {
      setErr("Please enter a pet name.");
      return;
    }

    if (!gender) {
      setErr("Please select a gender");
      return;
    }

    if (!type) {
      setErr("Please select a type");
      return;
    }

    const user_id = user.id;

    try {
      const result = await api.addPet({
        name,
        gender,
        type,
        photo,
        phone_num,
        user_id,
      });
      console.log(result);
      setSuccess("Pet added successfully!");
    } catch (error) {
      setErr("Failed to add pet.");
      console.error("Error adding pet:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Add a Pet</h2>
        {err && (
          <div className={`${styles.message} ${styles.error}`}>{err}</div>
        )}
        {success && (
          <div className={`${styles.message} ${styles.success}`}>{success}</div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="photo">
            Photo
          </label>
          <button onClick={handleButtonClick} className={styles.input}>
            Choose Image
          </button>
          <input
            className={styles.input}
            type="file"
            id="photo"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <label className={styles.label} htmlFor="name">
            Pet Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            placeholder="Pet name"
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label} htmlFor="type">
            Pet Type
          </label>
          <select
            className={styles.select}
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="">Select Type</option>
            <option value="Others">Others</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>

          <label className={styles.label} htmlFor="gender">
            Gender
          </label>
          <select
            className={styles.select}
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label className={styles.label} htmlFor="phone">
            Owner Phone Number
          </label>
          <input
            className={styles.input}
            type="text"
            id="phone"
            placeholder="Owner phone number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            type="submit"
            className={styles.button}
          >
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPetPage;
