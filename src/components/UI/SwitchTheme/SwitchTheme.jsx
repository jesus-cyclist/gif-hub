import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Moon } from '../../../assets/svg/moon.svg'
import { ReactComponent as Sun } from '../../../assets/svg/sun.svg'
import { changeTheme } from '../../../services/reducers/theme'
import styles from './SwitchTheme.module.css'

const SwitchTheme = () => {
  const { isDarkModeActive } = useSelector((store) => store.rootReducer.theme)
  const dispatch = useDispatch()

  const handleCheckboxChange = () => {
    dispatch(changeTheme())
  }

  return (
    <div className={styles.wrapper}>
      <div className={isDarkModeActive ? styles.modeSun : styles.modeSunActive}>
        <Sun />
      </div>
      <label className={styles.switch}>
        <input
          className={styles.checkbox}
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <span className={styles.slider} />
      </label>
      <div
        className={isDarkModeActive ? styles.modeDarkActive : styles.modeDark}
      >
        <Moon />
      </div>
    </div>
  )
}

export default SwitchTheme
