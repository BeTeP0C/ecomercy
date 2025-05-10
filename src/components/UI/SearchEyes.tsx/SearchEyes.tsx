import { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import styles from "./SearchEyes.module.scss"

const SearchEyes = observer(() => {
  const pupilRefLeft = useRef<HTMLDivElement>(null)
  const pupilRefRight = useRef<HTMLDivElement>(null)
  const [isIdle, setIsIdle] = useState(true)
  const lastMoveTime = useRef(Date.now())

  const pupilMaxMove = 8;

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTime.current > 1500) {
        setIsIdle(true)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (event: MouseEvent) => {
    const eyeCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const deltaX = event.clientX - eyeCenter.x
    const deltaY = event.clientY - eyeCenter.y

    const x = Math.min(Math.max(deltaX * 0.05, -pupilMaxMove), pupilMaxMove)
    const y = Math.min(Math.max(deltaY * 0.05, -pupilMaxMove), pupilMaxMove)

    if (pupilRefLeft.current && pupilRefRight.current) {
      pupilRefLeft.current.style.transform = `translate(${x}px, ${y}px)`
      pupilRefRight.current.style.transform = `translate(${x}px, ${y}px)`
    }

    lastMoveTime.current = Date.now()
    setIsIdle(false)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.eye}>
        <div className={styles.lidTop}></div>
        <div
          className={`${styles.pupil} ${isIdle ? styles.idle : ''}`}
          ref={pupilRefLeft}
        >
          <div className={styles.pupilBody}></div>
          <div className={styles.pupilHighlight}></div>
        </div>
        <div className={styles.lidBottom}></div>
      </div>
      <div className={styles.eye}>
        <div className={styles.lidTop}></div>
        <div
          className={`${styles.pupil} ${isIdle ? styles.idle : ''}`}
          ref={pupilRefRight}
        >
          <div className={styles.pupilBody}></div>
          <div className={styles.pupilHighlight}></div>
        </div>
        <div className={styles.lidBottom}></div>
      </div>
    </div>
  )
})

export default SearchEyes
