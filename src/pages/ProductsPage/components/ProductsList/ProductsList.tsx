import { observer } from "mobx-react-lite"
import styles from "./ProductsList.module.scss"
import { useStore } from "@/hooks/useStore"
import Loader from "@/components/Icons/Loader"
import Container from "@/components/UI/Container"
import Product from "../Product/Product"
import ProductSkeleton from "../ProductSkeleton"
import { TPagination } from "@/types/TPagination"
import { TProduct } from "@/types/TProduct"
import { FC } from "react"

type ProductsListProps = {
  pagination: TPagination,
  products: TProduct[],
  isLoading: boolean
}

const ProductsList: FC<ProductsListProps> = observer(({pagination, products, isLoading}) => {
  const {cartStore} = useStore()

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>
          <span>
            Total products
          </span>
          {isLoading ? (
            <Loader width={30} height={30}/>
          ) : (
            <span className={styles.pages}>{pagination.total}</span>
          )}
        </h2>

        {isLoading ? (
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
              {products.map(product => {
                const images = product.images[0].formats
                const amountProduct = cartStore.amountProduct(product.documentId)

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
                      amount={amountProduct}
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