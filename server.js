const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const PORT = process.env.PORT || 8080

const loginRoutes = require('./server-routes/login')

const validateToken = (req, res, next) => {
  const token = req.header('token') || ''
  const [username, password] = new Buffer(token, 'base64').toString().split(':')
  if (password.includes('fake')) {
    res.status(400).send('Invalid token')
  } else {
    next()
  }
}

app.use(cors())
app.use(bodyParser.json())
// handle /login routes
app.use('/login', loginRoutes)
// here we validate the token provided by the user
app.use(validateToken)
// sample of protected endpoint only accessible for requests with valid tokens
app.get('/privateInfo', async (req, res, next) => {
  try {
    const { data } = await axios.get('https://randomuser.me/api/')
    res.send(data.results)
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
