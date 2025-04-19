import { GlobalStore, safeLocalStorageSet } from "@/store/globalStore";
import { TAuthSuccess } from "@/types/api/TAuth";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";


export type TInfoTries = {
  amount: number,
  dataBlock: number
}

export const STATUSES = {
  SUCCESS: "success",
  LOADING: "loading",
  STOP: "stop"
} as const

export type TStatuses = typeof STATUSES[keyof typeof STATUSES];

class AuthPageStore {
  globalStore: GlobalStore
  authLogin: string = ""
  authPassword: string = ""
  private infoTries: TInfoTries = {
    amount: 0,
    dataBlock: 0
  }

  errorsForm: string = ''

  isLoading: TStatuses = STATUSES.STOP

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      authLogin: observable,
      authPassword: observable,
      isLoading: observable,
      errorsForm: observable,
      setAuthLogin: action,
      setAuthPassword: action,
      setTries: action,
      addErrorForTry: action,
      setErrorsForm: action,
      addAmountTry: action,
      _dataBlock: computed
    })
  }

  setAuthLogin = (value: string) => {
    this.authLogin = value
  }

  setAuthPassword = (value: string) => {
    this.authPassword = value
  }

  setErrorsForm (message: string) {
    this.errorsForm = message
  }

  setTries (amount: number, dataBlock: number) {
    this.infoTries = {
      amount: amount,
      dataBlock: dataBlock
    }
  }

  addErrorForTry () {
    if (this.infoTries.amount > 5) {
      this.setErrorsForm("You have exceeded the attempt limit. Try it in a minute")
    } else if (this.infoTries.amount > 10) {
      this.setErrorsForm("You have exceeded the attempt limit. Try it in 5 minutes")
    } else if (this.infoTries.amount > 15) {
      this.setErrorsForm("You have exceeded the attempt limit. Try again later")
    }
  }

  addAmountTry () {
    if (this.infoTries.amount < 5) {
      this.setTries(this.infoTries.amount + 1, 0)
    } else if (this.infoTries.amount < 10) {
      this.setTries(this.infoTries.amount + 1, Date.now() / 1000 + 60)
    } else if (this.infoTries.amount < 15) {
      this.setTries(this.infoTries.amount + 1, Date.now() / 1000 + 300)
    } else if (this.infoTries.amount < 18) {
      this.setTries(this.infoTries.amount + 1, Date.now() / 1000 + 1500)
    }

    this.addErrorForTry()

    safeLocalStorageSet("infoTries", JSON.stringify(this.infoTries))
  }
  async handleAuth () {
    if (this.infoTries.dataBlock < Date.now() / 1000) {
      runInAction(() => {
        this.isLoading = STATUSES.LOADING
      })
      this.setErrorsForm("")
      try {
        const resp = await axios.post(`${this.globalStore.endpoint}/auth/local`, {
          "identifier": this.authLogin,
          "password": this.authPassword
        })

        const data: TAuthSuccess = resp.data

        safeLocalStorageSet("access_token", data.jwt)
        safeLocalStorageSet("user_id", data.user.id.toString())

        runInAction(() => {
          this.globalStore.accessToken = data.jwt
          this.globalStore.userInfo = {
            id: data.user.id,
            mail: data.user.email,
            name: data.user.username
          }
          this.globalStore.handleAuthorizate()
          this.setTries(0, 0)
          safeLocalStorageSet("infoTries", JSON.stringify(this.infoTries))
        })

        return true
      } catch (error: any) {
        if (error.status === 400) {
          this.setErrorsForm("Incorrect username or password")
        } else if (error.status === 403) {
          this.setErrorsForm("You are already registered")
        } else if (error.status === 500) {
          this.setErrorsForm("Server error. Please try again later")
        }

        if (error.status !== 500) {
          this.addAmountTry()
        }

        return false
      } finally {
        runInAction(() => {
          this.isLoading = STATUSES.STOP
        })
      }
    } else {
      this.addErrorForTry()
    }
  }

  get _dataBlock () {
    return this.infoTries.dataBlock
  }
}

export default AuthPageStore