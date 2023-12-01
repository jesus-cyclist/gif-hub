import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import {
  createPostPath,
  homePagePath,
  loginPagePath,
  postPath,
  profileDataPath,
  registerPagePath,
  settingsPath,
} from '@constants/path'
import CreateNewPost from '@pages/CreateNewPost/CreateNewPost'
import Home from '@pages/Home/Home'
import Login from '@pages/Login/Login'
import PostDetail from '@pages/PostDetail/PostDetail'
import { selectTheme } from '@services/selectors'
import Header from '../Header/Header'
import Modal from '../Modal/Modal'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import styles from './App.module.css'
import { getBackgroundColorClass, getColorClass } from '@utils/theme'
import Settings from '@pages/Settings/Settings'
import ProfileData from '@pages/Settings/ProfileData/ProfileData'
import Register from '@pages/Register/Register'

const App = () => {
  const isDarkModeActive = useSelector(selectTheme)
  const location = useLocation()
  const state = location.state

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: getBackgroundColorClass(isDarkModeActive),
        color: getColorClass(isDarkModeActive),
        caretColor: getColorClass(isDarkModeActive),
      }}
    >
      <div className={styles.app}>
        <Header />
        <Routes location={state?.postDetail || state?.createPost || location}>
          <Route
            path={homePagePath}
            element={<ProtectedRoute component={<Home />} />}
          />
          <Route
            path={settingsPath}
            element={<ProtectedRoute component={<Settings />} />}
          >
            <Route path={profileDataPath} element={<ProfileData />} />
            <Route path={'test'} element={<h2>TETETETET</h2>} />
          </Route>

          <Route
            path={createPostPath}
            element={<ProtectedRoute component={<CreateNewPost />} />}
          />
          <Route
            path={`${postPath}/:id`}
            element={<ProtectedRoute component={<PostDetail />} />}
          />
          <Route
            path={loginPagePath}
            element={
              <ProtectedRoute isAuthOnly={false} component={<Login />} />
            }
          />
          <Route
            path={registerPagePath}
            element={
              <ProtectedRoute isAuthOnly={false} component={<Register />} />
            }
          />
        </Routes>
        {state?.createPost && (
          <Routes>
            <Route
              path={createPostPath}
              element={
                <ProtectedRoute
                  component={
                    <Modal>
                      <CreateNewPost />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
        {state?.postDetail && (
          <Routes>
            <Route
              path={`${postPath}/:id`}
              element={
                <ProtectedRoute
                  component={
                    <Modal>
                      <PostDetail />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        )}
      </div>
    </div>
  )
}

export default App
