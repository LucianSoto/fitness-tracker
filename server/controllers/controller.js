const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const createUser = async (req,res) => {
  const {user_name, email, password} = req.body

  const isNewUser = await User.isEmailInUse(email)
  if(!isNewUser)
  return res.json({
    success: false,
    message: 'Email already in use',
  })

  const hashPassword = await bcrypt.hash(password, 10, function (err, hash){
      if(err) return err
      else return hash , console.log('hashed~!,', hash)
    })
  
  const user = await User({
    user_name,
    email,
    password,
  })

  await user.save()
  res.json({ success: true, user })
}

const signIn = async (req, res) => {
  const {email, password} = req.body
  // res.send('create endpoint working')


  
  // console.log(queryUser.password, '39 here')
  const isEmail = await User.isEmailInUse(email)
  const isPassword = await User.comparePassword(password, email)

  // if(!isEmail) return res.json({
  //   success: false,
  //   message: "Email does not exist."
  // })

  // if(!isPassword) return res.json({
  //   success: false,
  //   message: "Password does not match."
  // })
  console.log(isEmail, isPassword, 'is or not')

  if(!isEmail && isPassword)
    return res.status(200).json({
      message: "Successfully signed in.",
    })
  // send success and react will reroute.
}

const home = async (req, res) => {
  console.log('rendering home')
  const {name} = req.body

  User.find(name, (err, user) => {
    if(err) {
      res.send(err)
    } else {
      res.status(200).json({
        message: "Found user",
        data: user,
      })
    }
  }) 
}

const updateExercise = async (req, res) => {
  console.log('fetching update exercise')
  const { id } = req.params

  User.findByIdAndUpdate(id,
      {$set: {
        user_name: req.body.user_name,
        exercises: req.body.exercises,
      }},
      {new: true},
      (err, user) => {
        if(err){
          res.status(400).json({error: err})
        } else {
          res.status(200).json({
            message: "Update call success",
            data: user,
          })
        }
      }
    )
}

module.exports = {signIn, home, updateExercise, createUser}