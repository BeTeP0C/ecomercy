import LoaderBorder from "../../Icons/LoaderBorder"
import styles from "./Loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderBorder width={100} height={100} type="first"/>
      <LoaderBorder width={80} height={80} type="second"/>
      <LoaderBorder width={60} height={60} type="third"/>
    </div>
  )
}

export default Loader