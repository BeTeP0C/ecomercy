import { observer, useLocalObservable } from "mobx-react-lite"
import Hero from "./components/Hero"
import ProductsList from "./components/ProductsList"
import Searcher from "./components/Searcher"
import { useStore } from "@/hooks/useStore"
import { useEffect } from "react"
import ProductPagination from "./components/ProductPagination"
import { useLocation } from "react-router"
import ProductsPageStore from "./ProductsPageStore"

const ProductsPage = observer(() => {
  const {globalStore} = useStore ()
  const store = useLocalObservable(() => new ProductsPageStore(globalStore))
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
    store.setPagePagination(Number(currentPage) ?? 1)
  }, [])

  return (
    <main>
      <Hero />
      <Searcher />
      <ProductsList 
        pagination={store.pagination}
        products={store.products}
        isLoading={store.isLoading}
      />
      <ProductPagination currentPage={store.pagination.page} totalPages={store.pagination.pageCount} func={store.setPagePagination}/>
    </main>
  )
})

export default ProductsPage