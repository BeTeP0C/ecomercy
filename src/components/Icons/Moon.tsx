import styles from "./styles.module.scss"
import { IconProps } from "@/types/TIconProps"

function Moon ({width = 24, height = 24}: IconProps) {
  return (
    <span className={`${styles.icon} ${styles.moon}`}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4101 13.28C7.33206 10.205 6.71606 5.693 8.35706 2C7.12706 2.41 6.10106 3.23 5.07606 4.256C4.10128 5.22282 3.32758 6.37307 2.79959 7.6404C2.27159 8.90774 1.99976 10.2671 1.99976 11.64C1.99976 13.0129 2.27159 14.3723 2.79959 15.6396C3.32758 16.9069 4.10128 18.0572 5.07606 19.024C9.17806 23.126 15.5361 22.921 19.6381 18.819C20.6641 17.793 21.4841 16.768 21.8941 15.537C17.9981 16.973 13.4851 16.357 10.4081 13.281" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export default Moon
