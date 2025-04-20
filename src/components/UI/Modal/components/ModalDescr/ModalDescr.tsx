import { FC } from "react"
import styles from "./ModalDescr.module.scss"

type ModalDescrProps = {
  text: string
}

const ModalDescr: FC<ModalDescrProps> = ({text}) => {
  return (
    <div className={styles.text}>{text}</div>
  )
}

export default ModalDescr