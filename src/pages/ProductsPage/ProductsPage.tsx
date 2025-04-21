import { observer, useLocalObservable } from "mobx-react-lite"
import Hero from "./components/Hero"
import ProductsList from "./components/ProductsList"
import Searcher from "./components/Searcher"
import { useStore } from "@/hooks/useStore"
import { createContext, useEffect } from "react"
import ProductPagination from "./components/ProductPagination"
import { useLocation } from "react-router"
import ProductsPageStore from "./ProductsPageStore"

export const FilterContext = createContext<ProductsPageStore | null>(null)

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
    store.setFilterField("title", text ?? "")
    store.setFilterField("priceStart", Number(priceStart))
    store.setFilterField("priceEnd", Number(priceEnd))
    store.setFilterField("rating", Number(rating))
    
    store.setPagePagination(currentPage ? Number(currentPage) : 1)
  }, [store])

  return (
    <main>
      <Hero />
      <FilterContext.Provider value={store}>
        <Searcher filter={store.filter} updateFilterField={store.setFilterField} setProductsFilter={store.setProducts}/>
      </FilterContext.Provider>
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