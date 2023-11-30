import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GiphySearch from '../../components/GiphyCollection/GiphySearch/GiphySearch'
import HashPanel from '../../components/UI/HashPanel/HashPanel'
import FormattedDate from '../../components/UI/FormattedDate/FormattedDate'
import GifSlider from '../../components/UI/GifSlider/GifSlider'
import styles from './PostDetail.module.css'
import { deleteFilterTag } from '../../services/reducers/filterTags'

const PostDetail = () => {
  const params = useParams()
  const { posts } = useSelector((store) => store.rootReducer.user)
  const [post, setPost] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const id = params.id.slice(1)
    const currentPost = posts.find((item) => item._id === id)
    currentPost && setPost(currentPost)
  }, [posts])

  const handleClickOnDeleteTag = (tag) => {
    dispatch(deleteFilterTag(tag))
  }

  return (
    <>
      {post ? (
        <div className={styles.postContainer}>
          <div className={styles.postInfo}>
            <GifSlider post={post} />
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.postChange}>
              <span>
                Created at: <FormattedDate date={post.createdAt} />
              </span>
              <span>
                Changed in: <FormattedDate date={post.changedIn} />
              </span>
            </div>
            <HashPanel
              hashtags={post.hashtags}
              id={post._id}
              clickOnDeleteTag={handleClickOnDeleteTag}
            />
          </div>
          <GiphySearch />
        </div>
      ) : (
        <RotatingLines />
      )}
    </>
  )
}

export default PostDetail
