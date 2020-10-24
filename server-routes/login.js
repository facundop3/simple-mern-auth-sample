const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.post('/', (req, res) => {
  const { username = '', password } = req.body
  if (username.includes('fail') || !(username && password)) {
    res.status(400).send('Invalid credentials')
  } else {
    const token = new Buffer(username + ':' + password).toString('base64')
    res.json({ token })
  }
})

module.exports = router
