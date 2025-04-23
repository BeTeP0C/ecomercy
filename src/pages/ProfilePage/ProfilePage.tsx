import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./ProfilePage.module.scss"
import Container from "@/components/UI/Container"
import ButtonBack from "@/components/UI/ButtonBack"
import ProfileInfo from "./components/ProfileInfo"
import { useStore } from "@/hooks/useStore"
import ProfilePageStore from "./ProfilePageStore"
import ProfileOrders from "./components/ProfileOrders"
import Loader from "@/components/UI/Loader"
import { TOrder } from "@/types/TOrder"
import localStorageStore from "@/utils/localStorageStore"
import getDateTransform from "@/utils/getDateTransform"
import useCheckAuthrizate from "@/hooks/useCheckAuthorizate"
import { useCallback } from "react"

const ProfilePage = observer(() => {
  const { globalStore, modalStore } = useStore()
  const store = useLocalObservable(() => new ProfilePageStore (globalStore))

  const handlePayment = useCallback((order: TOrder, lastOrder: number) => {
    store.addOrders(order)
    localStorageStore.safeLocalStorageSet("last_order", JSON.stringify(lastOrder))
    modalStore.modalClose()
    setTimeout(modalStore.modalReset, 300)
  }, [store])

  const handleRepeat = useCallback((id: number) => {
    const currentOrder = store.orders.find(order => order.id === id)
    const lastOrderJSON = localStorageStore.safeLocalStorageGet("last_order")

    if (currentOrder && lastOrderJSON) {
      modalStore.modalOpen("payment", {
        price: currentOrder.price, 
        onPayment: () => handlePayment({...currentOrder, id: JSON.parse(lastOrderJSON) + 1, dataCreate: getDateTransform()}, JSON.parse(lastOrderJSON) + 1),
        onClose: handleCancel
      })
    }
  }, [store])

  const handleCancel = () => {
    modalStore.modalClose()
  }

  useCheckAuthrizate()

  return (
    <main className={styles.main}>
      {globalStore.isAuthorizate && (
        <Container>
          <ButtonBack />
          <h1 className={styles.heading}>Profile</h1>

          <div className={styles.content}>
            {globalStore.isLoading ? (
              <Loader />
            ): (
              <>
                {globalStore.userInfo && (
                  <>
                    <ProfileInfo 
                      avatarUrl={globalStore.userInfo.avatar}
                      userName={globalStore.userInfo.name}
                      mail={globalStore.userInfo.mail}
                      handleLogout={globalStore.handleLogout}
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