import { FC, useEffect, useState } from "react"
import styles from "./SearcherInput.module.scss"
import { TSetFilterField } from "@/pages/ProductsPage/ProductsPageStore"

type SearcherInputProps = {
  func: TSetFilterField,
  valueStore: string
}

const SearcherInput: FC<SearcherInputProps> = ({
  func,
  valueStore
}) => {
  const [value, setValue] = useState<string>(valueStore)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleBlurInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    func("title", e.target.value)
  }

  useEffect(() => {
    setValue(valueStore)
  }, [valueStore])

  return (
    <input 
      className={styles.input}
      onChange={handleChangeInput}
      onBlur={handleBlurInput}
      type="text" 
      value={value}
      placeholder="Search product"
    />
  )
}

export default SearcherInput