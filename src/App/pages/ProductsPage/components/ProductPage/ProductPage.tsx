import { observer } from "mobx-react-lite"
import styles from "./ProductPage.module.scss"
import { useStore } from "../../../../../hooks/useStore"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { TProduct } from "../../../../../types/TProduct"
import Container from "../../../../components/UI/Container"
import Button from "../../../../components/UI/Button"
import ArrowBack from "../../../../components/Icons/ArrowBack"
import ProductSlider from "./ProductSlider/ProductSlider"
import Loader from "../../../../components/UI/Loader"
import Product from "../Product/Product"
import { img } from "../Product/styles.module.scss"

const ProductPage = observer(() => {
  const [product, setProduct] = useState<TProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<TProduct[] | null>(null)
  const [images, setImages] = useState<React.JSX.Element[]>([])
  const {globalStore} = useStore() 
  const {id} = useParams()
  const navigate = useNavigate()
  // const images: string[] = []

  const addedImages = (currentProduct: TProduct) => {
    currentProduct.images.map((image, index) => {
      const el = (
        <img className={styles.img} src={image.formats.medium.url} alt={`Slide ${index + 1}`}/>
      )
      setImages(prev => [...prev, el])
    })
  }

  useEffect (() => {
    const getProduct = async () => {
      if (id) {
        try {
          const currentProduct = await globalStore.getProduct(id)
          const filter = {
            productCategory: {
              "title": currentProduct?.productCategory.title 
            }
          }
          const currentRelatedProducts = await globalStore.getProductsFilter(filter)
          setProduct(currentProduct as TProduct)
          setRelatedProducts(currentRelatedProducts)
          addedImages(currentProduct as TProduct)
        } catch (error) {
          console.log(error)
        }
        
      }
    }

    setImages([])
    getProduct()
  }, [id])

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
            <div className={styles.product}>
              <ProductSlider type="look" slides={images}/>
              <div className={styles.info}>
                <h1 className={styles.heading}>{product?.title}</h1>
                <p className={styles.descr}>{product?.description}</p>
                <span className={styles.price}>${product?.price}</span>
                <div className={styles.actions}>
                  <Button className={styles.product__button_now} text="Buy Now" func={() => {}}/>
                  <Button className={styles.product__button} text="Add to Cart" func={() => {}}/>
                  {/* <button className={styles.product__button}>Add to Cart</button> */}
                </div>
              </div>
            </div>
            <div className={styles.related}>
              <h2 className={styles.title}>Related Items</h2>

              <ProductSlider type="related" slides={relatedProducts ? relatedProducts.map(relatedProduct => (
                  <Product 
                    key={relatedProduct.id} 
                    id={relatedProduct.documentId}
                    image={relatedProduct.images[0].url}
                    type={relatedProduct.productCategory.title}
                    title={relatedProduct.title}
                    descr={relatedProduct.description}
                    price={relatedProduct.price}
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