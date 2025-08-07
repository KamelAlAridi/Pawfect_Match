import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../CSSmodules/NavigationBar.module.css";

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLinkClick = () => {
    closeDrawer();
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.nav_left}>
          <div className={styles.iconContainer}>
            <img src="/images/pawFav.png" className={styles.icon} />
          </div>
          <Link to="/main" className={styles.nav_link}>
            Home
          </Link>
          <Link to="/favorites" className={styles.nav_link}>
            Favorites
          </Link>
          <Link to="/add-pet" className={styles.nav_link}>
            Add Pet
          </Link>
          <Link to="/my-pets" className={styles.nav_link}>
            My Pets
          </Link>
          <Link to="/about-us" className={styles.nav_link}>
            About Us
          </Link>
          <Link to="/account" className={styles.nav_link}>
            Account
          </Link>
        </div>

        <div className={styles.hamburger} onClick={toggleDrawer}>
          <div className={styles.hamburger_line}></div>
          <div className={styles.hamburger_line}></div>
          <div className={styles.hamburger_line}></div>
        </div>
      </nav>

      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawer_open : ""}`}
        onClick={closeDrawer}
      >
        <div
          className={`${styles.drawer_content} ${
            isDrawerOpen ? styles.drawer_content_open : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.drawer_header}>
            <h3 style={{ margin: 0, color: "#333" }}>Menu</h3>
            <button className={styles.close_button} onClick={closeDrawer}>
              x
            </button>
          </div>

          <nav className={styles.drawer_nav}>
            <Link
              to="/main"
              className={styles.drawer_link}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={styles.drawer_link}
              onClick={handleLinkClick}
            >
              Favorites
            </Link>
            <Link
              to="/add-pet"
              className={styles.drawer_link}
              onClick={handleLinkClick}
            >
              Add Pet
            </Link>
            <Link
              to="/my-pets"
              className={styles.drawer_link}
              onClick={handleLinkClick}
            >
              My Pets
            </Link>
            <Link
              to="/about-us"
              className={styles.drawer_link}
              onClick={handleLinkClick}
            >
              About Us
            </Link>
            <Link
              to="/account"
              className={styles.drawer_link}
              onClick={handleLinkClick}
            >
              Account
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
