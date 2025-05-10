import Container from "@/components/UI/Container"
import styles from "./CartPage.module.scss"
import { observer } from "mobx-react-lite"
import { useStore } from "@/hooks/useStore"
import ProductCart from "./components/ProductCart"
import { useEffect } from "react"
import Button from "@/components/UI/Button"
import ButtonBack from "@/components/UI/ButtonBack"
import BlockEmpty from "@/components/UI/BlockEmpty"

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
    modalStore.modalOpen("payment", {
      price: cartStore.fullSumWithDiscount,
      amountProducts: cartStore.amountProducts,
      fullPrice: cartStore.fullSum,
      discount: cartStore.fullSum - cartStore.fullSumWithDiscount, 
      onPayment: handlePayment, 
      onClose: handleCancel
    })
  }

  useEffect(() => {
    cartStore.getProductsCart()
  }, [])

  return (
    <main className={styles.cart}>
      <Container>
        <ButtonBack />
        <h1 className={styles.heading}>
          Cart
          {cartStore.amountProducts !== 0 && <span className={styles.amount}>{cartStore.amountProducts} products</span>}
        </h1>

        {cartStore.amountProducts === 0 ? (
          <BlockEmpty />
        ): (
          <div className={styles.block}>
            <div className={`${styles.main} ${cartStore.amountProducts === 0 && styles.main_empty}`}>
              <ul className={styles.list}>
                {cartStore.productsCart.map(product => {
                  return (
                    <ProductCart key={product.id} product={product} deleteProduct={cartStore.deleteProductToCart} addProduct={cartStore.addProductToCart} minusProduct={cartStore.minusProductToCart}/>
                  )
                })}
              </ul>
            </div>

            {cartStore.amountProducts !== 0 && (
              <div className={styles.payment}>
                <div className={styles.modul}>
                  <h2 className={styles.title}>Terms of the order</h2>
                </div>

                <div className={styles.payment__main}>
                  <div className={styles.payment__info}>
                    <div className={styles.total}>
                      <h3 className={styles.total__heading}>Total</h3>
                      <span className={styles.total__price}>{cartStore.fullSum.toFixed(2)}$</span>
                    </div>
                    <div className={`${styles.payment__line_main} ${styles.payment__line}`}>
                      <h4 className={styles.payment__heading}>{cartStore.amountProducts} products</h4>
                      <span>{cartStore.fullSumWithDiscount.toFixed(2)}$</span>
                    </div>
                    <div className={`${styles.payment__line_price} ${styles.payment__line}`}>
                      <h4 className={styles.payment__title}>{cartStore.amountProducts} products</h4>
                      <span>{cartStore.fullSum.toFixed(2)}$</span>
                    </div>
                    <div className={styles.payment__line}>
                      <h4 className={styles.payment__title}>Discount</h4>
                      <span className={styles.price__discount}>- {((cartStore.fullSum - cartStore.fullSumWithDiscount).toFixed(2))}$</span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <Button className={styles.payment__button} text="Payment" func={handleButtonClick}/>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  )
})

export default CartPage