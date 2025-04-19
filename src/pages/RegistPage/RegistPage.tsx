import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./RegistPage.module.scss"
import Container from "@/components/UI/Container"
import AuthInput from "@/components/UI/AuthInput"
import { useStore } from "@/hooks/useStore"
import { useNavigate } from "react-router"
import RegistPageStore from "./RegistPageStore"
import { FormEvent, useEffect } from "react"
import Person from "@/components/Icons/Person"
import AuthButtonSubmit from "@/components/UI/AuthButtonSubmit"
import Mail from "@/components/Icons/Mail"
import Lock from "@/components/Icons/Lock"
import PasswordLevel from "./components/PasswordLevel"

const RegistPage = observer(() => {
  const {globalStore} = useStore()
  const navigate = useNavigate()
  const store = useLocalObservable(() => new RegistPageStore (globalStore))

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await store.handleRegist()

    if (result) navigate("/products")
  }

  useEffect(() => {
    const resultToken = globalStore.checkToken

    if (resultToken) {
      globalStore.handleAuthorizate()
      navigate("/")
    } else {
      globalStore.handleLogout()
    }
  }, [])

  return (
    <main className={styles.main}>
      <Container className={styles.regist__container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Registration</h1>

          <form className={styles.form} onSubmit={handleSubmitForm}>
            <AuthInput value={store.infoForm.login} setValueRegist={store.setForm} errorMessage={store.errorsForm.login} type="login" Icon={Person} placeholder="Login"/>
            <AuthInput value={store.infoForm.email} setValueRegist={store.setForm} errorMessage={store.errorsForm.email} type="email" Icon={Mail} placeholder="Email"/>
            <AuthInput value={store.infoForm.password} setValueRegist={store.setForm} errorMessage={store.errorsForm.password} type="password" Icon={Lock} placeholder="Password" passwordLevel={store.passwordLevel}/>
            <AuthInput value={store.infoForm.repeatPassword} setValueRegist={store.setForm} errorMessage={store.errorsForm.repeatPassword} type="repeatPassword" Icon={Lock} placeholder="Repeat password"/>

            <AuthButtonSubmit isLoading={store.isLoading} errorMessage={store.errorsForm.form} text="Registration"/>
          </form>
        </div>
      </Container>
    </main>
  )
})

export default RegistPage