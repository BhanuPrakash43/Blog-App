import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuth } from "../contexts/AuthContextProvider";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Nav() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function logout() {
    setAuth({});
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <nav className={styles.nav}>
      <h2>
        <Link to="/" onClick={closeMobileMenu}>
          BlogApp
        </Link>
      </h2>
      {auth?.access_token && (
        <p className={styles.greet}>Welcome {auth.email.split("@")[0]}</p>
      )}
      <div
        className={`${styles.mobileMenuIcon} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
        onClick={toggleMobileMenu}
      >
        <GiHamburgerMenu className={styles.hamburgerMenu} />
      </div>

      <ul
        className={`${styles.navItems} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        {!auth?.access_token ? (
          <div className={styles.loginSignupBtn}>
            <li>
              <Link to="login" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="signup" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </div>
        ) : (
          <div className={styles.impBtn}>
            <div className={styles.blogUtils}>
              <li>
                <Link to="create" onClick={closeMobileMenu}>
                  Write Blog
                </Link>
              </li>
              <li>
                <Link to="my-blogs" onClick={closeMobileMenu}>
                  My Blogs
                </Link>
              </li>
            </div>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
