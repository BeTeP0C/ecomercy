import { FC } from "react"
import styles from "./ModalProductPrice.module.scss"

type ModalProductPriceProps = {
  amountProducts?: number,
  fullPrice?: number,
  discount?: number,
  price: number,
}

const ModalProductPrice: FC<ModalProductPriceProps> = ({price, discount, fullPrice, amountProducts}) => {
  return (
    <div className={styles.content}>
      {fullPrice !== undefined && amountProducts !== undefined && discount !== undefined && (
        <div className={styles.score}>
          <div className={`${styles.score__line} ${styles.score__line_full}`}>
            <h2 className={styles.score__title}>{amountProducts} products</h2>
            
            <span className={styles.score__price}>{fullPrice}$</span>
          </div>
          <div className={`${styles.score__line} ${styles.score__line_discount}`}>
            <h2 className={styles.score__title}>Discount</h2>
            
            <span className={`${styles.score__price}`}>{discount}$</span>
          </div>
        </div>
      )}
      <div className={styles.result}>
        <h2 className={styles.result__title}>Total</h2>
        <span className={styles.result__price}>{price}$</span>
      </div>
    </div>
  )
}

export default ModalProductPrice