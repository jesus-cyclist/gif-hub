import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Transition } from 'react-transition-group'
import { ReactComponent as Angle } from '../../../assets/svg/angle.svg'
import { useClickOutSide } from '../../../hooks/useClickOutside'
import { selectTheme } from '../../../services/selectors'
import { getBackgroundColorClass, getBorderClass } from '../../../utils/theme'
import styles from './CustomSelect.module.css'

const CustomSelect = (props) => {
  const isDarkModeActive = useSelector(selectTheme)
  const { options, onChange } = props
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [dropdownOptions, setDropdownOptions] = useState(options.slice(1))
  const [isDropDownActive, setIsDropDownActive] = useState(false)
  const dropdownRef = useRef(null)
  const selectRef = useRef()
  useClickOutSide(selectRef, () => {
    setIsDropDownActive(false)
  })

  const handleShowDropDown = () => {
    setIsDropDownActive(!isDropDownActive)
  }

  const changeSelectedOption = (e) => {
    const selectedOption = options.find(
      (item) => item === e.target.getAttribute('name')
    )
    const dropDownOptions = options.filter(
      (item) => item !== e.target.getAttribute('name')
    )
    setSelectedOption(selectedOption)
    setDropdownOptions(dropDownOptions)
    setIsDropDownActive(false)
    onChange(selectedOption)
  }

  function getTurnAngle() {
    return isDropDownActive ? styles.angleDropDown : styles.angleDropDownActive
  }

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <div
        className={styles.defaultValue}
        onClick={handleShowDropDown}
        style={{ border: getBorderClass(isDarkModeActive) }}
      >
        {selectedOption}
        <div className={getTurnAngle()}>
          <Angle />
        </div>
      </div>

      <Transition timeout={200} in={isDropDownActive} nodeRef={dropdownRef}>
        {(state) => (
          <ul
            className={`${styles.selectList} ${styles[state]}`}
            ref={dropdownRef}
            style={{ border: getBorderClass(isDarkModeActive) }}
          >
            {dropdownOptions.map((item) => (
              <li
                key={item}
                className={styles.selectItem}
                style={{
                  backgroundColor: getBackgroundColorClass(isDarkModeActive),
                }}
              >
                <span
                  className={styles.selectText}
                  onClick={changeSelectedOption}
                  name={item}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Transition>
    </div>
  )
}

export default CustomSelect
