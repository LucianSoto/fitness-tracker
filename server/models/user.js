const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const exerciseSchema = require('./exercises')

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }, 
  exercises: [exerciseSchema]
}, {minimize: false})

////////////
  //Tried using arrow functions for the code below only to find that arrow functions change the scope, thus not allowing me to use the this. method perhaps for nodejs stick to regular funcitons.
//////

userSchema.pre('save', function (next) {
  if(this.isModified('password')){
    bcrypt.hash(this.password, 8, (err, hash) => {
      if(err) return next(err)

      this.password = hash
      next() 
    })
  }
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.isEmailInUse = async function (email) {
  if(!email) throw new Error("Invalid Email")
  try {
    const userExists = await this.findOne({ email }, function (err,result) {
      if(err) throw err
    }).clone().catch(function(err){ console.log(err)})
    if(!userExists) return false
    return true
  } catch (err) {
    console.log('Error inside thisEmailInUse method', err)
    return false
  }
}

module.exports = mongoose.model('fitness-users', userSchema)