import { FC, useEffect, useRef } from "react"
import styles from "./HeaderItem.module.scss"
import { Link } from "react-router"
import { useLocation } from "react-router"
import { THeaderItem } from "@/common/headerItems"

type HeaderItemProps = {
  el: THeaderItem,
  setWidth: React.Dispatch<React.SetStateAction<number | null>>,
  setPositionX: React.Dispatch<React.SetStateAction<number | null>>,
  setActive: (id: number) => void,
  setIsMenuOpen?: () => void
}

const HeaderItem: FC<HeaderItemProps> = ({
  el,
  setWidth,
  setPositionX,
  setActive,
  setIsMenuOpen
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const location = useLocation()

  const handleActiveLink = () => {
    if (!linkRef.current) return
    if (!linkRef.current.parentElement?.parentElement) return
    
    const posEl = linkRef.current.getBoundingClientRect()
    const posParent = linkRef.current.parentElement.parentElement.getBoundingClientRect()

    setWidth(linkRef.current.offsetWidth)
    setPositionX(posEl.left - posParent.left)
  }

  const handleClick = () => {
    if (setIsMenuOpen) setIsMenuOpen()
  }

  useEffect(() => {
    if (location.pathname === "/" && el.id === 1) {
      setActive(1)
      handleActiveLink ()
    } else if (location.pathname === el.href) {
      setActive(el.id)
      handleActiveLink ()
    }
  }, [location.pathname])

  return (
    <li  className={`${styles.item}`}>
      <Link 
        ref={linkRef}
        onClick={handleClick}
        className={`${styles.link} ${el.active && styles.link_active}`} 
        to={el.href}
      >{el.text}</Link>
    </li>
  )
}

export default HeaderItem