const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const mongoDB = process.env.ATLAS_URI
const PORT = process.env.PORT
console.log(PORT, mongoDB)

const app = express()

app.use(cors())
app.use(express.json())
// app.use()

mongoose.connect(mongoDB)
  .then(() => {console.log('Connected to DB')},
  err => {console.log(err, 'Error connecting to DB')})
  

app.listen(PORT, ()=> console.log('listening on port ', PORT))