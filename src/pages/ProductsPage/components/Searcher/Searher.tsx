import { observer } from "mobx-react-lite"
import styles from "./Searcher.module.scss"
import Container from "@/components/UI/Container"
import SearcherInput from "./SearcherInput"
import { useStore } from "@/hooks/useStore"
import Button from "@/components/UI/Button"
import SearcherFilter from "./SearcherFilter"
import { useLocation, useNavigate } from "react-router"

const Searcher = observer(() => {
  const {globalStore} = useStore()
  const query = new URLSearchParams(useLocation().search)
  const navigate = useNavigate()

  const handleButtonSubmit = () => {
    console.log("fsdfsd")
    const params = new URLSearchParams()
    params.set("text", globalStore.filter.title)
    params.set("priceStart", globalStore.filter.priceStart.toString())
    params.set("priceEnd", globalStore.filter.priceEnd.toString())
    params.set("rating", globalStore.filter.rating.toString())
    params.set("page", query.get("page") ?? "")

    navigate(`/products?${params.toString()}`)
  }

  return (
    <section className={styles.section}>
      <Container >
        <div className={styles.search}>
          <div className={styles.input}>
            <SearcherInput func={globalStore.setFilterTitle} valueStore={globalStore.filter.title}/>
          </div>

          <Button className={styles.search__button} text="Find now" func={handleButtonSubmit} />
        </div>

        <SearcherFilter />
        <Button className={styles.button} text="Find now" func={handleButtonSubmit} />
      </Container>
    </section>
  ) 
})

export default Searcher