const express = require('express')
const User = require('../models/user')


exports.createUser = async (req,res) => {
  const {fullname, email, password} = req.body
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