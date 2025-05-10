import { headerItems, THeaderItem } from "@/common/headerItems";
import { action, makeObservable, observable } from "mobx"

class HeaderStore {
  navEl: THeaderItem[] = headerItems;

  constructor () {
    makeObservable(this, {
      navEl: observable,
      setActiveNavEl: action
    })
  }

  setActiveNavEl = (id: number) => {
    this.navEl = this.navEl.map(el => {
      if (el.id === id) {
        return {...el,
          active: true
        }
      }

      return {...el,
        active: false
      }
    })
  }


}

export default HeaderStore