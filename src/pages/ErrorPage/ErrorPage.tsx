
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
          <h2 className={styles.heading}>Страница не найдена</h2>
          <p className={styles.descr}>
            Запрашиваемая страница не существует или была перемещена
          </p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
