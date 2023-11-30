const { v4: uuidv4 } = require('uuid')

const getCurrentDate = () => {
  const currentDate = new Date()
  const formattedDate = currentDate.toISOString()
  return formattedDate
}

const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

//login
server.post('/api/login', (req, res) => {
  const userLoginData = req.body.formObject
  const users = router.db.__wrapped__.users

  const isUserValid = users.find(
    (user) =>
      user.email === userLoginData.email &&
      user.password === userLoginData.password
  )
  if (isUserValid) {
    res.json({ success: true, response: isUserValid })
  } else {
    res.json({
      success: false,
      response: 'The user with this password was not found',
    })
  }
})

//Add GIF
server.post('/api/users/:userId/posts/:postId/gifs', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const requestPostId = req.params.postId.slice(1)
  const requestGif = req.body.gif

  const postIndex = users[userId - 1].posts.findIndex(
    (userPost) => userPost._id === requestPostId
  )

  if (postIndex === -1) {
    return res.jsonp({
      success: 'false',
      response: 'No posts with this id were found',
    })
  }

  const userPost = users[userId - 1].posts.find(
    (userPost) => userPost._id === requestPostId
  ).gifs

  const isGifRepeated = userPost.some(
    (userGif) => userGif.url === requestGif.url
  )

  if (isGifRepeated) {
    return res.jsonp({ success: 'false', response: 'The image repeats' })
  }

  users[userId - 1].posts[postIndex].gifs = [...userPost, requestGif]
  users[userId - 1].posts[postIndex].changedIn = getCurrentDate()

  router.db.setState({ users })

  console.log(users[userId - 1].posts[postIndex])

  res.jsonp({
    success: true,
    response: users[userId - 1].posts[postIndex],
  })
})

//delete GIF
server.patch('/api/users/:userId/posts/:postId/gifs', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const requestPostId = req.params.postId.slice(1)
  const requestGif = req.body.gif
  let modifiedPost = null

  users.forEach((user) => {
    if (user.id === parseInt(userId)) {
      user.posts = user.posts.map((post) => {
        if (post._id === requestPostId) {
          const filtredPost = post.gifs.filter((gif) => {
            return gif.images.original.url !== requestGif.images.original.url
          })

          modifiedPost = {
            ...post,
            gifs: [...filtredPost],
            changedIn: getCurrentDate(),
          }

          return modifiedPost
        }
        return post
      })
    }
  })

  router.db.setState({ users })

  res.jsonp({
    success: true,
    response: modifiedPost,
  })
})

//add hashtag
server.post('/api/users/:userId/posts/:postId/hashtags', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const requestPostId = req.params.postId.slice(1)
  const requestHasttag = req.body.hashtag
  let modifiedPost = null

  users.forEach((user) => {
    if (user.id === parseInt(userId)) {
      user.posts = user.posts.map((post) => {
        if (post._id === requestPostId) {
          modifiedPost = {
            ...post,
            hashtags: [...post.hashtags, requestHasttag],
            changedIn: getCurrentDate(),
          }

          return modifiedPost
        }
        return post
      })
    }
  })

  router.db.setState({ users })

  res.jsonp({
    success: true,
    response: modifiedPost,
  })
})

//delete hashtag
server.patch('/api/users/:userId/posts/:postId/hashtags', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const requestPostId = req.params.postId.slice(1)
  const requestHashtag = req.body.hashtag
  let modifiedPost = null

  users.forEach((user) => {
    if (user.id === parseInt(userId)) {
      user.posts = user.posts.map((post) => {
        if (post._id === requestPostId) {
          const filtredHashtags = post.hashtags.filter(
            (hashtag) => hashtag !== requestHashtag
          )

          modifiedPost = {
            ...post,
            hashtags: [...filtredHashtags],
            changedIn: getCurrentDate(),
          }

          return modifiedPost
        }
        return post
      })
    }
  })

  router.db.setState({ users })

  res.jsonp({
    success: true,
    response: modifiedPost,
  })
})

//delete post
server.get('/api/users/:userId/posts/:postId', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const requestPostId = req.params.postId.slice(1)

  let filtredPosts = null

  users.forEach((user) => {
    if (user.id === parseInt(userId)) {
      filtredPosts = [...user.posts].filter(
        (post) => post._id !== requestPostId
      )
      user.posts = filtredPosts
    }
  })

  router.db.setState({ users })

  res.jsonp({
    success: true,
    response: filtredPosts,
  })
})

//add post
server.post('/api/users/:userId/posts/add', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const requestPostName = req.body.postName
  let newPost = null

  users.forEach((user) => {
    if (user.id === parseInt(userId)) {
      newPost = {
        _id: uuidv4(),
        title: requestPostName,
        changedIn: getCurrentDate(),
        createdAt: getCurrentDate(),
        hashtags: [],
        gifs: [],
      }
      user.posts = [...user.posts, newPost]
    }
  })

  router.db.setState({ users })

  res.jsonp({
    success: true,
    response: newPost,
  })
})

//change User data
server.post('/api/users/:userId/auth', (req, res) => {
  const users = router.db.getState().users
  const userId = req.params.userId.slice(1)
  const { email, password, name } = req.body

  let isUserModifiedSuccesfull = false

  users.forEach((user, index) => {
    if (user.id === parseInt(userId)) {
      users[index] = { ...user, name, email, password }
      isUserModifiedSuccesfull = true
    }
  })

  router.db.setState({ users })

  res.jsonp({
    success: true,
    response: isUserModifiedSuccesfull
      ? 'User data updated'
      : 'Something get wrong',
  })
})

server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
