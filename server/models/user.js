const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
  
})

////////////
  //Tried using arrow functions for the code below only to find that arrow functions change the scope, thus not allowing me to use the this. method perhaps for nodejs stick to regular funcitons.
//////

// userSchema.pre('save', function (next) {
//   if(this.isModified('password')){
//     bcrypt.hash(this.password, 8, (err, hash) => {
//       if(err) return next(err)

//       this.password = hash
//       next() 
//     })
//   }
// })

// userSchema.statics.comparePassword = async function (password, email) {
//   if(!password) throw new Error('Password is missing, cannot compare')

//   const queryUser = await this.findOne({email: email}, function (err, result) {
//     if(err) throw err
//     else return result, console.log(result, 'at queryUser')
//   }).clone().catch(function(err){console.log(err)})

//   console.log(queryUser)
//   try {
//     // console.log(password, queryUser.password, 'password to compare')
//     const result = await bcrypt.compare(password, queryUser.password, function (err, res) {
//       if(res) {
//         return res, console.log(res, 'at pw')
//       } else {
//         return false
//       }
//     })
//   } catch (err) {
//     return err, 'error code'
//   }
// }

userSchema.statics.isEmailInUse = async function (email) {
  if(!email) throw new Error("Invalid Email")
  try {
    const userExists = await this.findOne({ email }, function (err,result) {
      if(err) throw err
      console.log(result, 'email res')
    }).clone().catch(function(err){ console.log(err)})
    if(userExists) return false
    return true
  } catch (err) {
    console.log('Error inside thisEmailInUse method', err)

    return false
  }
}

module.exports = mongoose.model('fitness-users', userSchema)