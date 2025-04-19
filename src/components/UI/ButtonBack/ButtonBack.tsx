import styles from "./ButtonBack.module.scss"
import ArrowBack from "@/components/Icons/ArrowBack"
import { useNavigate } from "react-router"

const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)} type="button" className={styles.back}>
      <ArrowBack />
      Назад
    </button>
  )
}

export default ButtonBack