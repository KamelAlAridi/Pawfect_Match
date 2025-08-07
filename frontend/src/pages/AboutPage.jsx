import React from "react";
import CustomButton from "../components/CustomButton";
import styles from "../CSSmodules/AboutPage.module.css";

export default function AboutPage({ isAuthenticated }) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>Welcome to Pawfect Match</h1>
        <h2>About Us</h2>
        <p>
          We're a passionate community dedicated to helping pets find their
          forever families. Every pet deserves a second chance, and we're here
          to make that happen one adoption at a time.
        </p>
        <p>
          Whether you're looking for a playful pup, a curious kitten, or a
          gentle older companion, our mission is to connect you with a pet that
          fits your life and heart.
        </p>
        <p>
          We work closely with shelters and foster homes to make the adoption
          process easy, safe, and full of joy. No endless paperwork. No
          confusion. Just pets in need, ready for love.
        </p>

        <h2>Our Vision</h2>
        <p>
          At Pawfect Match, we're building something special from the ground up.
          As we launch our platform, we're driven by the simple belief that
          technology can make pet adoption easier, more transparent, and more
          successful for everyone involved. We're creating a space where
          potential pet parents can browse, learn, and connect with their future
          companions in a stress-free environment.
        </p>

        <p>
          We're starting by partnering with local shelters and rescue
          organizations to bring their amazing animals online. Our team is
          passionate about creating detailed profiles for each pet, complete
          with photos, personality descriptions, and care requirements, so you
          can find a companion that truly fits your lifestyle.
        </p>

        <h2>Why We're Different</h2>
        <p>
          While we're just getting started, we're committed to doing things
          differently. No overwhelming websites with outdated information. No
          endless phone calls trying to get basic details about a pet. We're
          building a platform that puts all the information you need right at
          your fingertips, with direct communication tools to connect you with
          shelters and foster families.
        </p>

        <p>
          Our goal is to make the adoption process as smooth as possible while
          ensuring every match is a good one. We're working on features like
          compatibility matching, virtual meet-and-greets, and comprehensive
          adoption guides to support you every step of the way.
        </p>

        <h2>Join Our Journey</h2>
        <p>
          We're just beginning this adventure, and we'd love to have you be part
          of our story. Whether you're looking to adopt, volunteer, or simply
          support the cause, there's a place for you in the Pawfect Match
          community. Every adoption we facilitate will help us grow and improve,
          making the process even better for future families and pets.
        </p>

        <p>
          As we grow, we're committed to building partnerships with more
          shelters, adding new features based on user feedback, and continuously
          improving the adoption experience. Your support and participation will
          help us create something truly meaningful for pets and families
          everywhere.
        </p>

        <h2>Contact Us</h2>
        <h3>Email:</h3>
        <div className={styles.middleParag}>
          <p>kamelalaridi@gmail.com</p>
        </div>
        <h3>Phone:</h3>
        <div className={styles.middleParag}>
          <p>+961 76 153 898</p>
        </div>

        <h1>Join us in making a difference. Adopt. Don't shop.</h1>
        {isAuthenticated ? (
          <>
            <div className={styles.buttonGroup}>
              <CustomButton text="Pawfect Match" path="/main" />
            </div>
          </>
        ) : (
          <>
            <h3>Sign In / Sign Up to start </h3>
            <h3>or continue as a guest</h3>
            <div className={styles.buttonGroup}>
              <CustomButton text="Sign In" path="/signin" />
              <CustomButton text="Guest" path="/main" />
              <CustomButton text="Sign Up" path="/signup" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
