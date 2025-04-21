import styles from "./AuthInput.module.scss"
import { ChangeEvent, FC, useState } from "react"
import { IconProps } from "@/types/TIconProps"
import Eye from "@/components/Icons/Eye"
import EyeClose from "@/components/Icons/EyeClose"
import { TInfoFormKeys } from "@/pages/RegistPage/RegistPageStore"
import Info from "@/components/Icons/Info"

type AuthInputProps = {
  value: string,
  setValueAuth?: (value: string) => void,
  setValueRegist?: (value: string, type: TInfoFormKeys) => void,
  Icon: ({ width, height }: IconProps) => React.ReactNode,
  type?: TInfoFormKeys,
  errorMessage?: string,
  placeholder: string,
  passwordLevel?: string | null,
}

const AuthInput: FC<AuthInputProps> = ({
  value, 
  setValueAuth,
  setValueRegist, 
  Icon,
  errorMessage,
  type,
  placeholder,
  passwordLevel,
}) => {
  const [valueInput, setValueInput] = useState<string>(value)
  const [isShow, setIsShow] = useState<boolean>(!(type === "password" || type === "repeatPassword"))
  const isError = errorMessage !== "" && errorMessage !== undefined
  const isPassword = type === "password"

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value

    setValueInput(currentValue)
    if (setValueAuth) setValueAuth(currentValue)
    if (setValueRegist && type) setValueRegist(currentValue, type)
  }

  const handleClickButtonShow = () => {
    setIsShow(prev => !prev)
  }

  return (
    // @ts-ignore
    <label className={`${styles.label} ${isError && styles.label_error} ${isPassword && passwordLevel && styles[`label_${passwordLevel}`]}`} htmlFor={placeholder}>
      <Icon />

      <div className={`${styles.type} ${valueInput !== "" && styles.type_active}`}>{passwordLevel || placeholder}</div> {/* Заголовок инпута */}

      <input 
        onChange={handleChangeInput}
        className={styles.input} 
        id={placeholder} 
        type={isShow ? "text" : "password"} 
        value={valueInput}
      />

      {/* Появление глаза, если это инпут пароля */}
      {(isPassword || type === "repeatPassword") && (
        <button onClick={handleClickButtonShow} className={styles.show} type="button">
          {isShow ? <Eye /> : <EyeClose />}
        </button>
      )}

      {/* Показ ошибки, если это не пароль с содержимым (тогда пропадет) */}
      {isError && (!isPassword || valueInput.length === 0) && (
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

      {/* Показывает уровень пароля */}
      {isPassword && valueInput.length !== 0 && passwordLevel && (
          <>
            <div className={styles.levels}>
              <div className={`${styles.level} ${passwordLevel === "high" && styles.level_high}`}></div>
              <div className={`${styles.level} ${passwordLevel === "medium" ? styles.level_medium : passwordLevel === "high" && styles.level_high}`}></div>
              <div className={`${styles.level} ${passwordLevel === "low" ? styles.level_low : passwordLevel === "medium" ? styles.level_medium : passwordLevel && styles.level_high}`}></div>
            </div>
          </>
      )}
    </label>
  )
}

export default AuthInput