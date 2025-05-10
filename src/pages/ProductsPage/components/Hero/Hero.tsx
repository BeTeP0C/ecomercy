import Container from "@/components/UI/Container"
import styles from "./Hero.module.scss"

const Hero = () => {
  return (
    <section className={styles.section}>
      <Container >
        <div className={styles.main}>
          <h1 className={styles.heading}>Products</h1>
          <p className={styles.descr}>
            We display products based on the latest products we have, if you want
            to see our old products please enter the name of the item
          </p>
        </div>
      </Container>
    </section>
  )
}

export default Hero