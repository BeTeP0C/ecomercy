import { GlobalStore } from "@/store/globalStore";
import { TProductApi } from "@/types/api/TProductApi";
import { TPagination } from "@/types/TPagination";
import { TProduct } from "@/types/TProduct";
import localStorageStore from "@/utils/localStorageStore";
import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import qs from "qs";

class ProductsPageStore {
  globalStore: GlobalStore
  products: TProduct[] = []
  pagination: TPagination = {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    total: 0
  }
  isLoading: boolean = false

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      products: observable,
      pagination: observable,
      isLoading: observable,
      getCurrentSavePage: action,
      setPagePagination: action,
      setProducts: action,
    })

    this.getProducts()
  }

  async getProducts (): Promise<TProductApi | false> {
    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    const filters = {
      "title": {
        "$containsi": this.globalStore.filter.title
      },
      "price": this.globalStore.filter.priceEnd !== 0 ? {
        "$gte": this.globalStore.filter.priceStart,
        "$lte": this.globalStore.filter.priceEnd
      }: {},
      "rating": {
        "$gte": this.globalStore.filter.rating,
        // "$lte": 
      }
    }

    try {
      const res = await axios.get(`${this.globalStore.endpoint}/products?pagination[pageSize]=9&pagination[page]=${this.pagination.page}&${qs.stringify({filters})}&${queryParams}`, {
        headers: {
          "Authorization": `Bearer ${this.globalStore.token}`
        }
      })

      const data: TProductApi = res.data
  
      return data
    } catch (error: any) {
      console.log(error)
      return false
    }
  }

  getCurrentSavePage = () => {
    const checkPage = localStorageStore.safeLocalStorageGet("currentPage")
    const localPage = checkPage ? JSON.parse(checkPage) : null
    if (localPage) {
      this.pagination.page = localPage
    }
  }

  setPagePagination = (page: number) => {
    runInAction(() => {})
      this.pagination = {...this.pagination,
        page: page
    }

    this.getProducts()
  }

  async setProducts () {
    runInAction(() => {
      this.isLoading = true
    })
    const data = await this.getProducts()

    if (data) {
      runInAction(() => {
        this.products = data.data
        this.pagination = data.meta.pagination
      })
    }
  }
}

export default ProductsPageStore