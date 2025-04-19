import { TOrder } from "@/types/TOrder"
import styles from "./ProfileOrders.module.scss"
import { FC } from "react"
import ProfileOrder from "../ProfileOrder/ProfileOrder"
import SearchEyes from "@/components/UI/SearchEyes.tsx/SearchEyes"

type ProfileOrdersProps = {
  orders: TOrder[],
  handleDeleteOrder: (id: number) => void,
  handleRepeatOrder: (id: number) => void,
}

const ProfileOrders: FC<ProfileOrdersProps> = ({orders, handleDeleteOrder, handleRepeatOrder}) => {
  const isEmpty = orders.length === 0

  return (
    <div className={styles.content}>
      <h2 className={styles.heading}>Orders</h2>

      {isEmpty ? (
        <div className={styles.empty}>
          <SearchEyes />
          <h3 className={styles.title}>It's empty here for now...</h3>
        </div>
      ): (
        <ul className={styles.list}>
          {orders.map(order => (
            <ProfileOrder key={order.id} order={order} handleDeleteOrder={handleDeleteOrder} handleRepeatOrder={handleRepeatOrder}/>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileOrders