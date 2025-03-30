import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { headerItems, THeaderItem } from "../common/headerItems";
import { TFilterStore } from "../types/TFilter";
import axios from "axios";
import qs from "qs"
import { TProduct } from "../types/TProduct";
import { TPagination } from "../types/TPagination";

// type TLoading = ("loading" | "succefuly" | "failed")

const safeLocalStorageSet = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key,value)
  }
}

const safeLocalStorageGet = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key)
  }
}

export class GlobalStore {
  rootStore: RootStore;
  endpoint: string = "https://front-school-strapi.ktsdev.ru/api";
  token: string = "f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef"
  navEl: THeaderItem[] = headerItems;
  isLoading: boolean = false

  products: TProduct[] = []
  pagination: TPagination = {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    total: 0
  } 

  filter: TFilterStore = {
    title: "",
    priceStart: 0,
    priceEnd: 0,
    rating: 0
  }

  constructor (rootStore: RootStore) {
    makeAutoObservable(this)

    this.rootStore = rootStore
    this.getCurrentSavePage()
    this.getProducts()
  }

  getCurrentSavePage = () => {
    const checkPage = safeLocalStorageGet("currentPage")
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
    safeLocalStorageSet("currentPage", JSON.stringify(page))
    this.getProducts()
  }

  setNavEl = (id: number) => {
    this.navEl = this.navEl.map(el => {
      if (el.id === id) {
        return {...el,
          active: true
        }
      }

      return {...el,
        active: false
      }
    })
  }

  setFilterTitle = (value: string) => {
    this.filter = {...this.filter,
      title: value
    }
  }

  setFilterPriceStart = (value: number) => {
    this.filter = {...this.filter,
      priceStart: value
    }
  }

  setFilterPriceEnd = (value: number) => {
    this.filter = {...this.filter,
      priceEnd: value
    }
  }

  setFilterRating = (value: number) => {
    this.filter = {...this.filter,
      rating: value
    }
  }

  // setFilterPrice = () => {
  //   this.filter = {...this.filter,
  //     price: this.filter.price === "up" ? "down" : "up"
  //   }
  // }

  getProducts = () => {
    this.isLoading = true

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
        // "$lte": 
      }
      
    }

    const res = axios.get(`${this.endpoint}/products?pagination[pageSize]=9&pagination[page]=${this.pagination.page}&${qs.stringify({filters})}&${queryParams}`, {
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    })

    res.then(resp => {
      runInAction(() => {
        this.products = resp.data.data
        this.pagination = resp.data.meta.pagination
        this.isLoading = false
      })
    })
  }

  getProductsFilter = async (filters: {}) => {
    this.isLoading = true

    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    const resp = await axios.get(`${this.endpoint}/products?${qs.stringify({filters})}&${queryParams}`, {
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    })

    runInAction(() => {
      this.isLoading = false
    })

    return resp.data.data
  }

  getProduct = async (id: string) => {
    runInAction(() => {
      this.isLoading = true
    })

    const queryParams =  qs.stringify( {
      populate: ['images', 'productCategory']
    })

    try {
      const resp = await axios.get(`${this.endpoint}/products/${id}?${queryParams}`, {
        headers: {
          "Authorization": `Bearer ${this.token}`
        }
      })

      const product: TProduct = resp.data.data

      return product
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}