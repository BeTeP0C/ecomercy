import { FC } from "react"
import styles from "./Button.module.scss"

type ButtonProps = {
  text: string,
  func?: () => void,
  className?: string,
  type?: ("default" | "transparent")
}

const Button: FC<ButtonProps> = ({text, func, className = "", type = "default"}) => {

  return (
    <button
      onClick={func}
      className={`${className} ${styles.button} ${type === "transparent" && styles.button_transparent}`}
    >
      {text}
    </button>
  )
}

export default Button