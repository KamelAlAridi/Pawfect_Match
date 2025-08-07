import { useState } from "react";
import styles from "../CSSmodules/SigninPage.module.css";
import * as api from "../../api/apiServices.js";

export default function SigninPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!emailRegex.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    } else if (password.length < 8) {
      setErr("password must be at least 8 characters long.");
      return;
    } else if (!capitalLetterRegex.test(password)) {
      setErr("password must include at least one capital letter.");
      return;
    } else if (!numberRegex.test(password)) {
      setErr("password must include at least one number.");
      return;
    } else if (!specialCharRegex.test(password)) {
      setErr("password must include at least one special character.");
      return;
    } else {
      setErr("");
    }

    const user = await api.signin(email, password).catch((error) => {
      console.error("Error signing in:", error);
      setErr("Failed to sign in. Please check your credentials.");
      return null;
    });

    if (!user) {
      return;
    }
    onLogin(user.user);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>
        <p>{err}</p>
        <form className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            onChange={handleEmailChange}
            placeholder="you@example.com"
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />

          <button
            onClick={handleSubmit}
            type="submit"
            className={styles.button}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
