import { useState } from "react";
import styles from "../CSSmodules/SigninPage.module.css";
import { Link } from "react-router-dom";
import * as api from "../../api/apiServices.js";

export default function SigninPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
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

  const handleForgotPass = async (e) => {
    e.preventDefault();

    if (!email) {
      setErr("Enter email");
      return;
    }

    setForgotPass(true);

    const msg = await api.requestCode(email).catch((error) => {
      setErr("Failed to send code");
      console.log(error);
      return null;
    });

    if (!msg) return;

    setErr(msg.message);
  };

  const handleChangePass = async (e) => {
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

    const response = await api
      .newPassword(email, password, code)
      .catch((error) => {
        console.error("Error changing password: ", error);
        setErr(
          "Failed to change password. check your credentials or wait and request a new code."
        );
        return null;
      });

    if (!response) return;

    setErr("Password changed successfully");
    setForgotPass(false);
  };

  return (
    <div className={styles.container}>
      {forgotPass ? (
        <div className={styles.card}>
          <h2 className={styles.title}>Change Password</h2>
          <p>{err}</p>
          <form className={styles.form}>
            <label htmlFor="password" className={styles.labelPass}>
              <span>New Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <label htmlFor="code" className={styles.label}>
              Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              className={styles.input}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code sent to you"
            />
            <button
              onClick={handleChangePass}
              type="submit"
              className={styles.button}
            >
              Change Password
            </button>
          </form>
        </div>
      ) : (
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
              value={email}
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <label htmlFor="password" className={styles.labelPass}>
              <span>Password</span>
              <p className={styles.passBtn} onClick={handleForgotPass}>
                Forgot Password?
              </p>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
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
      )}
    </div>
  );
}
