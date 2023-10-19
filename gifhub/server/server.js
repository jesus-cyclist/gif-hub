// const bodyParser = require('body-parser')
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('server/db.json')
// const middlewares = jsonServer.defaults()

// // Добавляем дефолтных посредников (logger, static, cors и no-cache)
// server.use(middlewares)

// // Добавляем кастомные маршруты перед роутером `JSON Server`
// // server.get('/echo', (req, res) => {
// //   console.log('!!!')
// // })

// // Для обработки POST, PUT и PATCH необходимо использовать body-parser
// server.use(bodyParser.json())
// server.use((req, res, next) => {
//   console.log(req)
//   if (req.method === 'POST' && req.url === '/auth/user') {
//     const userLoginData = req.body
//     const users = router.db.__wrapped__.users

//     const isUserValid = users.find(
//       (user) =>
//         user.email === userLoginData.email &&
//         user.password === userLoginData.password
//     )
//     if (isUserValid) {
//       res.json(isUserValid)
//     } else {
//       res.status(404).json({ error: 'Пользователь не найден' })
//     }
//   } else {
//     next()
//   }
// })

// server.use(router)
// server.listen(3001, () => {
//   console.log('JSON Server is running')
// })

const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/qwer', (req, res) => {
  console.log('Received request on /qwer:', req.body)
  res.jsonp(req.body)
})

server.post('/echo', (req, res) => {
  console.log('Received request on /echo:', req.body)
  res.jsonp(req.body)
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
