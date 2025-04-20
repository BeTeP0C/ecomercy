import { observer } from "mobx-react-lite";
import styles from "./Modal.module.scss"
import Close from "@/components/Icons/Close";
import { useStore } from "@/hooks/useStore";
import { useEffect } from "react";
import ModalContent from "./components/ModalContent";

const Modal = observer(() => {
  const {modalStore} = useStore()

  useEffect(() => {
    if (modalStore.isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [modalStore.isModalOpen])

  return (
    <div className={`${styles.overlay} ${modalStore.isModalOpen && styles.overlay_active}`}>
      <div className={`${styles.modal} ${modalStore.isModalOpen && styles.modal_active}`}>
        <ModalContent type={modalStore.modalType} props={modalStore.modalProps}/>

        <button type="button" className={styles.close} onClick={modalStore.modalClose}>
          <Close />
        </button>
      </div>
    </div>
  )
})

export default Modal