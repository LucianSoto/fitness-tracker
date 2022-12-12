const express = require('express')
const User = require('../models/user')


exports.createUser = async (req,res) => {
  const {user_name, email, password} = req.body
  // await User.findOne({email: req.body.email }, (err, result) => {
  //   if(err) throw err
  //   console.log(result, 'found result')
  // })
  const isNewUser = await User.isEmailInUse(email)
  if(!isNewUser)
  return res.json({
    success: false,
    message: 'Email already in use',
  })

  const user = await User({
    user_name,
    email,
    password,
  })

  await user.save()
  res.json({ success: true, user })
}