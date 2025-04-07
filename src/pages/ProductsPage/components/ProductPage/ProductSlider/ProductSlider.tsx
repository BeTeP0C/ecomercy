import { FC, memo, useMemo, useRef, useState } from "react"
import styles from "./ProductSlider.module.scss"
import ArrowSlide from "@/components/Icons/ArrowSlide"

type ProductSliderProps = {
  slides: React.JSX.Element[],
  type: ("look" | "related")
}

const ProductSlider: FC<ProductSliderProps> = ({slides, type}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const sliderRef = useRef<HTMLUListElement | null>(null)

  const handleNextSlide = () => {
    if (currentIndex === slides.length - 1) return

    setCurrentIndex(prev => prev + 1)
  }

  const handleBackSlide = () => {
    if (currentIndex === 0) return
    setCurrentIndex(prev => prev - 1)
  }

  const translateX = useMemo(() => {
    return `translateX(calc(-${Math.max(0, currentIndex) * (type === "look" ? 100 : 360)}${type === "look" ? "%" : "px"} - ${Math.max(0, currentIndex) * 20}px))`;
  }, [currentIndex, type])

  return (
    <div className={styles.slider}>
      <ul ref={sliderRef} style={{transform: translateX}} className={`${styles.container} ${type === "related" ? styles.container_related : ""}`}>
        {slides.map((Slide, index) => {
          const conditionActive = type === "look" ? index === currentIndex : (index - currentIndex >= 0 && index - currentIndex <=2)

          return (
            <li
              key={index}
              className={`${styles.slide} ${conditionActive ? styles.slide_active : ""}`}
            >
              {Slide}
            </li>
          )
        })}
      </ul>
      <button onClick={handleBackSlide} disabled={currentIndex === 0} type="button" className={`${styles.button} ${styles.button_back}`}>
        <span className={styles.icon}>
          <ArrowSlide />
        </span>
      </button>
      <button onClick={handleNextSlide} disabled={currentIndex === (type === "look" ? slides.length - 1 : slides.length - 3)} type="button" className={`${styles.button} ${styles.button_next}`}>
        <span className={styles.icon}>
          <ArrowSlide />
        </span>
      </button>
    </div>
  )
}

export default memo(ProductSlider)