import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as DeleteValue } from '@assets/svg/close-input.svg'
import { getBorderClass } from '@utils/theme'
import styles from './CustomInput.module.css'

const CustomInput = (props) => {
  const {
    value,
    placeholder,
    type,
    onChange,
    name,
    disabled = false,
    deleteValue,
    dataTestId,
  } = props
  const inputRef = useRef(null)
  const { isDarkModeActive } = useSelector((store) => store.rootReducer.theme)

  const handleClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        ref={inputRef}
        value={value ? value : ''}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
        required
        disabled={disabled}
        style={{ border: getBorderClass(isDarkModeActive) }}
        data-test-id={dataTestId}
      ></input>
      <span
        className={
          !!value
            ? `${styles.inputPlaceholderActive} ${styles.inputPlaceholder}`
            : styles.inputPlaceholder
        }
        onClick={handleClick}
      >
        {placeholder}
      </span>
      <div
        className={
          !!value
            ? `${styles.deleteButtonActive} ${styles.deleteButton}`
            : styles.deleteButton
        }
        onClick={deleteValue}
      >
        <DeleteValue />
      </div>
    </div>
  )
}

export default CustomInput
