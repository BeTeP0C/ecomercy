
import Header from "@/components/Header";
import styles from "./styles.module.scss";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.error}>
          404
          <span className={styles.error_second}>404</span>
        </h1>

        <div className={styles.info}>
          <h2 className={styles.heading}>Page not found</h2>
          <p className={styles.descr}>
            The requested page does not exist or has been moved
          </p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
