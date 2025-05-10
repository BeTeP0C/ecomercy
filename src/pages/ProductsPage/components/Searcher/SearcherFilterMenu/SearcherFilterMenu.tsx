import { observer } from "mobx-react-lite"
import styles from "./SearcherFilterMenu.module.scss"
import SearcherFilterPrice from "../SearcherFilter/SearcherFilterPrice"
import SearcherFilterRating from "../SearcherFilter/SearcherFilterRating/SearcherFilterRating"
import { useContext } from "react"
import { FilterContext } from "@/pages/ProductsPage/ProductsPage"
import Button from "@/components/UI/Button"

const SearcherFilterMenu = observer(() => {
  const store = useContext(FilterContext)

  if (store) {
    return (
      <div className={styles.menu}>
        <SearcherFilterPrice updateFilterField={store.setFilterField} min={store.filter.priceStart} max={store.filter.priceEnd}/>
        <SearcherFilterRating stars={store.filter.rating} updateFilterField={store.setFilterField}/>
        <Button className={styles.button} text="Reset" type="transparent" func={store.resetFilter} />
      </div>
    )
  }

  return null
})

export default SearcherFilterMenu