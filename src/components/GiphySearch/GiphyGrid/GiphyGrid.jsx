import React, { memo, useState } from 'react'
import GiphyImage from '../GiphyImage/GiphyImage'
import styles from './GiphyGrid.module.css'

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
        {giphyList.map((gif) => (
          <GiphyImage
            key={gif.id}
            gif={gif}
            addToUploadImages={addToUploadImages}
            deleteFromUploadImages={deleteFromUploadImages}
          />
        ))}
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.giphyList === nextProps.giphyList ? true : false
)

export default GiphyGrid
