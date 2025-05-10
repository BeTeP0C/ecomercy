import { TOrder } from "@/types/TOrder"
import styles from "./ProfileOrder.module.scss"
import { FC, useEffect, useRef, useState } from "react"
import SuccessArrow from "@/components/Icons/SuccessArrow"
import Button from "@/components/UI/Button"
import ProfileOrderProduct from "../ProfileOrderProduct"

type ProfileOrderProps = {
  order: TOrder,
  handleDeleteOrder: (id: number) => void,
  handleRepeatOrder: (id: number) => void,
}

const ProfileOrder: FC<ProfileOrderProps> = ({order, handleDeleteOrder, handleRepeatOrder}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const listRef = useRef<HTMLUListElement | null>(null)
  const [hiddenCards, setHiddenCards] = useState<number>(5)
  const isMore = order.products.length > hiddenCards
  
  const handleClickButtonOpen = () => {
    setIsOpen(prev => !prev)
  }

  const handleClickButtonDelete = () => {
    handleDeleteOrder(order.id)
  }

  useEffect(() => {
    if (listRef.current) {
      if (isOpen) {
        listRef.current.style.height = `${listRef.current.scrollHeight}px`
      } else {
        listRef.current.style.height = "0px"
      }
    }
  }, [isOpen, listRef.current])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) {
        setHiddenCards(5)
      } else if (window.innerWidth > 500) {
        setHiddenCards(3)
      } else if (window.innerWidth > 440) {
        setHiddenCards(2)
      } else if (window.innerWidth > 355) {
        setHiddenCards(3)
      } else if (window.innerWidth > 300) {
        setHiddenCards(2)
      }
    }

    handleResize()
    
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <div className={styles.info__main}>
          <div className={styles.info__titles}>
            <h3 className={styles.code}>{`Order `} <span className={styles.code_small}>{`#${order.id}`}</span></h3>
            <span className={styles.date}>{order.dataCreate}</span>
          </div>
          <div className={styles.paid}>
            Paid for
            <SuccessArrow />
          </div>
        </div>

        <button onClick={handleClickButtonOpen} type="button" className={`${styles.open} ${isOpen && styles.open_active}`}></button>
      </div>
      
      <div>
        <ul ref={listRef} className={`${styles.list} ${isOpen && styles.list_active}`}>
          {order.products.map(product => (
            <ProfileOrderProduct key={product.id} product={product}/>
          ))}
        </ul>

        <div className={`${styles.content__info} ${isOpen && styles.content__info_active}`}>
          {isOpen && window.innerWidth > 440 ? (
            <button onClick={handleClickButtonDelete} type="button" className={`${styles.delete}`}>Delete</button>
          ): (
            <div className={styles.content__review}>
              <ul className={styles.content__list}>
                {order.products.map(((product, index) => {
                  if (isMore && index + 1 > hiddenCards) {
                    return null
                  }

                  return (
                    <li key={product.id} className={styles.content__item}>
                      <img className={styles.content__img} src={product.imgUrl} alt={`Image ${product.title}`} />
                    </li>
                  )
                }))}
              </ul>

              {isMore && (
                <div className={styles.more}>More +{order.products.length - hiddenCards}</div>
              )}
            </div>
          )}

          <div className={styles.content__result}>
            <div className={styles.price}>{order.price}$</div>

            <div className={styles.actions}>
              <Button func={() => handleRepeatOrder(order.id)} className={styles.content__button} text="Repeat"/>
              <button onClick={handleClickButtonDelete} type="button" className={`${styles.delete} ${styles.actions__delete}`}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProfileOrder