import { FC } from "react"
import styles from "./ProfileInfo.module.scss"
import Door from "@/components/Icons/Door"
import Edit from "@/components/Icons/Edit"
import { Link } from "react-router"

type ProfileInfoProps = {
  avatarUrl: string,
  userName: string,
  mail: string,
  handleLogout: () => void,
  handleEdit: () => void
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  avatarUrl,
  userName,
  mail,
  handleLogout,
  handleEdit
}) => {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <img className={styles.img} src={avatarUrl || "../../../../../public/avatar.jpg"} alt="Avatar user" />
        <h2 className={styles.username}>{userName}</h2>
        <span className={styles.mail}>{mail}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={handleLogout} className={`${styles.profile__button} ${styles.profile__button_logout}`}>
          <Door width={12} height={12} />
          Logout
        </button>
        <Link to={"/settings"} onClick={handleEdit} className={`${styles.profile__button} ${styles.profile__button_edit}`}>
          <Edit width={12} height={12} />
          Edit
        </Link>
      </div>
    </div>
  )
}

export default ProfileInfo