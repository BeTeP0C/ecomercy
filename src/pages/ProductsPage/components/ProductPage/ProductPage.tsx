import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./ProductPage.module.scss"
import { useStore } from "@/hooks/useStore"
import { useNavigate, useParams } from "react-router"
import { useCallback, useEffect } from "react"

import Container from "@/components/UI/Container"
import Button from "@/components/UI/Button"
import ProductSlider from "./ProductSlider/ProductSlider"
import Loader from "@/components/UI/Loader"
import Product from "../Product/Product"
import { TProductCart } from "@/types/TProductCart"
import ProductStore from "./ProductStore"
import LOCAL_ENDPOINT from "@/config/localEndpoint"
import ButtonBack from "@/components/UI/ButtonBack"

const ProductPage = observer(() => {
  const {globalStore, cartStore, modalStore} = useStore() 
  const {id} = useParams()
  const navigate = useNavigate()

  const store = useLocalObservable(() => new ProductStore(globalStore))

  const handleButtonClick = useCallback(() => {
    if (store.product) {
      if (cartStore.amountProduct(store.product.documentId) === 0) {
        const productCart: TProductCart = cartStore.transformProductToCart(store.product)
  
        cartStore.addProductToCart(productCart)
      } else {
        navigate(LOCAL_ENDPOINT.CART)
      }
    }
  }, [store.product])

  const handlePayment = () => {
    if (store.product) {
      store.addOrderLocal(store.product)
    }

    modalStore.modalClose()
    setTimeout(modalStore.modalReset, 300)
  }

  const handleCancel = () => {
    modalStore.modalClose()
  }

  const handleBuy = () => {
    if (store.product) {
      modalStore.modalOpen("payment", {
        price: store.product.price * ( (100 - store.product.discountPercent) / 100),
        amountProducts: 1,
        fullPrice: store.product.price,
        discount: store.product.price * ( store.product.discountPercent / 100), 
        onPayment: handlePayment, 
        onClose: handleCancel
      })
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

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const result = await store.loadProductData(id)

        if (result === false) navigate("/error")
      }
    }

    loadData()
  }, [store, id])

  return (
    <main className={styles.main}>
      <Container className={`${styles.product__container} ${store.isLoading ? styles.product__container_loading : ""}`}>
        <ButtonBack />

        {store.isLoading ? (
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
                    <Button className={styles.product__button_now} text="Buy Now" func={handleBuy}/>
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