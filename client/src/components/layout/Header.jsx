import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faList,
  faCircleInfo,
  faImage,
  faCartShopping,
  faUser,
  faEnvelope,
  faHistory,
  faRightToBracket,
  faRegistered,
  faUserPlus,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Header.module.css";
function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src="https://placehold.co/250x100" alt="Delish Monde Logo" />

        <div>
          <h1>Delish Monde</h1>

          {/* Login & Register Links */}
          <div className={styles.loginSignup}>
            <a href="/login">
              <FontAwesomeIcon icon={faSignIn} className={styles.iconSpacing} />
              Login
            </a>
            <span>|</span>
            <a href="/register">
              <FontAwesomeIcon
                icon={faUserPlus}
                className={styles.iconSpacing}
              />
              Register
            </a>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className={styles.navbar}>
              <li>
                <a href="/">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={styles.iconSpacing}
                  />
                  Home
                </a>
              </li>
              <li>
                <a href="/menu">
                  <FontAwesomeIcon
                    icon={faList}
                    className={styles.iconSpacing}
                  />
                  Menu
                </a>
              </li>
              <li>
                <a href="/about">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className={styles.iconSpacing}
                  />
                  About Us
                </a>
              </li>
              <li>
                <a href="/gallery">
                  <FontAwesomeIcon
                    icon={faImage}
                    className={styles.iconSpacing}
                  />
                  Gallery
                </a>
              </li>
              <li>
                <a href="/contact">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles.iconSpacing}
                  />
                  Contact
                </a>
              </li>
              <li>
                <a href="/cart">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className={styles.iconSpacing}
                  />
                  Cart
                </a>
              </li>
              <li>
                <a href="/order-history">
                  <FontAwesomeIcon
                    icon={faHistory}
                    className={styles.iconSpacing}
                  />
                  Order History
                </a>
              </li>
              <li>
                <a href="/profile">
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.iconSpacing}
                  />
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
