import { observer } from "mobx-react-lite"
import styles from "./ProductsList.module.scss"
import { useStore } from "../../../../../hooks/useStore"
import Loader from "../../../../components/Icons/Loader"
import Container from "../../../../components/UI/Container"
import Product from "../Product/Product"
import ProductSkeleton from "../ProductSkeleton"

const ProductsList = observer(() => {
  const {globalStore} = useStore()

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
                return (
                  <li className={styles.item} key={product.id}>
                    <Product
                      id={product.documentId}
                      image={product.images[0].url}
                      type={product.productCategory.title}
                      title={product.title}
                      descr={product.description}
                      price={product.price}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* {globalStore.isLoading ? "" : (
          
        )} */}
      </Container>
    </section>
  )
})

export default ProductsList