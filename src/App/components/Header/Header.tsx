import { observer } from "mobx-react-lite"
import Logo from "../Icons/Logo"
import Container from "../UI/Container"
import styles from "./Header.module.scss"
import { useStore } from "../../../hooks/useStore"
import { Link } from "react-router"
import Basket from "../Icons/Basket"
import Person from "../Icons/Person"
import { useState } from "react"
import HeaderItem from "./HeaderItem"

const Header = observer(() => {
  const { globalStore } = useStore()
  const [positionX, setPositionX] = useState<number>(0)
  const [width, setWidth] = useState<number>(73)

  return (
    <header className={styles.header}>
      <Container className={styles.header__container}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {globalStore.navEl.map(el => (
              <HeaderItem 
                key={el.id} 
                el={el}
                setPositionX={setPositionX}
                setWidth={setWidth}
                setActive={globalStore.setNavEl}
              />
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to={"/"} className={styles.basket}>
            <Basket />
          </Link>
          
          <Link to={"/profile"} className={styles.person}>
            <Person />
          </Link>
        </div>
      </Container>
      <div className={styles.line}>
        <div
          style={{
            width: width + 7,
            left: `${positionX - 3}px`
          }}
          className={styles.line__active}></div>
      </div>
    </header>
  )
})

export default Header