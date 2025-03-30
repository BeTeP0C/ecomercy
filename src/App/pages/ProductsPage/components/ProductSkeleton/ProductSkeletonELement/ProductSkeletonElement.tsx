import { FC } from "react"
import styles from "./ProductSkeletonElement.module.scss"

type ProductSkeletonElementProps = {
  height: number,
  width?: number,
  mb?: number,
  type: ("big" | "small")
}

const ProductSkeletonElement: FC<ProductSkeletonElementProps> = ({width, height, type, mb = 0}) => {

  return (
    <div className={`${styles.main} ${styles[`main_${type}`]}`} style={{width: width, height: height, marginBottom: mb}}>
      <div className={styles.grad}></div>
    </div>
  )
}

export default ProductSkeletonElement