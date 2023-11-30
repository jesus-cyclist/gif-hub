import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as AddSvg } from '../../assets/svg/add.svg'
import { createPostPath } from '../../constants/path'
import Post from './Post/Post'
import CustomButton from '../UI/CustomButton/CustomButton'
import styles from './PostList.module.css'

const PostList = ({ posts, setFilterTags, filterTags }) => {
  const location = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {posts &&
          posts.map((item) => <Post postData={item} key={item.title} />)}

        <div className={styles.createNewPostButton}>
          <NavLink
            className={styles.buttonWrapper}
            to={createPostPath}
            state={{ createPost: location }}
          >
            <CustomButton
              type={'button'}
              isScalabale={true}
              alignment={'center'}
              icon={<AddSvg height={'30%'} />}
            />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default PostList
