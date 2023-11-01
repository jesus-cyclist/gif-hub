import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GiphySearch from '../../components/GiphyCollection/GiphySearch/GiphySearch'
import Post from '../../components/Post/Post'
import styles from './PostDetail.module.css'

const PostDetail = () => {
  const params = useParams()
  const { posts } = useSelector((store) => store.rootReducer.user)
  const [post, setPost] = useState(null)

  useEffect(() => {
    const id = params.id.slice(1)
    const currentPost = posts.find((item) => item._id === id)
    currentPost && setPost(currentPost)
  }, [posts])

  useEffect(() => {
    console.log('PostDetail')
  })

  const [giphyCollection, setGiphyCollection] = useState(null)

  return (
    <>
      {post ? (
        <div className={styles.collectionContainer}>
          <div className={styles.postContainer}>
            <Post postData={post} />
          </div>
          <div className={styles.searchContainer}>
            <GiphySearch />
          </div>
        </div>
      ) : (
        <RotatingLines />
      )}
    </>
  )
}

export default PostDetail
