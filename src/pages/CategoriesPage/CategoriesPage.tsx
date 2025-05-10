import Container from "@/components/UI/Container"
import styles from "./CategoriesPage.module.scss"
import { categoriesList } from "@/common/categoriesList"
import CategoriesCard from "./components/CategoriesCard"

const CategoriesPage = () => {
  return (
    <main className={styles.main}>
      <Container>
        <h1 className={styles.heading}>Categories</h1>

        <div className={styles.content}>
          <ul className={styles.list}>
            {categoriesList.map(category => <CategoriesCard key={category.id} category={category}/>)}
          </ul>
        </div>
      </Container>
    </main>
  )
}

export default CategoriesPage