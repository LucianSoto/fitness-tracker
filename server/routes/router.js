const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/controller')
// const {}

router.get('/', (req, res) => {
  res.send('router working')
})

router.post('/createUser', userControllers.createUser)

module.exports = router
//NEEDS TO BE "exports" with an s!!!!! for it to work.