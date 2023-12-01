import { useMemo } from 'react'
import { NameAZ, NameZA, Newest, Oldest } from '../constants/sort'

export const useFiltredByTags = (tags, posts) => {
  const filtredPosts = useMemo(() => {
    if (!!tags.length) {
      return [...posts].filter((post) =>
        tags.every((tag) => post.hashtags.includes(tag))
      )
    }
    return posts
  }, [tags, posts])
  return filtredPosts
}

export const useSortedPosts = (sort, posts, tags) => {
  const filtredPosts = useFiltredByTags(tags, posts)

  const sortedPosts = useMemo(() => {
    if (sort === NameAZ) {
      return [...filtredPosts].sort((a, b) => a.title.localeCompare(b.title))
    }
    if (sort === NameZA) {
      return [...filtredPosts].sort((a, b) => b.title.localeCompare(a.title))
    }

    if (sort === Oldest) {
      return [...filtredPosts].sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      )
    }

    if (sort === Newest) {
      return [...filtredPosts].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      )
    }

    return filtredPosts
  }, [sort, tags, filtredPosts])

  return sortedPosts
}

export const useSortedAndSearchedPosts = (sort, query, tags, posts) => {
  const sortedPosts = useSortedPosts(sort, posts, tags)

  const useSortedAndSearchedPosts = useMemo(() => {
    return [...sortedPosts].filter((post) => {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.hashtags.some((hashtag) => hashtag.includes(query.toLowerCase()))
      )
    })
  }, [sortedPosts, query])
  return useSortedAndSearchedPosts
}
