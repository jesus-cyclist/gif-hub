import React, { createRef, memo, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import uniqid from 'uniqid'
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
      <TransitionGroup className={styles.gridGallery}>
        {giphyList.map((gif) => (
          <CSSTransition
            key={gif.title}
            nodeRef={createRef(null)}
            timeout={500}
            classNames={styles.gif}
          >
            <GiphyImage
              gif={gif}
              addToUploadImages={addToUploadImages}
              deleteFromUploadImages={deleteFromUploadImages}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  },
  (prevProps, nextProps) =>
    prevProps.giphyList === nextProps.giphyList ? true : false
)

export default GiphyGrid
