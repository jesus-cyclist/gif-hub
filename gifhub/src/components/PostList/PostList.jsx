import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import uniqid from 'uniqid'
import { ReactComponent as AddSvg } from '../../assets/svg/add.svg'
import { createCollectionPath } from '../../constants/path'
import Post from '../Post/Post'
import CustomButton from '../UI/CustomButton/CustomButton'
import styles from './PostList.module.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../services/selectors'

const PostList = () => {
  const user = useSelector(selectUser)
  const location = useLocation()

  // useEffect(() => {
  //   setPosts(user.posts)
  // }, [user])

  return (
    <div className={styles.list}>
      {user.posts.map((item) => (
        <Post key={uniqid()} postData={item} />
      ))}
      <NavLink
        className={styles.buttonWrapper}
        to={createCollectionPath}
        state={{ createCollection: location }}
      >
        <CustomButton
          type={'button'}
          isScalabale={true}
          alignment={'center'}
          icon={<AddSvg height={'30%'} />}
        />
      </NavLink>
    </div>
  )
}

export default PostList
