import { TOrder } from "@/types/TOrder"
import styles from "./ProfileOrders.module.scss"
import { FC } from "react"
import ProfileOrder from "../ProfileOrder/ProfileOrder"
import BlockEmpty from "@/components/UI/BlockEmpty"

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
        <BlockEmpty />
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