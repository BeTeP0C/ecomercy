import { useState } from "react"
import styles from "./styles.module.scss"
import SearcherFilterMenu from "../SearcherFilterMenu"

const SearcherFilter = () => {
  const [active, setActive] = useState<boolean>(false)

  const handleButtonClick = () => {
    setActive(prev => !prev)
  }

  return (
    <div className={`${styles.filter} ${active ? styles.filter_active : ""}`}>
      <button onClick={handleButtonClick} className={styles.button}>
        <span className={styles.title}>Filter</span>
        <span className={`${styles.icon} ${active ? styles.icon_active : ""}`}></span>
      </button>

      <div className={`${styles.main} ${active ? styles.main_active : ""}`}>
        <SearcherFilterMenu />
      </div>
    </div>
  )
}

export default SearcherFilter