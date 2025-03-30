import { observer } from "mobx-react-lite"
import Hero from "./components/Hero"
import ProductsList from "./components/ProductsList"
import Searcher from "./components/Searcher"
import { useStore } from "../../../hooks/useStore"
import { useEffect } from "react"
import ProductPagination from "./components/ProductPagination"

const ProductsPage = observer(() => {
  const {globalStore} = useStore ()

  useEffect(() => {
    globalStore.getProducts()

  }, [])

  return (
    <main>
      <Hero />
      <Searcher />
      <ProductsList />
      <ProductPagination currentPage={globalStore.pagination.page} totalPages={globalStore.pagination.pageCount} func={globalStore.setPagePagination}/>
    </main>
  )
})

export default ProductsPage