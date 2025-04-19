import styles from "./styles.module.scss"
import { IconProps } from "@/types/TIconProps"

function Photo ({width = 38, height = 38}: IconProps) {
  return (
    <span className={`${styles.icon} ${styles.photo}`}>
      <svg width={width} height={height} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.846 6.69531H15.1537L11.3075 11.3107H6.69216C5.87611 11.3107 5.09348 11.6349 4.51644 12.2119C3.93941 12.7889 3.61523 13.5716 3.61523 14.3876V28.2338C3.61523 29.0498 3.93941 29.8325 4.51644 30.4095C5.09348 30.9865 5.87611 31.3107 6.69216 31.3107H31.3075C32.1236 31.3107 32.9062 30.9865 33.4833 30.4095C34.0603 29.8325 34.3845 29.0498 34.3845 28.2338V14.3876C34.3845 13.5716 34.0603 12.7889 33.4833 12.2119C32.9062 11.6349 32.1236 11.3107 31.3075 11.3107H26.6922L22.846 6.69531Z" stroke="white" strokeWidth="3.07692" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.0002 25.1538C21.5492 25.1538 23.6155 23.0875 23.6155 20.5384C23.6155 17.9894 21.5492 15.9231 19.0002 15.9231C16.4511 15.9231 14.3848 17.9894 14.3848 20.5384C14.3848 23.0875 16.4511 25.1538 19.0002 25.1538Z" stroke="white" strokeWidth="3.07692" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export default Photo
