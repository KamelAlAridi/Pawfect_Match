import { useState } from "react";
import styles from "../CSSmodules/AccountPage.module.css";
import {
  updateName,
  changePassword,
  deleteAccount,
} from "../../api/apiServices";

export default function AccountPage({ user, onLogout }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errName, setErrName] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errDelete, setErrDelete] = useState("");

  const handleNameChange = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrName("Name cannot be empty");
      return;
    }

    const response = await updateName(user.id, name).catch((error) => {
      console.error("Error updating name:", error);
      setErrName("Failed to update name. Please try again.");
      return null;
    });
    if (!response) {
      return;
    }
    localStorage.setItem("user", JSON.stringify(response.user));
    setErrName("Name updated successfully");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword || !password) {
      setErrPassword("Both fields are required");
      return;
    }

    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (newPassword.length < 8) {
      setErrPassword("password must be at least 8 characters long.");
      return;
    } else if (!capitalLetterRegex.test(newPassword)) {
      setErrPassword("password must include at least one capital letter.");
      return;
    } else if (!numberRegex.test(newPassword)) {
      setErrPassword("password must include at least one number.");
      return;
    } else if (!specialCharRegex.test(newPassword)) {
      setErrPassword("password must include at least one special character.");
      return;
    } else {
      setErrPassword("");
    }

    const response = await changePassword(
      user.email,
      password,
      newPassword
    ).catch((error) => {
      console.error("Error updating password:", error);
      setErrPassword(
        "Failed to update password. Checl your current password and try again."
      );
      return null;
    });
    if (!response) {
      return;
    }
    setErrPassword("Password updated successfully");
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!password) {
      setErrDelete("Password is required");
      return;
    }
    try {
      setErrDelete("");
      console.log(user.email);
      const response = await deleteAccount(user.email, password).catch(
        (error) => {
          console.error("Error deleting account:", error);
          setErrDelete("Failed to delete account. Please try again.");
          return null;
        }
      );
      if (response) {
        alert("account deleted");
        onLogout();
      }
    } catch (error) {
      console.error("Error deleting account:");
      setErrDelete(
        error.message || "Failed to delete account. Please try again."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.email}>{user.email}</p>
      </div>
      <div className={styles.editAccount}>
        <h2>Edit your Name:</h2>
        <div className={styles.card}>
          {errName}
          <form className={styles.form}>
            <label htmlFor="name" className={styles.label}>
              New Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter New Name"
            />

            <button
              onClick={handleNameChange}
              type="submit"
              className={styles.button}
            >
              Change Name
            </button>
          </form>
        </div>
      </div>
      <div className={styles.editAccount}>
        <h2>Edit your Password:</h2>
        <div className={styles.card}>
          {errPassword}
          <form className={styles.form}>
            <label htmlFor="newPassword" className={styles.label}>
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className={styles.input}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />

            <button
              onClick={handlePasswordChange}
              type="submit"
              className={styles.button}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      <div className={styles.editAccount}>
        <h2>Delete Account:</h2>
        <div className={styles.card}>
          {errDelete}
          <form className={styles.form}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />

            <button
              onClick={handleDeleteAccount}
              type="submit"
              className={styles.button}
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
      <div className={styles.logoutContainer}>
        <button className={styles.logout_button} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
