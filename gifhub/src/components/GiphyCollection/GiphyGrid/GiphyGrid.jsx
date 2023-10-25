import React, { memo, useEffect, useState } from 'react'
import uniqid from 'uniqid'
import styles from './GiphyGrid.module.css'
import GiphyImage from '../GiphyImage/GiphyImage'
import CustomButton from '../../UI/CustomButton/CustomButton'

const GiphyGrid = memo(
  ({ giphyList }) => {
    const [imagesToUpload, setImagesToUpload] = useState([])

    const addToUploadImages = (image) => {
      setImagesToUpload([...imagesToUpload, image])
    }

    const deleteFromUploadImages = (image) => {
      setImagesToUpload([...imagesToUpload.filter((img) => img !== image)])
    }

    if (!giphyList) return

    return (
      <div className={styles.container}>
        <div className={styles.gridGallery}>
          {giphyList.map((gif) => (
            <GiphyImage
              key={uniqid()}
              gif={gif}
              addToUploadImages={addToUploadImages}
              deleteFromUploadImages={deleteFromUploadImages}
            />
          ))}
        </div>
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.giphyList === nextProps.giphyList ? true : false
)

export default GiphyGrid
