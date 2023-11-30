import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostFilter from '../../components/PostList/PostFilter/PostFilter'
import PostList from '../../components/PostList/PostList'
import { NameAZ, NameZA, Newest, Oldest } from '../../constants/sort'
import { useSortedAndSearchedPosts } from '../../hooks/useSortedAndSearchedPosts'
import { selectFilterTags, selectUser } from '../../services/selectors'
import { deleteFilterTag } from '../../services/reducers/filterTags'

const filterSelect = [NameAZ, NameZA, Newest, Oldest]

const Home = () => {
  const user = useSelector(selectUser)
  const filterTags = useSelector(selectFilterTags)
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({
    sort: '',
    query: '',
    filterTags: [],
  })
  const sortedAndSearchedPosts = useSortedAndSearchedPosts(
    filter.sort,
    filter.query,
    filter.filterTags,
    posts
  )

  useEffect(() => {
    setFilter({ ...filter, filterTags: filterTags })
  }, [filterTags])

  useEffect(() => {
    setPosts(user.posts)
  }, [user])

  const handleDeleteFilerTag = (tag) => {
    dispatch(deleteFilterTag(tag))
  }

  return (
    <>
      <PostFilter
        options={filterSelect}
        filter={filter}
        setFilter={setFilter}
        clickOnFilterTag={handleDeleteFilerTag}
      />
      <PostList posts={sortedAndSearchedPosts} />
    </>
  )
}

export default Home
