import { TProductCart } from "@/types/TProductCart"
import styles from "./ProductCart.module.scss"
import { FC, memo, useMemo } from "react"
import Cart from "@/components/Icons/Cart"
import { Link } from "react-router"
import LOCAL_ENDPOINT from "@/config/localEndpoint"

type ProductCartProps = {
  product: TProductCart,
  onClick: (id: string) => void
}

const ProductCart: FC<ProductCartProps> = ({product, onClick}) => {
  const handleButtonClick = () => {
    onClick(product.idDocument)
  }

  const finalPrice = useMemo(() => {
    return (product.price * (1 - product.discount / 100)).toFixed(2);
  }, [product.price, product.discount]);

  return (
    <li className={styles.item}>
      <div className={styles.main}>
        <Link to={`${LOCAL_ENDPOINT.PRODUCTS}/${product.id}`}>
          <img className={styles.img} src={product.images.medium} alt={product.title} />
        </Link>
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <span className={styles.price}>
            ${finalPrice} х {product.amount}
            {product.discount !== 0 && <span className={styles.price__discount}>{product.price}</span>}
          </span>
        </div>
      </div>

      <div>
        <button type="button" className={styles.delete} onClick={handleButtonClick}>
          <Cart />
        </button>
      </div>
    </li>
  )
}

export default memo(ProductCart)