import React, { memo, useEffect, useState } from 'react'
import styles from './GiphyImage.module.css'
import CustomButton from '../../UI/CustomButton/CustomButton'
import { ReactComponent as Check } from '../../../assets/svg/check.svg'
import { ReactComponent as AddFile } from '../../../assets/svg/file-add.svg'
import { useFetching } from '../../../hooks/useFetching'
import serverService from '../../../API/ServerService'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../services/selectors'
import { useParams } from 'react-router-dom'
import { updatePosts } from '../../../services/reducers/user'

const GiphyImage = ({ gif, deleteFromUploadImages, addToUploadImages }) => {
  const [isFileAdd, setIsFileAdd] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)

  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const [fetchGif, isLoading, error] = useFetching(
    async (gif, userId, collectionId) => {
      await serverService
        .addGIif(gif, user.userId, params.id.slice(1))
        // .then((res) => console.log(res))
        .then((res) => {
          res.data.success
            ? dispatch(updatePosts(res.data.response))
            : console.log(res.data.response)

          console.log(res.data.success, res.data.response)
        })
    }
  )

  const confirmGifSelection = () => {
    if (!isConfirm) {
      setIsConfirm(true)
      fetchGif(gif, user.userId, params.id.slice(1))
    } else {
      setIsConfirm(false)
      setIsFileAdd(false)
    }
  }

  return (
    <div className={styles.gifWrapper}>
      <img
        className={styles.gif}
        src={gif.images.original.url}
        alt={gif.title}
      />

      <div
        className={
          isConfirm ? styles.addedElementWrapper : styles.confirmButtonWrapper
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
  )
}

export default GiphyImage
