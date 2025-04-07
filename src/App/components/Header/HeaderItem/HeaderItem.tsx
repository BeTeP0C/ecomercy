import { FC, MouseEvent, useEffect, useRef } from "react"
import styles from "./HeaderItem.module.scss"
import { Link } from "react-router"

type HeaderItemProps = {
  el: {
    id: number,
    active: boolean,
    text: string,
    href: string,
  }
  setWidth: React.Dispatch<React.SetStateAction<number>>,
  setPositionX: React.Dispatch<React.SetStateAction<number>>,
  setActive: (id: number) => void
}

const HeaderItem: FC<HeaderItemProps> = ({
  el,
  setWidth,
  setPositionX,
  setActive
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  const handleClickLink = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    setActive(el.id)
  } 

  useEffect(() => {
    if (!linkRef.current) return

    if (el.active) {
      const pos = linkRef.current.getBoundingClientRect()

      setWidth(linkRef.current.offsetWidth)
      setPositionX(pos.left)
    }
  }, [el.active])

  return (
    <li  className={`${styles.item}`}>
      <Link 
        ref={linkRef}
        onClick={handleClickLink}
        className={`${styles.link} ${el.active ? styles.link_active : ""}`} 
        to={el.href}
      >{el.text}</Link>
    </li>
  )
}

export default HeaderItem