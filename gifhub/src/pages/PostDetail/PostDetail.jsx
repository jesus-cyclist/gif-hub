import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import styles from './PostDetail.module.css'
import { useDispatch, useSelector } from 'react-redux'
import GiphyCollection from '../../components/GiphyCollection/GiphyCollection'
import Post from '../../components/Post/Post'
import GiphySearch from '../../components/GiphyCollection/GiphySearch/GiphySearch'

const PostDetail = () => {
  const params = useParams()
  const { posts } = useSelector((store) => store.rootReducer.user)
  const [post, setPost] = useState(null)

  useEffect(() => {
    const id = params.id.slice(1)
    const currentPost = posts.find((item) => item._id === id)
    currentPost && setPost(currentPost)
  }, [posts])

  const [giphyCollection, setGiphyCollection] = useState(null)

  return (
    <div className={styles.container}>
      {post ? (
        <div className={styles.collectionContainer}>
          <div className={styles.postContainer}>
            <Post postData={post} />
          </div>
          <GiphySearch />
          {giphyCollection && <GiphyCollection />}
        </div>
      ) : (
        <RotatingLines />
      )}
    </div>
  )
}

export default PostDetail
