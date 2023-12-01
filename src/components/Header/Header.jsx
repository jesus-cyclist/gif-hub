import React, { createRef } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as Gear } from '@assets/svg/gear.svg'
import { ReactComponent as LogOut } from '@assets/svg/log-out.svg'
import { ReactComponent as Profile } from '@assets/svg/profile.svg'
import { homePagePath, settingsPath } from '@constants/path'
import { logOut } from '@services/reducers/user'
import DropDawn from '../UI/DropDown/DropDown'
import SwitchTheme from '../UI/SwitchTheme/SwitchTheme'
import styles from './Header.module.css'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(logOut())
  }
  const navigate = useNavigate()

  const profileList = [
    {
      title: 'Settings',
      icon: <Gear />,
      ref: createRef(null),
      onClick: () => navigate(settingsPath),
    },
    {
      title: 'Log out',
      onClick: handleLogOut,
      icon: <LogOut />,
      ref: createRef(null),
    },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink className={styles.title} to={homePagePath}>
          GIF
          <div className={styles.titleHub}>hub</div>
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <SwitchTheme />
          </li>
          <li className={styles.navItem}>
            <DropDawn icon={<Profile />} list={profileList} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
