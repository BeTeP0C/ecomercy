import { observer } from "mobx-react-lite"
import styles from "./ProductPage.module.scss"
import { useStore } from "@/hooks/useStore"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"

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

  const [productStore] = useState(() => new ProductStore())

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        productStore.loadProductData(id, globalStore)
      }
    }

    loadData()
  }, [id])

  const handleButtonClick = () => {
    if (productStore.product) {
      if (cartStore.amountProduct(productStore.product.documentId) === 0) {
        const productCart: TProductCart = {
          idDocument: productStore.product.documentId,
          id: productStore.product.id,
          title: productStore.product.title,
          price: productStore.product.price,
          type: productStore.product.productCategory.title,
          amount: 1,
          discount: productStore.product.discountPercent,
          images: {
            large: productStore.product.images[0].formats.large.url,
            medium: productStore.product.images[0].formats.medium.url,
            small: productStore.product.images[0].formats.small.url,
            thumbnail: productStore.product.images[0].formats.thumbnail.url
          }
        }
  
        cartStore.addProductToCart(productCart)
      } else {
        navigate("/cart")
      }
    }
  }

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
            {productStore.product && (
              <div className={styles.product}>
                <div className={styles.slider}>
                  <ProductSlider type="look" slides={productStore.images}/>
                </div>

                <div className={styles.info}>
                  <h1 className={styles.heading}>{productStore.product?.title}</h1>
                  <p className={styles.descr}>{productStore.product?.description}</p>
                  <span className={styles.price}>${productStore.product?.price}</span>
                  <div className={styles.actions}>
                    <Button className={styles.product__button_now} text="Buy Now" />
                    <Button className={styles.product__button} text={cartStore.amountProduct(productStore.product.documentId) === 0 ? "Add to cart" : "Go to cart"} func={handleButtonClick} />
                  </div>
                </div>
              </div>
            )}
            <div className={styles.related}>
              <h2 className={styles.title}>Related Items</h2>

              <ProductSlider type="related" slides={productStore.relatedProducts ? productStore.relatedProducts.map(relatedProduct => (
                <Product 
                  key={relatedProduct.id} 
                  id={relatedProduct.id}
                  idDocument={relatedProduct.documentId}
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
              )): []}/>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
})

export default ProductPage