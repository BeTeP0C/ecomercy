import { observer } from "mobx-react-lite"
import styles from "./SearcherFilterMenu.module.scss"
import { useStore } from "@/hooks/useStore"
import SearcherFilterPrice from "../SearcherFilter/SearcherFilterPrice"
import SearcherFilterRating from "../SearcherFilter/SearcherFilterRating/SearcherFilterRating"

const SearcherFilterMenu = observer(() => {
  const {globalStore} = useStore()

  return (
    <div className={styles.menu}>
      <SearcherFilterPrice funcStart={globalStore.setFilterPriceStart} funcEnd={globalStore.setFilterPriceEnd} min={globalStore.filter.priceStart} max={globalStore.filter.priceEnd}/>
      <SearcherFilterRating stars={globalStore.filter.rating} onClick={globalStore.setFilterRating}/>
    </div>
  )
})

export default SearcherFilterMenu