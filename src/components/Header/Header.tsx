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
import LOCAL_ENDPOINT from "@/config/localEndpoint"

const Header = observer(() => {
  const { globalStore, cartStore } = useStore()

  const store = useLocalObservable(() => new HeaderStore())
  const lineRef = useRef<HTMLDivElement | null>(null)
  
  const [positionX, setPositionX] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isBurgerClose, setIsBurgerClose] = useState<boolean>(false)
  const [isReverse, setIsReverse] = useState<boolean>(false)
  const [width, setWidth] = useState<number | null>(null)

  const handleClickBurgerButton = () => {
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

  const handleCloseMenu = () => {
    setIsReverse(true)
    setIsMenuOpen(false)

    setTimeout(() => {
      setIsReverse(false)
      setIsBurgerClose(false)
    }, 500)
  }

  useEffect(() => {
    if (cartStore.productsCart.length === 0) {
      cartStore.getProductsCart()
    }
  }, [cartStore])

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
                setIsMenuOpen={handleCloseMenu}
              />
            ))}
          </ul>
        </nav>

        <button className={`${styles.burger} ${isReverse ? styles.burger_reverse : ""} ${isBurgerClose ? styles.burger_close : ""}`} type="button" onClick={handleClickBurgerButton}>
          <div className={`${styles.burger__line} ${styles.burger__line_first}`}></div>
          <div className={`${styles.burger__line} ${styles.burger__line_second}`}></div>
          <div className={`${styles.burger__line} ${styles.burger__line_third}`}></div>
        </button>
      </div>
        
        <div className={styles.logo}>
          <Link to={LOCAL_ENDPOINT.MAIN}>
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

          {width !== null && positionX !== null && (
            <div
              ref={lineRef}
              style={{
                width: width + 7,
                left: `${positionX - 3}px`
              }}
              className={styles.line__active}>
            </div>
          )}
        </nav>

        <div className={styles.actions}>
          <button className={styles.header__theme} onClick={globalStore.switchTheme}>

          </button>
          <Link to={LOCAL_ENDPOINT.CART} className={styles.basket}>
            <Basket />
            {cartStore.productsCart.length !== 0 && <span className={styles.amount}>{cartStore.amountProducts}</span>}
          </Link>
          
          <Link to={globalStore.isAuthorizate ? LOCAL_ENDPOINT.PROFILE : LOCAL_ENDPOINT.AUTH} className={styles.person}>
            {globalStore.isAuthorizate ? <Person /> : "Login"}
          </Link>
        </div>
        <div className={styles.line}></div>
      </Container>
      
    </header>
  )
})

export default Header