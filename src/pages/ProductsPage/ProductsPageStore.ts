import API_ENDPOINTS from "@/config/apiEndpoints";
import { GlobalStore } from "@/store/globalStore";
import { TProductApi } from "@/types/api/TProductApi";
import { TFilterStore } from "@/types/TFilter";
import { TPagination } from "@/types/TPagination";
import { TProduct } from "@/types/TProduct";
import localStorageStore from "@/utils/localStorageStore";
import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import qs from "qs";

export type TSetFilterField = <K extends keyof TFilterStore>(key: K, value: TFilterStore[K]) => void

class ProductsPageStore {
  globalStore: GlobalStore
  products: TProduct[] = []
  hasMore: boolean = true
  isMobile: boolean = false
  initialized: boolean = false;

  pagination: TPagination = {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    total: 0
  }

  filter: TFilterStore = observable.object({
    title: "",
    priceStart: 0,
    priceEnd: 100,
    rating: 0
  })

  isLoading: boolean = false

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      products: observable,
      pagination: observable,
      isLoading: observable,
      filter: observable,
      hasMore: observable,
      initialized: observable,
      isMobile: observable,
      getCurrentSavePage: action,
      setPagePagination: action,
      setProducts: action,
      setFilterField: action,
      resetFilter: action,
      setIsMobile: action,
      initialize: action,
      resetForScroll: action,
    })

    this.getCurrentSavePage()
  }

  setIsMobile = (value: boolean) => {
    this.isMobile = value
  }

  setFilterField = <K extends keyof TFilterStore>(key: K, value: TFilterStore[K]) => {
    this.filter[key] = value
  }

  resetFilter = () => {
    this.filter = {...this.filter,
      priceStart: 0,
      priceEnd: 0,
      rating: 0
    }
  }

  initialize = async () => {
    if (this.initialized) return;
    this.initialized = true;
  
    await this.setProducts();
  }

  async getProducts (): Promise<TProductApi | false> {
    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    const filters = {
      "title": {
        "$containsi": this.filter.title
      },
      "price": this.filter.priceEnd !== 0 ? {
        "$gte": this.filter.priceStart,
        "$lte": this.filter.priceEnd
      }: {},
      "rating": {
        "$gte": this.filter.rating,
      }
    }

    try {
      const res = await axios.get(`${this.globalStore.endpoint}${API_ENDPOINTS.PRODUCTS}?pagination[pageSize]=9&pagination[page]=${this.pagination.page}&${qs.stringify({filters})}&${queryParams}`, {
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

    this.setProducts()
  }

  async getProductsFilter () {
    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    const filters = this.filter

    const resp = await axios.get(`${this.globalStore.endpoint}/products?${qs.stringify({filters})}&${queryParams}`, {
      headers: {
        "Authorization": `Bearer ${this.globalStore.token}`
      }
    })

    return resp.data.data
  }

  resetForScroll = () => {
    this.products = []
    this.pagination.page = 1
    this.hasMore = true
  }

  setProducts = async () => {
    if (this.isLoading) return

    runInAction(() => {
      this.isLoading = true
    })

    const data = await this.getProducts()

    if (data) {
      runInAction(() => {
        if (this.isMobile) {
          this.products.push(...data.data)

          this.pagination = {...data.meta.pagination,
            page: data.meta.pagination.page + 1
          }

          if (this.products.length >= this.pagination.total) this.hasMore = false
        } else {
          this.products = data.data
          this.pagination = data.meta.pagination
        }
      })
    }

    runInAction(() => {
      this.isLoading = false
    })
  }
}

export default ProductsPageStore