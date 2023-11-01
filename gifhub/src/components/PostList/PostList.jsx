import React, { createRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import uniqid from 'uniqid'
import { ReactComponent as AddSvg } from '../../assets/svg/add.svg'
import { createCollectionPath } from '../../constants/path'
import { selectUser } from '../../services/selectors'
import Post from '../Post/Post'
import CustomButton from '../UI/CustomButton/CustomButton'
import styles from './PostList.module.css'

const PostList = () => {
  const user = useSelector(selectUser)
  const location = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <TransitionGroup component={null}>
          {user.posts.map((item) => (
            <CSSTransition
              key={item.title}
              timeout={500}
              classNames={'post'}
              nodeRef={createRef()}
            >
              <Post postData={item} />
            </CSSTransition>
          ))}
        </TransitionGroup>
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
    </div>
  )
}

export default PostList
