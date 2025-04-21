import styles from "./ModalContent.module.scss"
import { FC } from "react"
import ModalTitle from "../ModalTitle"
import ModalProductPrice from "../ModalProductPrice"
import { TModalMap, TModalType } from "@/types/TModal"
import Button from "@/components/UI/Button"

type ModalContentProps = {
  type: TModalType | "",
  props: TModalMap[TModalType] | null
}

const ModalContent: FC<ModalContentProps> = ({type, props}) => {
  let content: React.ReactNode | null = null;
  
  if (props) {
    switch (type) {
      case "payment":
        content = (
          <>
            <ModalTitle title="Payment"/>
            <ModalProductPrice {...props as TModalMap["payment"]}/>
            <div className={styles.actions}>
              <Button className={styles.button__payment} text="Payment" func={props.onPayment}/>
              <Button type="transparent" text="Close" func={props.onClose} />
            </div>
          </>
        )
    }
  }
  
  return (
    <div className={styles.content}>{content}</div>
  )
}

export default ModalContent