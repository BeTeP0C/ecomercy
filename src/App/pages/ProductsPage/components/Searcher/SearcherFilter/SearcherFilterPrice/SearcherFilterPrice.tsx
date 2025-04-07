import { ChangeEvent, Dispatch, FC, FocusEvent, KeyboardEvent, SetStateAction, useState } from "react"
import styles from "./styles.module.scss"

type SearcherFilterPriceProps = {
  funcStart: (value: number) => void,
  funcEnd: (value: number) => void,
  min: number,
  max: number
}

const SearcherFilterPrice: FC<SearcherFilterPriceProps> = ({funcStart, funcEnd, min, max}) => {
  const [valueMin, setValueMin] = useState<string>(min.toString());
  const [valueMax, setValueMax] = useState<string>(max.toString());

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: Dispatch<SetStateAction<string>>,
  ) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];

    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleBlurInputMin = (e: FocusEvent<HTMLInputElement, Element>) => {
    const valueNum = Number(e.target.value);
    funcStart(valueNum)
  };

  const handleBlurInputMax = (e: FocusEvent<HTMLInputElement, Element>) => {
    const valueNum = Number(e.target.value);

    funcEnd(valueNum)

    if (Number(valueMin) >= valueNum && Number(valueMin) !== 0) {
      setValueMin((valueNum - 1).toString());
      funcStart(valueNum - 1);
    }
  };

  return (
    <div className={styles.price}>
      <h3 className={styles.title}>Price: </h3>

      <div>
        <input
          onChange={(e) => handleChangeInput(e, setValueMin)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlurInputMin}
          className={`${styles.input} ${styles.input_start}`}
          type="text"
          placeholder="from"
          value={valueMin}
        />
        <input
          onChange={(e) => handleChangeInput(e, setValueMax)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlurInputMax}
          className={styles.input}
          type="text"
          placeholder="to"
          value={valueMax}
        />
      </div>
    </div>
  )
}

export default SearcherFilterPrice