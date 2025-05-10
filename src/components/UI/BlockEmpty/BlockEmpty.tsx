import SearchEyes from "../SearchEyes.tsx"
import styles from "./BlockEmpty.module.scss"

const BlockEmpty = () => {
  return (
    <div className={styles.empty}>
      <SearchEyes />
      <h3 className={styles.title}>It's empty here for now...</h3>
    </div>
  )
}

export default BlockEmpty