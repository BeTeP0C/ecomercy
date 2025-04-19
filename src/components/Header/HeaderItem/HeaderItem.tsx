import { FC, MouseEvent, useCallback, useEffect, useRef } from "react"
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

  const handleClickLink = useCallback((e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    setActive(el.id)
  }, [el.id])

  useEffect(() => {
    if (!linkRef.current) return
    if (!linkRef.current.parentElement?.parentElement) return

    if (el.active) {
      const posEl = linkRef.current.getBoundingClientRect()
      const posParent = linkRef.current.parentElement.parentElement.getBoundingClientRect()

      setWidth(linkRef.current.offsetWidth)
      setPositionX(posEl.left - posParent.left)
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