import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./CategoryPage.module.scss"
import CategoryPageStore from "./CategoryPageStore"
import { useStore } from "@/hooks/useStore"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import {isTCategory } from "@/common/categoriesList"
import ProductSkeleton from "@/pages/ProductsPage/components/ProductSkeleton"
import Product from "@/pages/ProductsPage/components/Product"
import Container from "@/components/UI/Container"
import { toJS } from "mobx"
import uppercaseFirstSymbol from "@/utils/uppercaseFirstSymbol"
import ArrowBack from "@/components/Icons/ArrowBack"

const CategoryPage = observer(() => {
  const {category} = useParams()
  const navigate = useNavigate()
  const {globalStore, cartStore} = useStore() 
  const validCategory = typeof category === "string" && isTCategory(category) ? category : null;

  const store = validCategory
  ? useLocalObservable(() => new CategoryPageStore(validCategory, globalStore.endpoint))
  : null;

  useEffect(() => {
    if (store) {
      store.setProduct();
    }
  }, [store]);

  if (!validCategory) {
    return <div>Категория не найдена</div>;
  }

  return (
    <main className={styles.main}>
      <Container>
        <button onClick={() => navigate(-1)} type="button" className={styles.back}>
          <ArrowBack />
          Назад
        </button>
        <h1 className={styles.heading}>{uppercaseFirstSymbol(category ?? "")}</h1>

        {store && store.isLoading ? (
          (
            <ul className={`${styles.list} ${styles.list_skeleton}`} style={{marginRight: 30}}>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </ul>
          )
        ) : (
          <div className={styles.content}>
            <ul className={styles.list}>
              {store && store.products.map(product => {
                console.log(toJS(product))
                const images = product.images[0].formats

                return (
                  <li className={styles.item} key={product.id}>
                    <Product
                      id={product.documentId}
                      images={{
                        large: images.large.url,
                        medium: images.medium.url,
                        small: images.small.url,
                        thumbnail: images.thumbnail.url
                      }}
                      type={product.productCategory.title}
                      title={product.title}
                      descr={product.description}
                      price={product.price}
                      discount={product.discountPercent}
                      onClick={cartStore.addProductToCart}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </Container>
    </main>
  )
}  )

export default CategoryPage