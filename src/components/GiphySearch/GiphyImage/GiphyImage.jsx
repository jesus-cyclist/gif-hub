import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import serverService from '@api/ServerService'
import { ReactComponent as Check } from '@assets/svg/check.svg'
import { ReactComponent as AddFile } from '@assets/svg/file-add.svg'
import { useFetching } from '@hooks/useFetching'
import { updatePost } from '@services/reducers/user'
import { selectUser } from '@services/selectors'
import CustomButton from '../../UI/CustomButton/CustomButton'
import styles from './GiphyImage.module.css'

const GiphyImage = ({ gif, deleteFromUploadImages, addToUploadImages }) => {
  const [isFileAdd, setIsFileAdd] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isComponentMounted, setIsComponentMOunted] = useState(false)
  const componentRef = useRef(null)

  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    setIsComponentMOunted(true)
  }, [])

  const [fetchGif] = useFetching(async (gif, userId, postId) => {
    await serverService
      .addGif(gif, userId, postId)
      .then((res) => dispatch(updatePost(res.data.response)))
  })

  const confirmGifSelection = () => {
    if (!isConfirm) {
      setIsConfirm(true)
      fetchGif(gif, user.userData.id, params.id.slice(1))
    } else {
      setIsConfirm(false)
      setIsFileAdd(false)
    }
  }

  return (
    <Transition timeout={300} in={isComponentMounted} nodeRef={componentRef}>
      {(state) => (
        <div
          className={`${styles.gifWrapper} ${styles[state]}`}
          ref={componentRef}
        >
          {
            <img
              className={styles.gif}
              src={gif.images.original.url}
              alt={gif.title}
            />
          }

          <div
            className={
              isConfirm
                ? styles.addedElementWrapper
                : styles.confirmButtonWrapper
            }
          >
            <CustomButton
              icon={<Check width={'50%'} height={'50%'} />}
              alignment={'center'}
              onClick={confirmGifSelection}
            />
          </div>
          <div
            className={
              isFileAdd ? styles.hideAddButtonWrapper : styles.addButtonWrapper
            }
          >
            <CustomButton
              icon={<AddFile width={'50%'} height={'50%'} />}
              alignment={'center'}
              onClick={() => setIsFileAdd(true)}
            />
          </div>
        </div>
      )}
    </Transition>
  )
}

export default GiphyImage
