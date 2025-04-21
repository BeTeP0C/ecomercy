import { STATUSES, TStatuses } from "@/pages/AuthPage/AuthPageStore"
import styles from "./AuthButtonSubmit.module.scss"
import { FC } from "react"

type AuthButtonSubmitProps = {
  isLoading: TStatuses,
  errorMessage: string,
  text: string
}

const AuthButtonSubmit: FC<AuthButtonSubmitProps> = ({isLoading, errorMessage, text}) => {
  return (
    <div>
      {errorMessage !== "" && <div className={styles.error}>{errorMessage}</div>}
      <button className={styles.button}>
        {isLoading === STATUSES.LOADING ? "Checking..." : text}
      </button>
    </div>
  )
}

export default AuthButtonSubmit