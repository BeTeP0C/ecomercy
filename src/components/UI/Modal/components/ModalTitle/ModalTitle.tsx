import { FC } from "react"
import styles from "./ModalTitle.module.scss"

type ModalTitleProps = {
  title: string
}

const ModalTitle: FC<ModalTitleProps> = ({title}) => {
  return (
    <h2 className={styles.title}>{title}</h2>
  )
}

export default ModalTitle