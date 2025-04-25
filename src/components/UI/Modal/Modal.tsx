import { observer } from "mobx-react-lite";
import styles from "./Modal.module.scss"
import Close from "@/components/Icons/Close";
import { useStore } from "@/hooks/useStore";
import { useEffect, useRef } from "react";
import ModalContent from "./components/ModalContent";

const Modal = observer(() => {
  const {modalStore} = useStore()
  const modalRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutModal = (e: MouseEvent) => {
    if (modalRef.current) {
      if (!modalRef.current.contains(e.target as Node)) {
        modalStore.modalClose()

        setTimeout(() => {
          modalStore.modalReset()
        }, 300)
      }
    }
  }

  const handleClickEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      modalStore.modalClose()

      setTimeout(() => {
        modalStore.modalReset()
      }, 300)
    }
  }

  useEffect(() => {
    if (modalStore.isModalOpen) {
      document.body.style.overflow = "hidden"

      document.addEventListener("mousedown", handleClickOutModal)
      document.addEventListener("keydown", handleClickEsc)
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("mousedown", handleClickOutModal)
      document.removeEventListener("keydown", handleClickEsc)
      
    };
  }, [modalStore.isModalOpen])

  return (
    <div className={`${styles.overlay} ${modalStore.isModalOpen && styles.overlay_active}`}>
      <div ref={modalRef} className={`${styles.modal} ${modalStore.isModalOpen && styles.modal_active}`}>
        <ModalContent type={modalStore.modalType} props={modalStore.modalProps}/>

        <button type="button" className={styles.close} onClick={modalStore.modalClose}>
          <Close />
        </button>
      </div>
    </div>
  )
})

export default Modal