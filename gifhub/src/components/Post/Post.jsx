import React, { memo, useEffect, useState } from 'react'
import styles from './Post.module.css'
import { NavLink, Navigate, useLocation, useParams } from 'react-router-dom'
import { postPath } from '../../constants/path'
import { RotatingLines } from 'react-loader-spinner'
import CustomButton from '../UI/CustomButton/CustomButton'
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrow-left-o.svg'
import { ReactComponent as ArrowRight } from '../../assets/svg/arrow-right-o.svg'
import { ReactComponent as FullScreenButton } from '../../assets/svg/more-o.svg'
import { ReactComponent as Trash } from '../../assets/svg/trash.svg'
import { useFetching } from '../../hooks/useFetching'
import serverService from '../../API/ServerService'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../services/selectors'
import { updatePosts } from '../../services/reducers/user'

const Post = (props) => {
  const [srcError, setSrcError] = useState(false)
  const { postData } = props
  const { gifs, title, _id } = postData
  const location = useLocation()
  const params = useParams()
  const dispatch = useDispatch()
  const [indexOfGif, setIndexOfGif] = useState(0)
  const user = useSelector(selectUser)
  const [fetchingDeleteGif, isLoading, error] = useFetching(
    async (ind, userId, collectionsId) => {
      await serverService
        .deleteGif(ind, userId, collectionsId)
        .then((res) => dispatch(updatePosts(res.data.response)))
        .then((res) => setIndexOfGif(0))
    }
  )

  function switchGif(step) {
    setIndexOfGif((prevInd) => {
      const nextInd = (prevInd + step) % gifs.length
      return nextInd < 0 ? gifs.length - 1 : nextInd
    })
  }

  const handleDeleteGif = () => {
    fetchingDeleteGif(gifs[indexOfGif], user.userId, params.id.slice(1))
  }

  return (
    <div className={styles.post}>
      {gifs && (
        <div className={styles.gifContainer}>
          {srcError || !gifs[indexOfGif] ? (
            <RotatingLines />
          ) : (
            <>
              <div className={styles.prevGif}>
                <CustomButton
                  type={'button'}
                  alignment={'left'}
                  icon={<ArrowLeft width={'50px'} height={'50px'} />}
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
                  icon={<ArrowRight width={'50px'} height={'50px'} />}
                  onClick={() => switchGif(1)}
                  isScalabale={true}
                />
              </div>

              {params.id && (
                <div className={styles.deleteGif}>
                  <CustomButton
                    isScalabale={true}
                    type={'button'}
                    alignment={'right'}
                    icon={<Trash width={'50px'} height={'50px'} />}
                    onClick={handleDeleteGif}
                  />
                </div>
              )}
            </>
          )}
          {!params.id && (
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
                  icon={<FullScreenButton width={'43px'} height={'43px'} />}
                />
              </NavLink>
            </div>
          )}
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}

export default Post
