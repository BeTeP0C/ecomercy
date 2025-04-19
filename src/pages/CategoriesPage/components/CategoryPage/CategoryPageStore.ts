import { TCategory } from "@/common/categoriesList"
import { TProduct } from "@/types/TProduct"
import qs from "qs"
import axios from "axios"
import { action, makeObservable, observable, runInAction } from "mobx"
import uppercaseFirstSymbol from "@/utils/uppercaseFirstSymbol"

class CategoryPageStore {
  isLoading: boolean = false
  products: TProduct[] = []
  errorMessage: string = ""
  category: TCategory
  endpoint: string

  constructor (category: TCategory, endpoint: string) {
    this.category = category
    this.endpoint = endpoint

    makeObservable(this, {
      isLoading: observable,
      products: observable,
      errorMessage: observable,
      setIsLoading: action,
      setIsFinish: action,
      setErrorMessage: action,
      getProductWithFilterCategory: action,
      setProduct: action
    })
  }

  setIsLoading () {
    runInAction(() => {
      this.isLoading = true
    })
  }

  setIsFinish () {
    this.isLoading = false
  }

  setErrorMessage (message: string) {
    this.errorMessage = message
  }

  async getProductWithFilterCategory (): Promise<TProduct[] | false> {
    this.setIsLoading()
    const filters = {
      "productCategory": {
        "title": uppercaseFirstSymbol(this.category)
      }
    }

    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })
    
    try {
      const resp = await axios.get(`${this.endpoint}/products?${qs.stringify({filters})}&${queryParams}`, )

      return resp.data.data
    } catch (error: any) {
      const message: string = error.response.data.message

      this.setErrorMessage(message)
      return false
    } finally {
      this.setIsFinish()
    }
  }

  async setProduct () {
    const productsData = await this.getProductWithFilterCategory()

    if (productsData) {
      this.products = productsData
    }
  }
}

export default CategoryPageStore