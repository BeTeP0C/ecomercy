import { makeAutoObservable, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { TFilterStore } from "../types/TFilter";
import axios from "axios";
import qs from "qs"
import {jwtDecode} from 'jwt-decode';
import { TProduct } from "../types/TProduct";
import { TPagination } from "../types/TPagination";
import { TUserInfoData } from "@/types/api/TAuth";
import localStorageStore from "@/utils/localStorageStore";
import { TProductApi } from "@/types/api/TProductApi";

// type TLoading = ("loading" | "succefuly" | "failed")

interface JwtPayload {
  id: number;
  iat: number,
  exp: number
}

export const getInfoJWT = (token: string) => {
  const jwtToken = jwtDecode<JwtPayload>(token) as JwtPayload | null
  return jwtToken
}

type TUserInfo = {
  mail: string,
  name: string,
  id: number
} | null

export class GlobalStore {
  rootStore: RootStore;
  endpoint: string = "https://front-school-strapi.ktsdev.ru/api";
  token: string = "f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef"
  accessToken: string | null = null
  isLoading: boolean = false

  isAuthorizate: boolean = false

  // перенести в локальный стор
  products: TProduct[] = []

  // добавить в локальный стор
  filter: TFilterStore = {
    title: "",
    priceStart: 0,
    priceEnd: 0,
    rating: 0
  }

  userInfo: TUserInfo = null

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      userInfo: observable,
    })

    this.rootStore = rootStore
    this.getCurrentSavePage()

    if (this.checkToken) {
      const access_token = localStorageStore.safeLocalStorageGet("access_token")
      if (access_token) {
        this.accessToken = access_token
        this.handleAuthorizate()
      }
    } else {
      this.handleLogout()
    }
  }

  get checkToken () {
    const access_token = localStorageStore.safeLocalStorageGet("access_token")
    if (access_token) {
      const infoToken = getInfoJWT(access_token)

      if (infoToken) {
        return infoToken.iat + 259200 > Date.now() / 1000
      }
    }

    return false
  }

  handleAuthorizate () {
    this.isAuthorizate = true
  }

  handleLogout = () => {
    this.isAuthorizate = false
    localStorageStore.safeLocalStorageDelete("access_token")
    localStorageStore.safeLocalStorageDelete("user_id")
  }

  // перенести в локальный стор
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

  async getUserInfo () {
    runInAction(() => {
      this.isLoading = true
    })

    try {
      const resp = await axios.get(`${this.endpoint}/users/me`, {
        headers: {
          "Authorization": `Bearer ${this.accessToken}`
        }
      })

      const data: TUserInfoData = resp.data
      runInAction(() => {
        this.userInfo = {
          id: data.id,
          mail: data.email,
          name: data.username
        }
      })
    } catch (error: any) {
      if (error.status === 401) {
        this.handleLogout()
      }

      console.log(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}