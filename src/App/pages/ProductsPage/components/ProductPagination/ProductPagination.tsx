import { FC } from "react"
import styles from "./ProductPagination.module.scss"
import ArrowBack from "../../../../components/Icons/ArrowBack";

type ProductPaginationProps = {
  currentPage: number,
  totalPages: number,
  func: (page: number) => void
}

const ProductPagination: FC<ProductPaginationProps> = ({currentPage, totalPages, func}) => {
  const handleNextPage = () => {
    func(currentPage+1)
  }

  const handleBackPage = () => {
    func(currentPage-1)
  }

  const renderPagination = () => {
    let pages: (number | string)[] = [];

    if (currentPage > 2) {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <li key={index} className={styles.item}>
          <button
            onClick={() => func(page)}
            className={`${styles.button} ${page === currentPage ? styles.button_active : ""}`}
          >
            {page}
          </button>
        </li>
      ) : (
        <li key={index} className={styles.item}>
          <span>...</span>
        </li>
      )
    );
  };

  return (
    <div className={styles.main}>
      <button onClick={handleBackPage} disabled={currentPage === 1} className={`${styles.button_pag} ${styles.button_back}`}>
        <ArrowBack />
      </button>
      <ul className={styles.list}>
        {renderPagination()}
      </ul>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`${styles.button_pag} ${styles.button_next}`}>
        <ArrowBack />
      </button>
    </div>
  )
}

export default ProductPagination