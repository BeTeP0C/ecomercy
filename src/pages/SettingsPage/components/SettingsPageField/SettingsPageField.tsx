import { ChangeEvent, FC } from "react"
import styles from "./styles.module.scss"
import Info from "@/components/Icons/Info"
import { TSettingsInfoKeys } from "../../SettingsPageStore"
import uppercaseFirstSymbol from "@/utils/uppercaseFirstSymbol"

type SettingsPageFieldProps = {
  title: string,
  value: string,
  placeholder: string,
  func: (value: string, type: TSettingsInfoKeys) => void,
  errorMessage: string,
  type: TSettingsInfoKeys,
  passwordLevel?: string | null,
}

const SettingsPageField: FC<SettingsPageFieldProps> = ({
  title, 
  value,
  placeholder, 
  func, 
  errorMessage,
  type,
  passwordLevel
}) => {
  const isPassword = type === "password"
  const isError = errorMessage !== "" && !isPassword

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value

    func(currentValue, type)
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      // @ts-ignore
      <label className={`${styles.label} ${isPassword && styles.label_password} ${isError && styles.label_error} ${isPassword && passwordLevel && styles[`label_${passwordLevel}`]}`} htmlFor={`settings_${title}`}>
        <input id={`settings_${title}`} onChange={handleChangeInput} className={`${styles.input} ${isPassword && styles.input_password}`} value={value} type="text" placeholder={placeholder} />

        {isError && (
          <div className={styles.error}>
            <Info />
            <div className={styles.message}>
              {errorMessage}

              <svg className={styles.error__arrow} width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3L1.5 0.5H7.5L4.5 3Z" fill="#AF0808" stroke="#AF0808"/>
              </svg>
            </div>
          </div>
        )}

        {isPassword && (
          <>
            <div className={styles.levels}>
              <div className={`${styles.level} ${passwordLevel === "high" && styles.level_high}`}></div>
              <div className={`${styles.level} ${passwordLevel === "medium" ? styles.level_medium : passwordLevel === "high" && styles.level_high}`}></div>
              <div className={`${styles.level} ${passwordLevel === "low" ? styles.level_low : passwordLevel === "medium" ? styles.level_medium : passwordLevel && styles.level_high}`}></div>
            </div>
            // @ts-ignore
            {value !== "" && <div className={`${styles.level__title} ${styles[`level__title_${passwordLevel}`]}`}>{uppercaseFirstSymbol(passwordLevel || "")}</div>} 
          </>
        )}
      </label>

    </div>
  )
}

export default SettingsPageField