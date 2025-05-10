import { FC, ReactNode } from "react"
import styles from "./Container.module.scss"

type ContainerProps = {
  children: ReactNode,
  className?: string,
}

const Container: FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}

export default Container