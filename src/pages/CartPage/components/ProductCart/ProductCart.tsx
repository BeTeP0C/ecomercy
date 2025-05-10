import { TProductCart } from "@/types/TProductCart"
import styles from "./ProductCart.module.scss"
import { FC, memo, useMemo } from "react"
import Cart from "@/components/Icons/Cart"
import { Link } from "react-router"
import LOCAL_ENDPOINT from "@/config/localEndpoint"

type ProductCartProps = {
  product: TProductCart,
  deleteProduct: (id: string) => void,
  minusProduct: (product: TProductCart) => void,
  addProduct: (product: TProductCart) => void
}

const ProductCart: FC<ProductCartProps> = ({product, deleteProduct, minusProduct, addProduct}) => {
  const handleDelete = () => {
    deleteProduct(product.idDocument)
  }

  const handleAdd = () => {
    addProduct(product)
  }

  const handleMinus = () => {
    minusProduct(product)
  }

  const finalPrice = useMemo(() => {
    return (product.price * (1 - product.discount / 100) * product.amount);
  }, [product.price, product.discount, product.amount]);

  const fullPrice = useMemo(() => {
    return product.price * product.amount
  }, [product.price, product.amount])


  const discount = fullPrice - finalPrice

  return (
    <li className={styles.item}>
      <div className={styles.main}>
        <div className={styles.main__view}>
          <Link to={`${LOCAL_ENDPOINT.PRODUCTS}/${product.idDocument}`}>
            <img className={styles.img} src={product.images.medium} alt={product.title} />
          </Link>

          <span className={styles.id}>{product.id}</span>
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>
            <Link className={styles.title__link} to={`${LOCAL_ENDPOINT.PRODUCTS}/${product.idDocument}`}>{product.title}</Link>
          </h2>
          
          <div className={styles.counter}>
            <button onClick={handleMinus} className={`${styles.counter__button} ${styles.counter__button_down}`}></button>
            <div className={styles.counter__result}>{product.amount}</div>
            <button onClick={handleAdd} className={`${styles.counter__button} ${styles.counter__button_up}`}></button>
          </div>

          <span className={styles.price_one}>
            {product.price}$ / thx.
          </span>
        </div>
      </div>

      <div className={styles.main__secondary}>
        <button type="button" className={styles.delete} onClick={handleDelete}>
          <Cart />
        </button>

        <div className={styles.price__info}>
          <div className={styles.price}>
            {product.discount !== 0 && <div className={styles.price__full}>{fullPrice.toFixed(2)}$</div>}
            <div className={styles.price__final}>{finalPrice.toFixed(2)}$</div>
          </div>

          {product.discount !== 0 && <div className={styles.discount}>benefit {discount.toFixed(2)}$</div>}
        </div>
      </div>
    </li>
  )
}

export default memo(ProductCart)