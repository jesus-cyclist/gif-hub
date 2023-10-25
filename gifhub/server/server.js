const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/auth/user', (req, res) => {
  const userLoginData = req.body
  const users = router.db.__wrapped__.users

  const isUserValid = users.find(
    (user) =>
      user.email === userLoginData.email &&
      user.password === userLoginData.password
  )
  if (isUserValid) {
    res.json(isUserValid)
  } else {
    res.status(404).json({ error: 'Пользователь не найден' })
  }
})

//Add GIF
server.post(
  '/api/users/:userId/collections/:collectionId/images',
  (req, res) => {
    const users = router.db.getState().users
    const userId = req.params.userId.slice(1)
    const requestCollectionId = req.params.collectionId.slice(1)
    const requestGif = req.body.gif

    const collectionIndex = users[userId - 1].collections.findIndex(
      (userCollection) => userCollection._id === requestCollectionId
    )

    if (collectionIndex === -1) {
      return res.jsonp({
        success: 'false',
        response: 'No collections with this id were found',
      })
    }

    const userCollection = users[userId - 1].collections.find(
      (userCollection) => userCollection._id === requestCollectionId
    ).gifs

    const isGifRepeated = userCollection.some(
      (userGif) => userGif.url === requestGif.url
    )

    if (isGifRepeated) {
      return res.jsonp({ success: 'false', response: 'The image repeats' })
    }

    users[userId - 1].collections[collectionIndex].gifs = Array.from(
      new Set([...userCollection, requestGif])
    )

    router.db.setState({ users })

    res.jsonp({
      success: 'true',
      response: users[userId - 1].collections[collectionIndex],
    })
  }
)

//delete GIF
server.patch(
  '/api/users/:userId/collections/:collectionId/images',
  (req, res) => {
    const users = router.db.getState().users
    const userId = req.params.userId.slice(1)
    const requestCollectionId = req.params.collectionId.slice(1)
    const requestGif = req.body.gif
    let modifiedCollection = null

    users.forEach((user) => {
      if (user.id === parseInt(userId)) {
        user.collections = user.collections.map((collection) => {
          if (collection._id === requestCollectionId) {
            const filtredCollection = collection.gifs.filter((gif) => {
              return gif.images.original.url !== requestGif.images.original.url
            })

            modifiedCollection = {
              ...collection,
              gifs: [...filtredCollection],
            }

            return modifiedCollection
          }
          return collection
        })
      }
    })

    router.db.setState({ users })

    res.jsonp({
      success: 'true',
      response: modifiedCollection,
    })
  }
)

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
