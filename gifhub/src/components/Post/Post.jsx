import React, { useState } from 'react'
import styles from './Post.module.css'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import { postPath } from '../../constants/path'
import { RotatingLines } from 'react-loader-spinner'
import CustomButton from '../UI/CustomButton/CustomButton'
import { ReactComponent as ArrowLeft } from '../../assets/svg/arrow-left-o.svg'
import { ReactComponent as ArrowRight } from '../../assets/svg/arrow-right-o.svg'

const Post = (props) => {
  const { postData } = props
  const { gifs, title, _id } = postData
  const location = useLocation()
  const [indexOfGif, setIndexOfGif] = useState(0)

  const [srcError, setSrcError] = useState(false)

  function switchGif(step) {
    setIndexOfGif((prevInd) => {
      const nextInd = (prevInd + step) % gifs.length
      return nextInd < 0 ? gifs.length - 1 : nextInd
    })
  }

  // console.log(gifs)

  return (
    <div className={styles.post}>
      {gifs && (
        <div className={styles.gifContainer}>
          <div className={styles.prevGif}>
            <CustomButton
              type={'button'}
              alignment={'left'}
              icon={<ArrowLeft width={'50px'} height={'50px'} />}
              onClick={() => switchGif(-1)}
              isScalabale={true}
            />
          </div>
          {srcError || !gifs[indexOfGif] ? (
            <RotatingLines />
          ) : (
            <NavLink
              className={styles.gifLink}
              to={`${postPath}/:${_id}`}
              state={{ postDetail: location }}
            >
              <img
                className={styles.gif}
                src={gifs[indexOfGif].images.original.url}
                alt={gifs[indexOfGif].title}
                onError={() => setSrcError(true)}
              />
            </NavLink>
          )}

          <div className={styles.nextGif}>
            <CustomButton
              type={'button'}
              alignment={'right'}
              icon={<ArrowRight width={'50px'} height={'50px'} />}
              onClick={() => switchGif(1)}
              isScalabale={true}
            />
          </div>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}

export default Post
