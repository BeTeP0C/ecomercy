import { observer } from "mobx-react-lite"
import Hero from "./components/Hero"
import ProductsList from "./components/ProductsList"
import Searcher from "./components/Searcher"
import { useStore } from "@/hooks/useStore"
import { useEffect } from "react"
import ProductPagination from "./components/ProductPagination"
import { useLocation } from "react-router"

const ProductsPage = observer(() => {
  const {globalStore} = useStore ()
  const query = new URLSearchParams(useLocation().search)
  const text = query.get("text")
  const priceStart = query.get("priceStart")
  const priceEnd = query.get("priceEnd")
  const rating = query.get("rating")
  const currentPage = query.get("page")

  useEffect(() => {
    globalStore.setFilterTitle(text ?? "")
    globalStore.setFilterPriceStart(Number(priceStart) ?? 0)
    globalStore.setFilterPriceEnd(Number(priceEnd) ?? 0)
    globalStore.setFilterRating(Number(rating) ?? 0)
    globalStore.setFilterRating(Number(rating) ?? 0)
    globalStore.setPagePagination(Number(currentPage) ?? 1)

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