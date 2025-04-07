import Container from "@/components/UI/Container"
import styles from "./CartPage.module.scss"
import { observer } from "mobx-react-lite"
import { useStore } from "@/hooks/useStore"
import ProductCart from "./components/ProductCart"
import { useEffect, useState } from "react"
import Button from "@/components/UI/Button"

const CartPage = observer(() => {
  const {globalStore, cartStore} = useStore()
  const [modalContent, setModalContent] = useState<React.ReactNode>("")

  const handleButtonClick = () => {
    globalStore.setModalContent(modalContent)
    globalStore.modalOpen()
  }

  const handlePayment = () => {
    cartStore.clearCart()
    globalStore.modalClose()
    globalStore.setModalContent("")
  }

  const handleCancel = () => {
    globalStore.modalClose()
  }

  useEffect(() => {
    cartStore.getProductsCart()
  }, [])

  useEffect(() => {
    setModalContent((
      <div className={styles.modal__main}>
        <h2 className={styles.modal__title}>Total</h2>
        <span className={styles.modal__price}>{cartStore.getFullSum()}$</span>

        <div className={styles.modal__actions}>
          <Button className={styles.modal__payment} text="Payment" func={handlePayment}/>
          <Button className={styles.modal__cancle} text="Cancle" func={handleCancel}/>
        </div>
      </div>
    ))
  }, [cartStore.productsCart])

  return (
    <main className={styles.cart}>
      <Container>
        <h1 className={styles.heading}>
          Cart
          {cartStore.productsCart.length !== 0 && <span className={styles.amount}>{cartStore.productsCart.length} products</span>}
        </h1>

        <div className={styles.block}>
          <div className={styles.main}>
            {cartStore.productsCart.length === 0 && (
              <p className={styles.empty}>You haven't added anything to the shopping cart</p>
            )}
            <ul className={styles.list}>
              {cartStore.productsCart.map(product => {
                return (
                  <ProductCart key={product.id} product={product} onClick={cartStore.deleteProductToCart} />
                )
              })}
            </ul>
          </div>

          {cartStore.productsCart.length !== 0 && (
            <div className={styles.payment}>
              <div className={styles.modul}>
                <h2 className={styles.title}>Условия заказа</h2>
              </div>

              <div className={styles.payment__main}>
                <div className={styles.payment__info}>
                  <h3 className={styles.payment__heading}>Total</h3>
                  <div className={`${styles.payment__line_main} ${styles.payment__line}`}>
                    <h4 className={`${styles.payment__title} ${styles.payment__title_main}`}>{cartStore.productsCart.length} products</h4>
                    <span className={`${styles.price} ${styles.price_main}`}>{cartStore.getFullSumWithDiscount().toFixed(2)}$</span>
                  </div>
                  <div className={styles.payment__line}>
                    <h4 className={styles.payment__title}>{cartStore.productsCart.length} products</h4>
                    <span className={styles.price}>{cartStore.getFullSum().toFixed(2)}$</span>
                  </div>
                  <div className={styles.payment__line}>
                    <h4 className={styles.payment__title}>Discount</h4>
                    <span className={styles.price__discount}>-{((cartStore.getFullSum() - cartStore.getFullSumWithDiscount()).toFixed(2))}$</span>
                  </div>
                </div>

                <Button className={styles.payment__button} text="Payment" func={handleButtonClick}/>
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
})

export default CartPage