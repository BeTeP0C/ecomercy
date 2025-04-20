import { makeAutoObservable } from "mobx"
import { TProduct } from "@/types/TProduct"
import { GlobalStore } from "@/store/globalStore"
import styles from "./ProductPage.module.scss"

export type TImage = {
  small: string,
  medium: string,
}

class ProductStore {
  product: TProduct | null = null
  relatedProducts: TProduct[] = []
  images: TImage[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setProduct(product: TProduct) {
    this.product = product
  }

  setRelatedProducts(products: TProduct[]) {
    this.relatedProducts = products
  }

  setImages(images: TImage[]) {
    this.images = images
  }

  async loadProductData(id: string, globalStore: GlobalStore) {
    try {
      const currentProduct: TProduct | undefined = await globalStore.getProduct(id)
      const filter = {
        productCategory: {
          "title": currentProduct?.productCategory.title
        }
      }
      const relatedProducts = await globalStore.getProductsFilter(filter)

      if (currentProduct) {
        this.setProduct(currentProduct)
        this.setRelatedProducts(relatedProducts)
        this.addImages(currentProduct)
      }
    } catch (error) {
      console.error(error)
    }
  }

  addImages(currentProduct: TProduct) {
    const currentImages = currentProduct.images.map(image => {
      return {
        small: image.formats.small.url,
        medium: image.formats.medium.url
      }
    })

    this.setImages(currentImages)
  }
}

export default ProductStore