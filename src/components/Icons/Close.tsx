import styles from "./styles.module.scss"
import { IconProps } from "@/types/TIconProps"

function Close ({width = 8, height = 8}: IconProps) {
  return (
    <span className={`${styles.icon} ${styles.close}`}>
      <svg width={width} height={height} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.60352 1L0.603516 7M0.603516 1L6.60352 7" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export default Close
