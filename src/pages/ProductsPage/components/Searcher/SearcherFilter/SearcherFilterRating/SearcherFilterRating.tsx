import { FC, useEffect, useState } from "react"
import styles from "./SearcherFilterRating.module.scss"
import Star from "@/components/Icons/Star"
import { TSetFilterField } from "@/pages/ProductsPage/ProductsPageStore"

type SearcherFilterRatingProps = {
  stars: number,
  updateFilterField: TSetFilterField | null
}

const SearcherFilterRating: FC<SearcherFilterRatingProps> = ({stars, updateFilterField}) => {
  const [sizeStar, setSizeStar] = useState<number>(30)

  const handleButtonClick = (value: number) => {
    if (updateFilterField) {
      if (value === stars) {
        updateFilterField("rating", value-1)
      } else {
        updateFilterField("rating", value)
      }
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
        {Array.from({ length: 5 }).map((_values, index) => (
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