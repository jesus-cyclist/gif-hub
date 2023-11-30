import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Transition } from 'react-transition-group'
import { useClickOutSide } from '../../../hooks/useClickOutside'
import { selectTheme } from '../../../services/selectors'
import { getBackgroundColorClass } from '../../../utils/theme'
import CustomButton from '../CustomButton/CustomButton'
import styles from './DropDown.module.css'

const DropDown = (props) => {
  const isDarkModeActive = useSelector(selectTheme)
  const { icon, list } = props
  const dropDownRef = useRef(null)
  const menuRef = useRef(null)
  const [isDropDownActive, setIsDropDownActive] = useState(false)

  useClickOutSide(dropDownRef, () => {
    if (isDropDownActive) setIsDropDownActive(false)
  })

  const handleDropDown = () => {
    setIsDropDownActive(!isDropDownActive)
  }

  return (
    <div className={styles.container} ref={dropDownRef}>
      <CustomButton
        type={'button'}
        icon={icon}
        isScalabale={false}
        onClick={handleDropDown}
      />
      <Transition timeout={300} in={isDropDownActive} nodeRef={menuRef}>
        {(state) => (
          <nav className={`${styles.menu} ${styles[state]}`} ref={menuRef}>
            <ul className={styles.menuList}>
              {list.map((item) => (
                <li
                  className={styles.menuItem}
                  key={item.title}
                  onClick={(e) => {
                    setIsDropDownActive(false)
                    item.onClick(e)
                  }}
                  style={{
                    backgroundColor: getBackgroundColorClass(isDarkModeActive),
                  }}
                >
                  {item.icon}
                  <span className={styles.itemText}>{item.title}</span>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Transition>
    </div>
  )
}

export default DropDown
