const express = require('express')
const router = express.Router()
// const userControllers = require('../controllers/controller')
const {createUser, home, updateExercise, signIn} = require('../controllers/controller')

router.get('/', (req, res) => {
  res.send('router working')
})

router.post('/sign_up', createUser)
router.post('/sign_in', signIn)
router.get('/home/:id', home)
router.get('/update_exercise/:id/:exercise', updateExercise)
module.exports = router
//NEEDS TO BE "exports" with an s!!!!! for it to work.