import { TCategoriesItem } from "@/common/categoriesList"
import styles from "./CategoriesCard.module.scss"
import { FC } from "react"
import uppercaseFirstSymbol from "@/utils/uppercaseFirstSymbol"
import { Link } from "react-router"

type CategoriesCardProps = {
  category: TCategoriesItem
}

const CategoriesCard: FC<CategoriesCardProps> = ({category}) => {
  return (
    <li className={styles.item}>
      <img className={styles.img} src={category.img} alt={`image ${category.category}`} />
      <h2 className={styles.title}>{uppercaseFirstSymbol(category.category)}</h2>
      <Link className={styles.overlay} to={`/categories/${category.category}`}></Link>
    </li>
  )
}

export default CategoriesCard