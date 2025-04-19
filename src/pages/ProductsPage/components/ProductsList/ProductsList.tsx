import { observer } from "mobx-react-lite"
import styles from "./ProductsList.module.scss"
import { useStore } from "@/hooks/useStore"
import Loader from "@/components/Icons/Loader"
import Container from "@/components/UI/Container"
import Product from "../Product/Product"
import ProductSkeleton from "../ProductSkeleton"

const ProductsList = observer(() => {
  const {globalStore, cartStore} = useStore()

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>
          <span>
            Total products
          </span>
          {globalStore.isLoading ? (
            <Loader width={30} height={30}/>
          ) : (
            <span className={styles.pages}>{globalStore.pagination.total}</span>
          )}
        </h2>

        {globalStore.isLoading ? (
          (
            <ul className={`${styles.list} ${styles.list_skeleton}`} style={{marginRight: 30}}>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </ul>
          )
        ) : (
          <div className={styles.main}>
            <ul className={styles.list}>
              {globalStore.products.map(product => {
                const images = product.images[0].formats

                return (
                  <li className={styles.item} key={product.id}>
                    <Product
                      id={product.id}
                      idDocument={product.documentId}
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
    </section>
  )
})

export default ProductsList