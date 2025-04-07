import { FC } from "react"
import styles from "./SearcherFilterRating.module.scss"
import Star from "@/components/Icons/Star"

type SearcherFilterRatingProps = {
  stars: number,
  onClick: (value: number) => void
}

const SearcherFilterRating: FC<SearcherFilterRatingProps> = ({stars, onClick}) => {
  const handleButtonClick = (value: number) => {
    if (value === stars) {
      onClick(value-1)
    } else {
      onClick(value)
    }
  }


  return (
    <div className={styles.rating}>
      <h3 className={styles.title}>Rating: </h3>

      <ul className={styles.list}>
        {Array.from({ length: 5 }).map((values, index) => (
          <li key={index} className={styles.item}>
            <button onClick={() => handleButtonClick(index+1)} className={`${styles.button} ${index < stars ? styles.button_active : ""}`}>
              <Star />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearcherFilterRating