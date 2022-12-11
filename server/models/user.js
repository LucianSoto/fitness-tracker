const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.model({
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
  }
})


userSchema.pre('save', (next)=> {
  if(this.isModified('password')){
    bcrypt.hash(this.password, 8, (err, hash) => {
      if(err) return next(err)

      this.password = hash
      next() 
    })
  }
})

const user = User.findOne({email})
user.comparePassword()

userSchema.methods.comparePassword = async (password) => {
  if(!password) throw new Error('Password is missing, cannot compare')
  try {
    const result = await bcrypt.compare(password, this.password)
    return result
  } catch (err) {
    console.log(err.message, 'error')
  }
}

userSchema.statics.isEmailInUse = async (email) => {
  if(!email) throw new Error("Invalid Email")
  try {
    const user = await this.findOne({ email })
    if(user) return false

    return true
  } catch (err) {
    console.log('Error inside thisEmailInUse method', err.message)

    return false
  }
}

module.export = mongoose.schema('Users', userSchema)