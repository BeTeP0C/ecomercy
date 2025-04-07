import { observer } from "mobx-react-lite";
import styles from "./Modal.module.scss"
import Close from "@/components/Icons/Close";
import { useStore } from "@/hooks/useStore";
import { useEffect } from "react";

const Modal = observer(() => {
  const {globalStore} = useStore()

  useEffect(() => {
    if (globalStore.isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [globalStore.isModalOpen])

  return (
    <div className={`${styles.overlay} ${globalStore.isModalOpen && styles.overlay_active}`}>
      <div className={`${styles.modal} ${globalStore.isModalOpen && styles.modal_active}`}>
        {globalStore.modalContent}

        <button type="button" className={styles.close} onClick={globalStore.modalClose}>
          <Close />
        </button>
      </div>
    </div>
  )
})

export default Modal