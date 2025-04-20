import { observer, useLocalObservable } from "mobx-react-lite"
import Logo from "../Icons/Logo"
import Container from "../UI/Container"
import styles from "./Header.module.scss"
import { useStore } from "../../hooks/useStore"
import { Link } from "react-router"
import Basket from "../Icons/Basket"
import Person from "../Icons/Person"
import { useEffect, useRef, useState } from "react"
import HeaderItem from "./HeaderItem"
import HeaderStore from "./HeaderStore"

const Header = observer(() => {
  const { globalStore, cartStore } = useStore()
  const store = useLocalObservable(() => new HeaderStore())
  const lineRef = useRef<HTMLDivElement | null>(null)
  const [positionX, setPositionX] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isBurgerClose, setIsBurgerClose] = useState<boolean>(false)
  const [isReverse, setIsReverse] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(73)

  useEffect(() => {
    if (cartStore.productsCart.length === 0) {
      cartStore.getProductsCart()
    }
  }, [])

  const handleClickBurderButton = () => {
    if (isBurgerClose) {
      setIsReverse(true)
      setIsMenuOpen(false)
      setTimeout(() => {
        setIsReverse(false)
        setIsBurgerClose(false)
      }, 500)
    } else {
      setIsMenuOpen(true)
      setIsBurgerClose(true)
    }
  }

  return (
    <header className={styles.header}>
      <Container className={styles.header__container}>
        
      <div className={`${styles.menu}`}>
        <nav className={`${styles.nav} ${styles.menu__nav} ${isMenuOpen ? styles.menu__nav_active : ""}`}>
          <ul className={`${styles.list} ${styles.menu__list}`}>
            {store.navEl.map(el => (
              <HeaderItem 
                key={el.id} 
                el={el}
                setPositionX={setPositionX}
                setWidth={setWidth}
                setActive={store.setActiveNavEl}
              />
            ))}
          </ul>
        </nav>

        <button className={`${styles.burger} ${isReverse ? styles.burger_reverse : ""} ${isBurgerClose ? styles.burger_close : ""}`} type="button" onClick={handleClickBurderButton}>
          <div className={`${styles.burger__line} ${styles.burger__line_first}`}></div>
          <div className={`${styles.burger__line} ${styles.burger__line_second}`}></div>
          <div className={`${styles.burger__line} ${styles.burger__line_third}`}></div>
        </button>
      </div>
        
        <div className={styles.logo}>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {store.navEl.map(el => (
              <HeaderItem 
                key={el.id} 
                el={el}
                setPositionX={setPositionX}
                setWidth={setWidth}
                setActive={store.setActiveNavEl}
              />
            ))}
          </ul>
          <div
            ref={lineRef}
            style={{
              width: width + 7,
              left: `${positionX - 3}px`
            }}
            className={styles.line__active}>
          </div>
        </nav>

        <div className={styles.actions}>
          <Link to={"/cart"} className={styles.basket}>
            <Basket />
            {cartStore.productsCart.length !== 0 && <span className={styles.amount}>{cartStore.amountProducts}</span>}
          </Link>
          
          <Link to={globalStore.isAuthorizate ? "/profile" : "/auth"} className={styles.person}>
            {globalStore.isAuthorizate ? <Person /> : "Login"}
          </Link>
        </div>
        <div className={styles.line}></div>
      </Container>
      
    </header>
  )
})

export default Header