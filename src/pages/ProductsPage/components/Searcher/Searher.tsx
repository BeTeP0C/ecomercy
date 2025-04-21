import styles from "./Searcher.module.scss"
import Container from "@/components/UI/Container"
import SearcherInput from "./SearcherInput"
import Button from "@/components/UI/Button"
import SearcherFilter from "./SearcherFilter"
import { useLocation, useSearchParams } from "react-router"
import { TFilterStore } from "@/types/TFilter"
import { FC } from "react"
import { TSetFilterField } from "../../ProductsPageStore"

type SearcherProps = {
  filter: TFilterStore, 
  updateFilterField: TSetFilterField
}

const Searcher: FC<SearcherProps> = ({filter, updateFilterField}) => {
  const [queryParams, setQueryParams] = useSearchParams()
  const query = new URLSearchParams(useLocation().search)

  const handleButtonSubmit = () => {
    const params = new URLSearchParams(queryParams.toString())
    params.set("text", filter.title)
    params.set("priceStart", filter.priceStart.toString())
    params.set("priceEnd", filter.priceEnd.toString())
    params.set("rating", filter.rating.toString())
    params.set("page", query.get("page") ?? "")

    setQueryParams(params)
  }

  return (
    <section className={styles.section}>
      <Container >
        <div className={styles.search}>
          <div className={styles.input}>
            <SearcherInput func={updateFilterField} valueStore={filter.title}/>
          </div>

          <Button className={styles.search__button} text="Find now" func={handleButtonSubmit} />
        </div>

        <SearcherFilter />
        <Button className={styles.button} text="Find now" func={handleButtonSubmit} />
      </Container>
    </section>
  ) 
}

export default Searcher