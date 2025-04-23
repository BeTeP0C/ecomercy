import { observer } from "mobx-react-lite"
import styles from "./ProductsList.module.scss"
import { useStore } from "@/hooks/useStore"
import Loader from "@/components/Icons/Loader"
import Container from "@/components/UI/Container"
import { Virtuoso } from "react-virtuoso"
import Product from "../Product/Product"
import ProductSkeleton from "../ProductSkeleton"
import { TPagination } from "@/types/TPagination"
import { TProduct } from "@/types/TProduct"
import { FC } from "react"

type ProductsListProps = {
  pagination: TPagination,
  products: TProduct[],
  isLoading: boolean,
  isMobile: boolean,
  hasMore: boolean,
  setProducts: () => Promise<void>
}

const ProductsList: FC<ProductsListProps> = observer(({pagination, products, isLoading, hasMore, setProducts, isMobile}) => {
  const {cartStore} = useStore()

  const getItem = (product: TProduct) => {
    const ObservedProduct = observer(() => {
      const images = product.images[0].formats
      const amountProduct = cartStore.amountProduct(product.documentId)
  
      return (
        <div className={`${styles.item}`} key={product.documentId}>
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
        </div>
      )
    })
  
    return <ObservedProduct />
  }
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

        {!isLoading && products.length === 0 ? (
          <h3 className={styles.empty}>Nothing was found...</h3>
        ) : (
          <>
            {isLoading && !isMobile ? (
              <ul className={`${styles.list} ${styles.list_skeleton}`} style={{marginRight: 30}}>
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
              </ul>
            ) : (
              <div className={styles.main}>
                {isMobile ? (
                  <>
                    {isLoading && products.length === 0 ? (
                      <ProductSkeleton />
                    ) : (
                      <Virtuoso 
                        style={{ height: 3000 }}
                        data={products}
                        itemContent={(index, product) => getItem(product)}
                        components={{
                          List: (props) => <div {...props} className={styles.list} />,
                        }}
                        endReached={() => {
                          if (hasMore && !isLoading) {
                            setProducts()
                          }
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div className={styles.list}>
                    {products.map(product => getItem(product))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  )
})

export default ProductsList