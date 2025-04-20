import { GlobalStore } from "@/store/globalStore";
import { TAuthSuccess } from "@/types/api/TAuth";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { STATUSES, TStatuses } from "../AuthPage/AuthPageStore";
import { getLevelPassword, getMessageCorrectLogin, getMessageCorrectMail } from "@/utils/validation";
import localStorageStore from "@/utils/localStorageStore";

type TInfoForm = {
  login: string,
  email: string,
  password: string,
  repeatPassword: string
}

type TErrorsForm = {
  login: string,
  email: string,
  password: string,
  repeatPassword: string,
  form: string
}

export type TInfoFormKeys = keyof TInfoForm;

type TErrorsFormKeys = keyof TErrorsForm;

export type TPasswordCorrect = ("low" | "medium" | "high")

class RegistPageStore {
  globalStore: GlobalStore
  infoForm: TInfoForm = {
    login: "",
    email: "",
    password: "",
    repeatPassword: ""
  }

  errorsForm = {
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
    form: ""
  }

  passwordLevel: TPasswordCorrect | null = null

  isLoading: TStatuses = STATUSES.STOP

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      isLoading: observable,
      infoForm: observable,
      errorsForm: observable,
      passwordLevel: observable,
      setForm: action,
      setErrorForm: action,
      checkCorrectInfoForm: action,
      resetErorrsForm: action,
      handleRegist: action,
      checkErrorsForm: computed,
    })
  }

  setForm = (value: string, type: TInfoFormKeys) => {
    this.infoForm[type] = value

    if (type === "password") {
      this.passwordLevel = getLevelPassword(value)

      if (value.length === 0) this.passwordLevel = null
    }
  }

  setErrorForm (message: string, type: TErrorsFormKeys) {
    this.errorsForm[type] = message
  }

  checkCorrectInfoForm () {
    this.resetErorrsForm()
    const login = this.infoForm.login
    const email = this.infoForm.email
    const password = this.infoForm.password
    const repeatPassword = this.infoForm.repeatPassword

    this.setErrorForm(getMessageCorrectMail(email), "email")
    this.setErrorForm(getMessageCorrectLogin(login), "login")

    if (password.length === 0) {
      this.setErrorForm("The field is empty", "password")
    }

    if (repeatPassword !== password) {
      this.setErrorForm("Passwords don't match", "repeatPassword")
    } else {
      this.setErrorForm("", "repeatPassword")
    }

    this.setErrorForm("", "form")
  }

  get checkErrorsForm () {
    let flag = true

    for (const value of Object.values(this.errorsForm)) {
      if (value.length !== 0) return false
    }

    return (flag && this.passwordLevel === "high")
  }

  resetErorrsForm () {
    this.errorsForm = {
      login: "",
      email: "",
      password: "",
      repeatPassword: "",
      form: ""
    }
  }

  async handleRegist () {
    this.checkCorrectInfoForm()

    const resCheck = this.checkErrorsForm

    if (resCheck) {
      runInAction(() => {
        this.isLoading = STATUSES.LOADING
      })

      try {
        const resp = await axios.post(`${this.globalStore.endpoint}/auth/local/register`, {
          "username": this.infoForm.login,
          "email": this.infoForm.email,
          "password": this.infoForm.password
        })
  
        this.resetErorrsForm()
        const data: TAuthSuccess = resp.data
  
        localStorageStore.safeLocalStorageSet("access_token", data.jwt)
        localStorageStore.safeLocalStorageSet("user_id", data.user.id.toString())
  
        runInAction(() => {
          this.globalStore.accessToken = data.jwt
          this.globalStore.userInfo = {
            id: data.user.id,
            mail: data.user.email,
            name: data.user.username
          }
          
          this.globalStore.handleAuthorizate()
        })
  
        return true
      } catch (error: any) {
        const errorMessage = error.response.data.error.message

        if (error.status === 400) {
          if (errorMessage === "email must be a valid email") this.setErrorForm("Unvalid email", "form")
          if (errorMessage === "Email or Username are already taken") this.setErrorForm("Email or Login are already taken", "form")
        } else if (error.status === 500) {
          this.setErrorForm("Server error. Please try again later", "form")
        }
  
        return false
      } finally {
        runInAction(() => {
          this.isLoading = STATUSES.STOP
        })
      }
    }

    return false
  }
}

export default RegistPageStore