import { FC } from "react";
import { TPasswordCorrect } from "../../RegistPageStore"
import styles from "./PasswordLevel.module.scss"
import uppercaseFirstSymbol from "@/utils/uppercaseFirstSymbol";

type PasswordLevelProps = {
  level: TPasswordCorrect | null;
}

const PasswordLevel: FC<PasswordLevelProps> = ({level}) => {
  return (
    <>
      {level && (
        <div className={styles.content}>
          <span className={`${styles.title} ${styles[`title_${level}`]}`}>{uppercaseFirstSymbol(level)}</span>

          <div className={`${styles.level} ${level === "low" ? styles.level_low : level === "medium" ? styles.level_medium : styles.level_high}`}></div>
          <div className={`${styles.level} ${level === "medium" ? styles.level_medium : level === "high" && styles.level_high}`}></div>
          <div className={`${styles.level} ${level === "high" && styles.level_high}`}></div>
        </div>
      )}
    </>
  )
}

export default PasswordLevel