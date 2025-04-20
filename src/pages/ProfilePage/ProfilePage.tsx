import { observer, useLocalObservable } from "mobx-react-lite"
import styles from "./ProfilePage.module.scss"
import Container from "@/components/UI/Container"
import ButtonBack from "@/components/UI/ButtonBack"
import ProfileInfo from "./components/ProfileInfo"
import { useStore } from "@/hooks/useStore"
import ProfilePageStore from "./ProfilePageStore"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import ProfileOrders from "./components/ProfileOrders"
import Loader from "@/components/UI/Loader"
import { TOrder } from "@/types/TOrder"
import { getDateTransform } from "@/utils/getDateTransform"
import localStorageStore from "@/utils/localStorageStore"

const ProfilePage = observer(() => {
  const { globalStore, modalStore } = useStore()
  const navigate = useNavigate()
  const store = useLocalObservable(() => new ProfilePageStore (globalStore))

  const handlePayment = (order: TOrder, lastOrder: number) => {
    store.addOrders(order)
    localStorageStore.safeLocalStorageSet("last_order", JSON.stringify(lastOrder))
    modalStore.modalClose()
    setTimeout(modalStore.modalReset, 300)
  }

  const handleCancel = () => {
    modalStore.modalClose()
  }

  const handleRepeat = (id: number) => {
    const currentOrder = store.orders.find(order => order.id === id)
    const lastOrderJSON = localStorageStore.safeLocalStorageGet("last_order")

    if (currentOrder && lastOrderJSON) {
      modalStore.modalOpen("payment", {price: currentOrder.price, 
        onPayment: () => handlePayment({...currentOrder, id: JSON.parse(lastOrderJSON) + 1, dataCreate: getDateTransform()}, JSON.parse(lastOrderJSON) + 1),
        onClose: handleCancel
      })
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