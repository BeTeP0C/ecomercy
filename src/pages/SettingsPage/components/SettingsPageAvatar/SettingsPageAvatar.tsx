import Photo from "@/components/Icons/Photo"
import styles from "./SettingsPageAvatar.module.scss"
import { FC, useRef, useState } from "react"

type SettingsPageAvatarProps = {
  avatarUrl: string,
  func: (value: File) => any
}

const SettingsPageAvatar: FC<SettingsPageAvatarProps> = ({avatarUrl, func}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(avatarUrl)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = () => {
    setPreview(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      func(file)
    }
  }
  
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <h2 className={styles.title}>Avatar</h2>
        <p className={styles.descr}>This image will be in your profile.</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.avatar}>
          <img className={styles.img} src={preview || "../../../../../public/avatar"} alt="" />
          <div className={styles.overlay}></div>
          <Photo />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />

        <div className={styles.actions__buttons}>
          <button onClick={handleClick} type="button" className={`${styles.button} ${styles.button_update}`}>Update</button>
          <button onClick={handleDelete} type="button" className={`${styles.button} ${styles.button_delete}`}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPageAvatar