import styles from "../styles/GalleryPage.module.css";

function GalleryPage() {
  return (
    <>
      <h1>Gallery</h1>
      <div className={styles.gallery}>
        <img className={styles.galleryImg} src="https://placehold.co/200" alt="Gallery Item" />
        <img className={styles.galleryImg} src="https://placehold.co/200" alt="Gallery Item" />
        <img className={styles.galleryImg} src="https://placehold.co/200" alt="Gallery Item" />
        <img className={styles.galleryImg} src="https://placehold.co/200" alt="Gallery Item" />
      </div>
    </>
  );
}

export default GalleryPage;
