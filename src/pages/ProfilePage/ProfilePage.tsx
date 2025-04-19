import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./ProfilePage.module.scss"
import stylesModal from '../CartPage/CartPage.module.scss'
import Container from "@/components/UI/Container"
import ButtonBack from "@/components/UI/ButtonBack"
import ProfileInfo from "./components/ProfileInfo"
import { useStore } from "@/hooks/useStore"
import ProfilePageStore from "./ProfilePageStore"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import ProfileOrders from "./components/ProfileOrders"
import Loader from "@/components/UI/Loader"
import Button from "@/components/UI/Button"
import { TOrder } from "@/types/TOrder"
import { getDateTransform } from "@/utils/getDateTransform"
import { safeLocalStorageGet, safeLocalStorageSet } from "@/store/globalStore"

const ProfilePage = observer(() => {
  const { globalStore } = useStore()
  const navigate = useNavigate()
  const store = useLocalObservable(() => new ProfilePageStore (globalStore))

  const handlePayment = (order: TOrder, lastOrder: number) => {
    store.addOrders(order)
    safeLocalStorageSet("last_order", JSON.stringify(lastOrder))
    globalStore.modalClose()
    globalStore.setModalContent("")
  }

  const handleCancel = () => {
    globalStore.modalClose()
  }

  const handleRepeat = (id: number) => {
    const currentOrder = store.orders.find(order => order.id === id)
    const lastOrderJSON = safeLocalStorageGet("last_order")

    if (currentOrder && lastOrderJSON) {
      const modalContent = (
        <div className={stylesModal.modal__main}>
          <h2 className={stylesModal.modal__title}>Total</h2>
          <span className={stylesModal.modal__price}>{currentOrder.price}$</span>

          <div className={stylesModal.modal__actions}>
            <Button className={stylesModal.modal__payment} text="Payment" func={() => handlePayment({...currentOrder, id: JSON.parse(lastOrderJSON) + 1, dataCreate: getDateTransform()}, JSON.parse(lastOrderJSON) + 1)}/>
            <Button className={stylesModal.modal__cancle} text="Cancle" func={handleCancel}/>
          </div>
        </div>
      )
      globalStore.setModalContent(modalContent)
      globalStore.modalOpen()
    }
  }

  useEffect(() => {
    if (globalStore.checkToken) {
      globalStore.getUserInfo()
    } else {
      globalStore.handleLogout()
      navigate("/auth")
    }
  }, [globalStore.isAuthorizate])

  return (
    <main className={styles.main}>
      {globalStore.isAuthorizate && (
        <Container>
          <ButtonBack />
          <h1 className={styles.heading}>Profile</h1>

          <div className={styles.content}>
            {store.isLoading ? (
              <Loader />
            ): (
              <>
                {globalStore.userInfo && (
                  <>
                    <ProfileInfo 
                      avatarUrl=""
                      userName={globalStore.userInfo.name}
                      mail={globalStore.userInfo.mail}
                      handleLogout={globalStore.handleLogout}
                      handleEdit={() => {}}
                    />

                    <ProfileOrders orders={store.orders} handleDeleteOrder={store.deleteOrders} handleRepeatOrder={handleRepeat}/>
                  </>
                )}
              </>
            )}
          </div>
        </Container>
      )}
    </main>
  )
})

export default ProfilePage