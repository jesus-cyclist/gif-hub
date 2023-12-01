import serverService from '@api/ServerService'
import { ReactComponent as ArrowLeft } from '@assets/svg/arrow-left-o.svg'
import { ReactComponent as ArrowRight } from '@assets/svg/arrow-right-o.svg'
import { ReactComponent as FullScreenButton } from '@assets/svg/more-o.svg'
import { ReactComponent as Trash } from '@assets/svg/trash.svg'
import { postPath } from '@constants/path'
import { useFetching } from '@hooks/useFetching'
import { addFilterTag, deleteFilterTag } from '@services/reducers/filterTags'
import { deletePost } from '@services/reducers/user'
import { selectTheme, selectUser } from '@services/selectors'
import {
  getBackgroundColorClass,
  getBorderClass,
  getColorClass,
} from '@utils/theme'
import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import CustomButton from '../../UI/CustomButton/CustomButton'
import FormattedDate from '../../UI/FormattedDate/FormattedDate'
import HashPanel from '../../UI/HashPanel/HashPanel'
import styles from './Post.module.css'

const Post = (props) => {
  const { postData, moveCard, index } = props
  const { gifs, title, _id, createdAt, hashtags } = postData

  const user = useSelector(selectUser)
  const isDarkModeActive = useSelector(selectTheme)
  const [isComponentMounted, setIscomponentMounted] = useState(false)
  const [srcError, setSrcError] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const [indexOfGif, setIndexOfGif] = useState(0)
  const [fetchDeletePost] = useFetching(async (postName, userId) => {
    await serverService
      .deletePost(postName, userId)
      .then((res) => dispatch(deletePost(res.data.success)))
  })
  const postRef = useRef(null)

  useEffect(() => {
    setIscomponentMounted(true)
  }, [])

  function switchGif(step) {
    setIndexOfGif((prevInd) => {
      const nextInd = (prevInd + step) % gifs.length
      return nextInd < 0 ? gifs.length - 1 : nextInd
    })
  }

  const handleDeletePost = () => {
    fetchDeletePost(user.userData.id, _id)
  }

  const handleClickOnTag = (tag) => {
    dispatch(addFilterTag(tag))
  }

  const handleClickOnDeleteTag = (tag) => {
    dispatch(deleteFilterTag(tag))
  }

  //DND
  const [{ handlerId }, dropRef] = useDrop({
    accept: 'post',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!postRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, dragRef] = useDrag({
    type: 'post',
    item: () => {
      return { _id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  dropRef(dragRef(postRef))

  return (
    <Transition timeout={300} nodeRef={postRef} in={isComponentMounted}>
      {(state) => (
        <div
          className={`${styles.post} ${styles[state]}`}
          ref={postRef}
          style={{ border: `${getBorderClass(isDarkModeActive)}` }}
          data-test-id={'posts'}
        >
          <div className={styles.gifContainer}>
            {srcError || !gifs[indexOfGif] ? (
              <RotatingLines />
            ) : (
              <>
                <div className={styles.prevGif}>
                  <CustomButton
                    type={'button'}
                    alignment={'left'}
                    icon={<ArrowLeft width={'30'} height={'30'} />}
                    onClick={() => switchGif(-1)}
                    isScalabale={true}
                  />
                </div>
                <img
                  className={styles.gif}
                  src={gifs[indexOfGif].images.original.url}
                  alt={gifs[indexOfGif].title}
                  onError={() => setSrcError(true)}
                />
                <div className={styles.nextGif}>
                  <CustomButton
                    type={'button'}
                    alignment={'right'}
                    icon={<ArrowRight width={'30'} height={'30'} />}
                    onClick={() => switchGif(1)}
                    isScalabale={true}
                  />
                </div>
              </>
            )}
            <div
              className={styles.controlPanel}
              style={{
                background: `radial-gradient(circle at 50% 50%, ${getBackgroundColorClass(
                  !isDarkModeActive
                )}, transparent 70%)`,
                color: getColorClass(!isDarkModeActive),
              }}
            >
              <div className={styles.deletePost}>
                <CustomButton
                  isScalabale={true}
                  type={'button'}
                  alignment={'right'}
                  icon={<Trash width={'30px'} height={'30px'} />}
                  onClick={handleDeletePost}
                />
              </div>
              <div className={styles.fullScreen}>
                <NavLink
                  className={styles.gifLink}
                  to={`${postPath}/:${_id}`}
                  state={{ postDetail: location }}
                >
                  <CustomButton
                    isScalabale={true}
                    type={'button'}
                    alignment={'right'}
                    icon={<FullScreenButton width={'30px'} height={'30px'} />}
                  />
                </NavLink>
              </div>
            </div>
          </div>
          <div className={styles.postHeader}>
            <h2 className={styles.title}>{title}</h2>
            <FormattedDate date={createdAt} />
          </div>
          <div className={styles.hashtagsContainer}>
            <HashPanel
              hashtags={hashtags}
              id={_id}
              clickOnTag={handleClickOnTag}
              clickOnDeleteTag={handleClickOnDeleteTag}
            />
          </div>
        </div>
      )}
    </Transition>
  )
}

export default Post
