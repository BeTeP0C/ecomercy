import { FC } from "react"
import styles from "./Button.module.scss"

type ButtonProps = {
  text: string,
  func: () => void,
  className?: string,
}

const Button: FC<ButtonProps> = ({text, func, className = ""}) => {

  return (
    <button
      onClick={func}
      className={`${styles.button} ${className}`}
    >
      {text}
    </button>
  )
}

export default Button