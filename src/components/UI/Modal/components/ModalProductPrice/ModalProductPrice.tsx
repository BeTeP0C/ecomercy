import { FC } from "react"
import styles from "./ModalProductPrice.module.scss"

type ModalProductPriceProps = {
  price: number
}

const ModalProductPrice: FC<ModalProductPriceProps> = ({price}) => {
  return (
    <div className={styles.price}>
      {price}$
    </div>
  )
}

export default ModalProductPrice