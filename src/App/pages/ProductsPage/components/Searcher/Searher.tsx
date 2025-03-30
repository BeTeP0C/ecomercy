import { observer } from "mobx-react-lite"
import styles from "./Searcher.module.scss"
import Container from "../../../../components/UI/Container"
import SearcherInput from "./SearcherInput"
import { useStore } from "../../../../../hooks/useStore"
import Button from "../../../../components/UI/Button"
import SearcherFilter from "./SearcherFilter"

const Searcher = observer(() => {
  const {globalStore} = useStore()

  return (
    <section className={styles.section}>
      <Container >
        <div className={styles.search}>
          <div className={styles.input}>
            <SearcherInput func={globalStore.setFilterTitle} valueStore={globalStore.filter.title}/>
          </div>

          <Button text="Find now" func={globalStore.getProducts} />
        </div>

        <SearcherFilter />
      </Container>
    </section>
  ) 
})

export default Searcher