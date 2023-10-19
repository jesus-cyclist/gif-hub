import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import uniqid from 'uniqid'
import { ReactComponent as AddSvg } from '../../assets/svg/add.svg'
import { createCollectionPath } from '../../constants/path'
import Post from '../Post/Post'
import CustomButton from '../UI/CustomButton/CustomButton'
import styles from './PostList.module.css'

const PostList = (props) => {
  const { posts } = props
  const location = useLocation()

  console.log(posts)

  return (
    <div className={styles.list}>
      {posts.map((item) => (
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
