import { FC, useEffect, useState } from "react"
import styles from "./SearcherFilterRating.module.scss"
import Star from "@/components/Icons/Star"

type SearcherFilterRatingProps = {
  stars: number,
  onClick: (value: number) => void
}

const SearcherFilterRating: FC<SearcherFilterRatingProps> = ({stars, onClick}) => {
  const [sizeStar, setSizeStar] = useState<number>(50)

  const handleButtonClick = (value: number) => {
    if (value === stars) {
      onClick(value-1)
    } else {
      onClick(value)
    }
  }
  
  useEffect(() => {
    if (window.innerWidth < 490) {
      setSizeStar(25)
    }
  }, [])

  return (
    <div className={styles.rating}>
      <h3 className={styles.title}>Rating: </h3>

      <ul className={styles.list}>
        {Array.from({ length: 5 }).map((values, index) => (
          <li key={index} className={styles.item}>
            <button onClick={() => handleButtonClick(index+1)} className={`${styles.button} ${index < stars ? styles.button_active : ""}`}>
              <Star width={sizeStar} height={sizeStar}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearcherFilterRating