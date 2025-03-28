import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ProfilePage.module.css";
const API_URL = import.meta.env.VITE_API_URL;

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/profile`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, []);

  const logOutUser = async () => {
    try {
      await axios.delete(`${API_URL}/users/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      {user ? (
        <>
          <p className={styles["profile-info"]}>
            <span>Name:</span> {user.username}
          </p>
          <p className={styles["profile-info"]}>
            <span>Email:</span> {user.email}
          </p>
          <button onClick={logOutUser} className={styles["logout-button"]}>
            Log Out
          </button>
        </>
      ) : (
        <p className={styles["profile-info"]}>You are logged out.</p>
      )}
    </div>
  );
}

export default ProfilePage;
