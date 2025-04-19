import { TOrderProduct } from "@/types/TOrder"
import styles from "./ProfileOrderProduct.module.scss"
import { FC } from "react"

type ProfileOrderProductProps = {
  product: TOrderProduct
}

const ProfileOrderProduct: FC<ProfileOrderProductProps> = ({product}) => {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <img className={styles.img} src={product.imgUrl} alt="img product" />

        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          <span className={styles.code}>
            Code product: <span className={styles.code_stroke}>{product.id}</span>
          </span>

          <ul className={styles.peculiarities}>
            <li className={styles.peculiarity}>{product.type}</li>
            {product.isGuarantee && <li className={styles.peculiarity}>Guarantee</li>}
            {product.isPopular && <li className={styles.peculiarity}>Popular</li>}
          </ul>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.price}>
          Price: <span className={styles.price_stroke}>{product.fullPrice.toFixed(2)}$</span>
        </div>
        <div className={styles.result__details}>
          {product.amount} thg x {product.priceOne}$
        </div>
      </div>
    </li>
  )
}

export default ProfileOrderProduct
