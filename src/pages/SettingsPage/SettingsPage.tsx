import Container from "@/components/UI/Container"
import styles from "./SettingsPage.module.scss"
import ButtonBack from "@/components/UI/ButtonBack"
import SettingsPageAvatar from "./components/SettingsPageAvatar"
import { observer, useLocalObservable } from "mobx-react-lite"
import SettingsPageField from "./components/SettingsPageField"
import Button from "@/components/UI/Button"
import { useStore } from "@/hooks/useStore"
import SettingsPageStore from "./SettingsPageStore"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import Loader from "@/components/UI/Loader"

const SettingsPage = observer(() => {
  const {globalStore} = useStore()
  const navigate = useNavigate()
  const store = useLocalObservable(() => new SettingsPageStore(globalStore))

  const handleSave = async () => {
    const result = await store.saveUserInfoApi()

    if (result) navigate(-1)
  }

  useEffect(() => {
    const loadPage = async () => {
      if (globalStore.checkToken) {
        if (!globalStore.userInfo) {
          await globalStore.getUserInfo()
          store.resetInfo()
        }
      } else {
        globalStore.handleLogout()
        navigate("/auth")
      }
    }

    loadPage()
  }, [globalStore.isAuthorizate])

  return (
    <main className={styles.main}>
      <Container>
        <ButtonBack />

        <h1 className={styles.heading}>Settings</h1>

        <div className={styles.content}>
          {globalStore.isLoading ? (
            <Loader />
          ): (
            <>
              <SettingsPageAvatar avatarUrl="" func={store.setUploadAvatar}/>

              <div className={styles.block}>
                <SettingsPageField value={store.settingsInfo.username} title="Username" placeholder="User" type="username" errorMessage={store.settingsErrorsForm.username} func={store.setSettingsUserField}/>
                <SettingsPageField value={store.settingsInfo.mail} title="Mail" placeholder="any@gmail.com" type="mail" errorMessage={store.settingsErrorsForm.mail} func={store.setSettingsUserField}/>
                <SettingsPageField value={store.settingsInfo.password} title="New password" placeholder="Jeuvn342f.?/21" type="password" errorMessage={''} func={store.setSettingsUserField} passwordLevel={store.levelPassword}/>
              </div>

              <div className={styles.actions}>
                <div>
                  {store.settingsErrorsForm.form !== "" && <div className={styles.error}>{store.settingsErrorsForm.form}</div>}
                  <div className={styles.actions__buttons}>
                    <button className={styles.reset} onClick={store.resetInfo}>Reset</button>
                    <Button text={store.isLoading ? "Checking..." : "Save"} func={handleSave} className={styles.save}/>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  )
})

export default SettingsPage