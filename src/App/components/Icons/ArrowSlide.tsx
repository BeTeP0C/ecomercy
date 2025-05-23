import styles from "./styles.module.scss"
import { IconProps } from "../../../types/TIconProps"

function ArrowSlide ({width = 31, height = 31}: IconProps) {
  return (
    <span className={`${styles.icon} ${styles.arrow_slide}`}>
      <svg width={width} height={height} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export default ArrowSlide
