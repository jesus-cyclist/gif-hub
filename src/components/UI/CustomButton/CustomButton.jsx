import React from 'react'
import styles from './CustomButton.module.css'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../services/selectors'
import { getBorderClass } from '../../../utils/theme'

const CustomButtonSvg = (props) => {
  const isDarkModeActive = useSelector(selectTheme)
  const { onClick, type, label, icon, alignment, extraClass } = props
  const combinedStyles = { ...extraClass }

  return (
    <div type={type} className={`${styles[alignment]} ${styles.wrapper}`}>
      {icon && (
        <button
          className={`${styles.buttonIcon} ${combinedStyles}`}
          style={extraClass}
          onClick={onClick}
        >
          {icon}
        </button>
      )}
      {label && (
        <button
          className={`${styles.buttonLabel} ${combinedStyles}`}
          onClick={onClick}
          style={{ border: getBorderClass(isDarkModeActive) }}
        >
          {label}
        </button>
      )}
    </div>
  )
}

CustomButtonSvg.defaultProps = {
  onClick: null,
  type: null,
  label: null,
  extraClass: null,
}

export default CustomButtonSvg
