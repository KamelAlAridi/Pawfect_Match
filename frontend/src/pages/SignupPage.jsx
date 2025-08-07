import React, { useState } from "react";
import styles from "../CSSmodules/SignupPage.module.css";
import * as api from "../../api/apiServices.js";

export default function SigninPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [enterPass, setEnterPass] = useState(false);
  const [code, setCode] = useState("");

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
    } else if (!name) {
      setErr("Please enter your name.");
      return;
    } else {
      const userExists = await api.isUserCreated(email).catch((error) => {
        console.error("Error checking user existence:", error);
        setErr("Failed to check user existence.");
        return null;
      });
      if (userExists === null) return;
      if (userExists.exists) {
        setErr("User already exists. Please sign in.");
        return;
      }
      setErr("");
      setEnterPass(true);
    }

    const msg = await api.requestCode(email).catch((error) => {
      setErr("Failed to send code");
      console.log(error);
      return null;
    });

    if (!msg) return;

    setErr(msg.message);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    const user = await api
      .signup(email, code, name, password)
      .catch((error) => {
        console.error("Error signing in:", error);
        setErr("Failed to sign up.");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {enterPass ? (
          <>
            <h2 className={styles.title}>Enter Code</h2>
            <p>{err}</p>
            <form className={styles.form}>
              <label htmlFor="code" className={styles.label}>
                code
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                id="code"
                className={styles.input}
                onChange={handleCodeChange}
                placeholder="code"
              />

              <button
                onClick={handleCodeSubmit}
                type="submit"
                className={styles.button}
              >
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Sign Up</h2>
            <p>{err}</p>
            <form className={styles.form}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                value={name}
                onChange={handleNameChange}
                placeholder="Your name"
              />

              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                onChange={handleEmailChange}
                value={email}
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
                value={password}
                placeholder="Enter your password"
              />

              <button
                onClick={handleSubmit}
                type="submit"
                className={styles.button}
              >
                Request Code
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
