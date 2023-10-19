import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import PostList from '../../components/PostList/PostList'
import { useSelector } from 'react-redux'

const Home = () => {
  const posts = useSelector((store) => store.rootReducer.user.posts)

  return <>{posts && <PostList posts={posts} />}</>
}

export default Home
