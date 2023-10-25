import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomInput.module.css'

const CustomInput = (props) => {
  const { values, placeholder, type, onChange, name, disabled = false } = props
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        ref={inputRef}
        value={values ? values : ''}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
        required
        disabled={disabled}
      ></input>
      <span
        className={
          !!values
            ? `${styles.inputPlaceholderActive} ${styles.inputPlaceholder}`
            : styles.inputPlaceholder
        }
        onClick={handleClick}
      >
        {placeholder}
      </span>
    </div>
  )
}

export default CustomInput
