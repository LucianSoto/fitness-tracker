const express = require('express')
const router = express.Router()
// const userControllers = require('../controllers/controller')
const {
  createUser, 
  home, 
  updateExercise, 
  signIn,
  addExercise,
  deleteExercise,
} = require('../controllers/controller')

router.get('/', (req, res) => {
  res.send('router working')
})

router.post('/sign_up', createUser)
router.post('/sign_in', signIn)
router.get('/user/:id', home)
router.post('/edit_exercise/:id', updateExercise)
router.post('/add_exercise/:id', addExercise)
router.post('/delete/:id', deleteExercise)
module.exports = router
//NEEDS TO BE "exports" with an s!!!!! for it to work.