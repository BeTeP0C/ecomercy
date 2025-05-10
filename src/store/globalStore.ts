import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import axios from "axios";
import { TUserInfoData } from "@/types/api/TAuth";
import localStorageStore from "@/utils/localStorageStore";
import getInfoJWT from "@/utils/getInfoJWT";
import { TUserInfoStore } from "@/types/TUserInfoStore";
import API_ENDPOINTS from "@/config/apiEndpoints";

export class GlobalStore {
  rootStore: RootStore;
  endpoint: string = "https://front-school-strapi.ktsdev.ru/api";
  token: string = "f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef"
  accessToken: string | null = null
  isLoading: boolean = false;

  theme: ("dark" | "light") = 'light'

  isAuthorizate: boolean = false

  userInfo: TUserInfoStore | null = null

  constructor (rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      accessToken: observable,
      userInfo: observable,
      isLoading: observable,
      isAuthorizate: observable,
      theme: observable,
      switchTheme: action,
      setThemeFromLocal: action,
      handleAuthorizate: action,
      handleLogout: action,
      getUserInfo: action,
      checkToken: computed,
    })

    this.setThemeFromLocal()

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

  switchTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light"

    this.applyTheme()
    localStorageStore.safeLocalStorageSet("theme", this.theme)
  }

  setThemeFromLocal = () => {
    const save = localStorageStore.safeLocalStorageGet("theme")

    if (save === "dark" || save === "light") this.theme = save
    this.applyTheme()
  }

  applyTheme = () => {
    document.body.className = `theme-${this.theme}`
  }

  async getUserInfo () {
    runInAction(() => {
      this.isLoading = true
    })

    try {
      const resp = await axios.get(`${this.endpoint}${API_ENDPOINTS.INFO_ME}`, {
        headers: {
          "Authorization": `Bearer ${this.accessToken}`
        }
      })

      const data: TUserInfoData = resp.data
      runInAction(() => {
        this.userInfo = {
          id: data.id,
          mail: data.email,
          name: data.username,
          avatar: this.userInfo?.avatar ?? ''
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