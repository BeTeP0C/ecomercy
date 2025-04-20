import Container from "@/components/UI/Container"
import styles from "./CartPage.module.scss"
import { observer } from "mobx-react-lite"
import { useStore } from "@/hooks/useStore"
import ProductCart from "./components/ProductCart"
import { useEffect } from "react"
import Button from "@/components/UI/Button"

const CartPage = observer(() => {
  const { cartStore, modalStore} = useStore()

  const handlePayment = () => {
    cartStore.addOrderLocal()
    cartStore.clearCart()
    modalStore.modalClose()
    setTimeout(modalStore.modalReset, 300)
  }

  const handleCancel = () => {
    modalStore.modalClose()
  }

  const handleButtonClick = () => {
    modalStore.modalOpen("payment", {price: cartStore.fullSum, onPayment: handlePayment, onClose: handleCancel})
  }

  useEffect(() => {
    cartStore.getProductsCart()
  }, [])

  return (
    <main className={styles.cart}>
      <Container>
        <h1 className={styles.heading}>
          Cart
          {cartStore.amountProducts !== 0 && <span className={styles.amount}>{cartStore.amountProducts} products</span>}
        </h1>

        <div className={styles.block}>
          <div className={styles.main}>
            {cartStore.amountProducts === 0 && (
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

          {cartStore.amountProducts !== 0 && (
            <div className={styles.payment}>
              <div className={styles.modul}>
                <h2 className={styles.title}>Условия заказа</h2>
              </div>

              <div className={styles.payment__main}>
                <div className={styles.payment__info}>
                  <h3 className={styles.payment__heading}>Total</h3>
                  <div className={`${styles.payment__line_main} ${styles.payment__line}`}>
                    <h4 className={`${styles.payment__title} ${styles.payment__title_main}`}>{cartStore.amountProducts} products</h4>
                    <span className={`${styles.price} ${styles.price_main}`}>{cartStore.fullSumWithDiscount.toFixed(2)}$</span>
                  </div>
                  <div className={styles.payment__line}>
                    <h4 className={styles.payment__title}>{cartStore.amountProducts} products</h4>
                    <span className={styles.price}>{cartStore.fullSum.toFixed(2)}$</span>
                  </div>
                  <div className={styles.payment__line}>
                    <h4 className={styles.payment__title}>Discount</h4>
                    <span className={styles.price__discount}>-{((cartStore.fullSum - cartStore.fullSumWithDiscount).toFixed(2))}$</span>
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