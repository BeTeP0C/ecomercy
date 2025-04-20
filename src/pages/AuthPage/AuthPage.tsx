import Container from "@/components/UI/Container"
import styles from "./AuthPage.module.scss"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useStore } from "@/hooks/useStore"
import AuthPageStore, { TInfoTries } from "./AuthPageStore"
import { FormEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import Person from "@/components/Icons/Person"
import AuthInput from "../../components/UI/AuthInput"
import Lock from "@/components/Icons/Lock"
import AuthButtonSubmit from "@/components/UI/AuthButtonSubmit"
import localStorageStore from "@/utils/localStorageStore"

const AuthPage = observer(() => {
  const {globalStore} = useStore()
  const navigate = useNavigate()
  const store = useLocalObservable(() => new AuthPageStore (globalStore))

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await store.handleAuth()

    if (result) navigate("/products")
  }

  useEffect(() => {
    const infoTriesJSON = localStorageStore.safeLocalStorageGet("infoTries")
    const resultToken = globalStore.checkToken

    if (resultToken) {
      globalStore.handleAuthorizate()
      navigate("/")
    } else {
      globalStore.handleLogout()
      if (infoTriesJSON) {
        const infoTries: TInfoTries = JSON.parse(infoTriesJSON)
        store.setTries(infoTries.amount, infoTries.dataBlock)
      }
    }
  }, [])

  return (
    <main className={styles.main}>
      <Container className={styles.auth__container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Login</h1>

          <form className={styles.form} onSubmit={handleSubmitForm}>
            <AuthInput value={store.authLogin} setValueAuth={store.setAuthLogin} Icon={Person} placeholder="Login" />
            <AuthInput value={store.authPassword} setValueAuth={store.setAuthPassword} Icon={Lock} placeholder="Password" type="password"/>
            <AuthButtonSubmit isLoading={store.isLoading} errorMessage={store.errorsForm} text="Login"/>
          </form>

          <Link className={styles.link} to={"/regist"}>No account? Register an account for free at Lalasia!</Link>
        </div>
      </Container>
    </main>
  )
})

export default AuthPage