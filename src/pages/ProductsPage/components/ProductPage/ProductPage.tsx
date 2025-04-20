import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./ProductPage.module.scss"
import { useStore } from "@/hooks/useStore"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"

import Container from "@/components/UI/Container"
import Button from "@/components/UI/Button"
import ArrowBack from "@/components/Icons/ArrowBack"
import ProductSlider from "./ProductSlider/ProductSlider"
import Loader from "@/components/UI/Loader"
import Product from "../Product/Product"
import { TProductCart } from "@/types/TProductCart"
import ProductStore from "./ProductStore"

const ProductPage = observer(() => {
  const {globalStore, cartStore} = useStore() 
  const {id} = useParams()
  const navigate = useNavigate()

  const store = useLocalObservable(() => new ProductStore(globalStore))

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        store.loadProductData(id)
      }
    }

    loadData()
  }, [id])

  const handleButtonClick = () => {
    if (store.product) {
      if (cartStore.amountProduct(store.product.documentId) === 0) {
        const productCart: TProductCart = cartStore.transformProductToCart(store.product)
  
        cartStore.addProductToCart(productCart)
      } else {
        navigate("/cart")
      }
    }
  }

  const slidesImage = store.images.map(image => {
    return (
      <picture>
        <source 
          srcSet={image.small}
          media="(max-width: 750px)"
        />
        <source 
          srcSet={image.medium}
          media="(max-width: 900px)"
        />
        <img className={styles.img} src={image.medium} alt="" />
      </picture>
    )
  })

  return (
    <main className={styles.main}>
      <Container className={`${styles.product__container} ${globalStore.isLoading ? styles.product__container_loading : ""}`}>
        <button onClick={() => navigate(-1)} type="button" className={styles.back}>
          <ArrowBack />
          Назад
        </button>

        {globalStore.isLoading ? (
          <Loader />
        ) : (
          <div>
            {store.product && (
              <div className={styles.product}>
                <div className={styles.slider}>
                  <ProductSlider type="look" slides={slidesImage}/>
                </div>

                <div className={styles.info}>
                  <h1 className={styles.heading}>{store.product?.title}</h1>
                  <p className={styles.descr}>{store.product?.description}</p>
                  <span className={styles.price}>${store.product?.price}</span>
                  <div className={styles.actions}>
                    <Button className={styles.product__button_now} text="Buy Now" />
                    <Button className={styles.product__button} text={cartStore.amountProduct(store.product.documentId) === 0 ? "Add to cart" : "Go to cart"} func={handleButtonClick} />
                  </div>
                </div>
              </div>
            )}
            <div className={styles.related}>
              <h2 className={styles.title}>Related Items</h2>

              <ProductSlider type="related" slides={store.relatedProducts ? store.relatedProducts.map(relatedProduct => {
                return (
                  <Product 
                    key={relatedProduct.id} 
                    id={relatedProduct.id}
                    idDocument={relatedProduct.documentId}
                    amount={cartStore.amountProduct(relatedProduct.documentId)}
                    images={{
                      large: relatedProduct.images[0].formats.large.url,
                      medium: relatedProduct.images[0].formats.medium.url,
                      small: relatedProduct.images[0].formats.small.url,
                      thumbnail: relatedProduct.images[0].formats.thumbnail.url
                    }}
                    type={relatedProduct.productCategory.title}
                    title={relatedProduct.title}
                    descr={relatedProduct.description}
                    price={relatedProduct.price}
                    discount={relatedProduct.discountPercent}
                    onClick={cartStore.addProductToCart}
                  />
                )
              }): []}/>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
})

export default ProductPage