import styles from "./ProductSkeleton.module.scss"
import ProductSkeletonElement from "./ProductSkeletonELement"

const ProductSkeleton = () => {
  return (
    <li>
      <ProductSkeletonElement height={360} mb={48} type="big"/>
      <div className={styles.main}>
        <ProductSkeletonElement width={240} height={18} mb={8} type="small"/>
        <ProductSkeletonElement height={43} mb={12} type="small"/>
        <ProductSkeletonElement height={14} mb={8} type="small"/>
        <ProductSkeletonElement height={14} mb={8} type="small"/>
        <ProductSkeletonElement height={14} mb={34} type="small"/>
      </div>
      <div className={styles.second}>
        <ProductSkeletonElement width={149} height={52} type="small"/>
      </div>
    </li>
  )
}

export default ProductSkeleton