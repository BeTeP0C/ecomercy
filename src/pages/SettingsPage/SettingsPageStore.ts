import { GlobalStore } from "@/store/globalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { TPasswordCorrect } from "../RegistPage/RegistPageStore";
import axios from "axios";
import { getLevelPassword, getMessageCorrectLogin, getMessageCorrectMail } from "@/utils/validation";
import API_ENDPOINTS from "@/config/apiEndpoints";

type TSettingsInfo = {
  username: string,
  avatarUrl: string,
  loadAvatar: File | null,
  mail: string,
  password: string
}

type TSettingsErrorsForm = {
  username: string,
  mail: string,
  form: string
}

export type TSettingsInfoKeys = keyof TSettingsInfo
type TSettingsErrorsFormKeys = keyof TSettingsErrorsForm

class SettingsPageStore {
  globalStore: GlobalStore
  settingsInfo: TSettingsInfo =  {
    username: "",
    loadAvatar: null,
    avatarUrl: "",
    mail: "",
    password: ""
  }

  settingsErrorsForm: TSettingsErrorsForm = {
    username: "",
    mail: "",
    form: ""
  }

  isLoading: boolean = false
  levelPassword: TPasswordCorrect | null = null

  constructor (globalStore: GlobalStore) {
    this.globalStore = globalStore

    makeObservable(this, {
      settingsInfo: observable,
      settingsErrorsForm: observable,
      isLoading: observable,
      levelPassword: observable,
      resetInfo: action,
      saveUserInfoLocal: action,
      setSettingsUserField: action,
      deleteAvatar: action,
      setErrorForm: action,
      checkCorrectInfoForm: action,
      resetErorrsForm: action,
      setUploadAvatar: action,
      checkErrorsForm: computed,
    })

    this.resetInfo()
  }

  resetInfo = () => {
    if (this.globalStore.userInfo) {
      this.settingsInfo = {
        username: this.globalStore.userInfo.name,
        loadAvatar: null,
        avatarUrl: "",
        mail: this.globalStore.userInfo.mail,
        password: ""
      }
    }
  }

  checkCorrectInfoForm () {
    this.resetErorrsForm()
    const login = this.settingsInfo.username
    const email = this.settingsInfo.mail

    getMessageCorrectMail(email)

    this.setErrorForm(getMessageCorrectMail(email), "mail")
    this.setErrorForm(getMessageCorrectLogin(login), "username")

    this.setErrorForm("", "form")
  }

  resetErorrsForm () {
    this.settingsErrorsForm = {
      username: "",
      mail: "",
    
      form: ""
    }
  }

  saveUserInfoLocal () {
    if (this.globalStore.userInfo) {
      this.globalStore.userInfo = {...this.globalStore.userInfo,
        name: this.settingsInfo.username,
        mail: this.settingsInfo.mail,
      }
    }
  }

  deleteAvatar () {
    this.settingsInfo.avatarUrl = ""
  }

  setSettingsUserField = (value: string, type: TSettingsInfoKeys) => {
    if (type !== "loadAvatar") {
      this.settingsInfo[type] = value

      if (type === "password") {
        this.levelPassword = getLevelPassword(value)

        if (value.length === 0) this.levelPassword = null
      }
    }
  }

  setUploadAvatar = (value: File) => {
    this.settingsInfo.loadAvatar = value
  }

  setErrorForm (message: string, type: TSettingsErrorsFormKeys) {
    this.settingsErrorsForm[type] = message
  }

  get checkErrorsForm () {
    const flag = true

    for (const value of Object.values(this.settingsErrorsForm)) {
      if (value.length !== 0) return false
    }

    if (this.settingsInfo.password.length !== 0) {
      return flag && this.levelPassword === "high"
    }

    return flag
  }

  async uploadAvatar (file: File, refId: string) {
    const formData = new FormData()
  
    formData.append("files", file)
    formData.append("refId", refId)
    formData.append("ref", "api::user.user")
    formData.append("field", "avatar")
  
    const response = await axios.post(`${this.globalStore.endpoint}/upload`, formData, {
      headers: {
        "Authorization": `Bearer ${this.globalStore.accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    })
  
    return response.data
  }

  async saveUserInfoApi () {
    if (this.globalStore.userInfo) {
      this.checkCorrectInfoForm()

      const resCheck = this.checkErrorsForm

      if (resCheck) {
        runInAction(() => {
          this.isLoading = true
        })
  
        let data: {}
  
        if (this.settingsInfo.password !== "") {
          data = {
            "username": this.settingsInfo.username,
            "email": this.settingsInfo.mail,
            "password": this.settingsInfo.password
          } 
        } else {
          data = {
            "username": this.settingsInfo.username,
            "email": this.settingsInfo.mail,
          } 
        }
  
        try {
          await axios.put(`${this.globalStore.endpoint}${API_ENDPOINTS.USERS}/${this.globalStore.userInfo.id}`, data, {
            headers: {
              "Authorization": `Bearer ${this.globalStore.accessToken}`
            }
          })
          
          this.saveUserInfoLocal()
          return true
        } catch (error: any) {
          const errorMessage = error.response.data.error.message
          if (error.status === 401) {
            this.globalStore.handleLogout()
          } else if (error.status === 400) {
            if (errorMessage === "Username already taken") {
              this.setErrorForm("Username already taken", "form")
            }
          }

          console.log(error)

          return false
        } finally {
          runInAction(() => {
            this.isLoading = false
          })
        }
      }
    }

    return false
  }
}

export default SettingsPageStore