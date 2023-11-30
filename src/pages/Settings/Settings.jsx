import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { profileDataPath } from '../../constants/path'
import styles from './Settings.module.css'

const Settings = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.settingsNav}>
        <ul className={styles.settingsList}>
          <li className={styles.settingsListItem}>
            <NavLink to={profileDataPath}>Profile data</NavLink>
          </li>
          <li className={styles.settingsListItem}>
            <NavLink to={'test'}>Test</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Settings
