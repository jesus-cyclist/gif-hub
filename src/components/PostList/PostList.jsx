import update from 'immutability-helper'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as AddSvg } from '../../assets/svg/add.svg'
import { createPostPath } from '../../constants/path'
import CustomButton from '../UI/CustomButton/CustomButton'
import Post from './Post/Post'
import styles from './PostList.module.css'

const PostList = ({ posts, setFilterTags, filterTags }) => {
  const location = useLocation()
  const [postList, setPostList] = useState(posts)

  useEffect(() => {
    setPostList(posts)
  }, [posts])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setPostList((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    )
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {postList &&
          postList.map(
            (item, index) =>
              item && (
                <Post
                  postData={item}
                  key={item.title}
                  moveCard={moveCard}
                  index={index}
                />
              )
          )}

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
