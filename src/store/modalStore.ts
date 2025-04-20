import { action, makeObservable, observable } from "mobx";
import { RootStore } from "./rootStore";
import { TModalMap, TModalType } from "@/types/TModal";

class ModalStore {
  rootStore: RootStore
  isModalOpen: boolean = false
  modalType: TModalType | "" = "" 
  modalProps: TModalMap[TModalType] | null = null
  
  constructor (rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      isModalOpen: observable,
      modalType: observable,
      modalProps: observable,
      modalOpen: action,
      modalClose: action,
      modalReset: action,
    })
  }

  modalOpen = <K extends TModalType>(type: K, props: TModalMap[K]) => {
    this.modalType = type
    this.modalProps = props
    this.isModalOpen = true
  }

  modalClose = () => {
    this.isModalOpen = false;
  }

  modalReset = () => {
    this.modalType = '';
    this.modalProps = null;
  }
}

export default ModalStore