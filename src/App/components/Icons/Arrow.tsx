import styles from "./styles.module.scss"
import { IconProps } from "../../../types/TIconProps"

function Arrow ({width = 24, height = 24}: IconProps) {
  return (
    <span className={`${styles.icon} ${styles.arrow}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    </span>
  )
}

export default Arrow
