import styles from "./styles.module.scss"
import { IconProps } from "../../../types/TIconProps"

function ArrowBack ({width = 32, height = 32}: IconProps) {
  return (
    <span className={`${styles.icon} ${styles.arrowback}`}>
      <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export default ArrowBack
