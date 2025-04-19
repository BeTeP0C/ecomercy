import { makeAutoObservable } from "mobx"
import { TProduct } from "@/types/TProduct"
import { GlobalStore } from "@/store/globalStore"
import styles from "./ProductPage.module.scss"

class ProductStore {
  product: TProduct | null = null
  relatedProducts: TProduct[] = []
  images: React.JSX.Element[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setProduct(product: TProduct) {
    this.product = product
  }

  setRelatedProducts(products: TProduct[]) {
    this.relatedProducts = products
  }

  setImages(images: React.JSX.Element[]) {
    this.images = images
  }

  async loadProductData(id: string, globalStore: GlobalStore) {
    try {
      const currentProduct = await globalStore.getProduct(id)
      const filter = {
        productCategory: {
          "title": currentProduct?.productCategory.title
        }
      }
      const relatedProducts = await globalStore.getProductsFilter(filter)
      this.setProduct(currentProduct as TProduct)
      this.setRelatedProducts(relatedProducts)
      this.addImages(currentProduct as TProduct)
    } catch (error) {
      console.error(error)
    }
  }

  addImages(currentProduct: TProduct) {
    const imageElements = currentProduct.images.map((image, index) => (
      <picture>
        <source 
          srcSet={image.formats.small.url}
          media="(max-width: 750px)"
        />
        <source 
          srcSet={image.formats.medium.url}
          media="(max-width: 900px)"
        />
        <img className={styles.img} src={image.formats.medium.url} alt="" />
      </picture>
    ))
    this.setImages(imageElements)
  }
}

export default ProductStore