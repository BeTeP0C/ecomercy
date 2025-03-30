import { FC } from "react"
import Button from "../../../../components/UI/Button"
import styles from "./styles.module.scss"
import { Link } from "react-router"

type ProductProps = {
  id: string,
  image: string,
  type: string,
  title: string,
  descr: string,
  price: number
}

const Product: FC<ProductProps> = ({
  id,
  image,
  type,
  title,
  descr,
  price
}) => { 
  return (
    <article className={styles.card}>
      <img className={styles.img} src={image} alt="" />

      <div className={styles.main}>
        <div className={styles.info}>
          <span className={styles.type}>{type}</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.descr}>{descr}</p>
        </div>

        <div className={styles.secondary}>
          <span className={styles.price}>${price}</span>

          <Button className={styles.product__button} text="Add to cart" func={() => {}}/>
        </div>
      </div>

      <Link className={styles.link} to={`/products/${id}`}></Link>
    </article>
  )
}

export default Product