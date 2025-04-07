import { FC, memo } from "react"
import Button from "@/components/UI/Button"
import styles from "./styles.module.scss"
import { Link } from "react-router"
import { TProductCart } from "@/types/TProductCart"

type ProductProps = {
  id: string,
  images: {
    large: string,
    small: string,
    medium: string,
    thumbnail: string
  },
  type: string,
  title: string,
  descr: string,
  price: number,
  discount: number,
  onClick: (product: TProductCart) => void
}

const Product: FC<ProductProps> = ({
  id,
  images,
  type,
  title,
  descr,
  price,
  discount,
  onClick
}) => { 
  const handleButtonClick = () => {
    const product: TProductCart = {
      id: id,
      title: title,
      price: price,
      discount: discount,
      images: images
    }

    onClick(product)
  }

  return (
    <article className={styles.card}>
      <img className={styles.img} src={images.medium} alt="" />

      <div className={styles.main}>
        <div className={styles.info}>
          <span className={styles.type}>{type}</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.descr}>{descr}</p>
        </div>

        <div className={styles.secondary}>
          <span className={styles.price}>
            ${price * (1 - discount / 100)}
            {discount !== 0 && <span className={styles.price__discount}>{price}</span>}
          </span>

          <Button className={styles.product__button} text="Add to cart" func={handleButtonClick}/>
        </div>
      </div>

      <Link className={styles.link} to={`/products/${id}`}></Link>
    </article>
  )
}

export default memo(Product)