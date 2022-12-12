const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const router = require('./routes/router')
mongoose.set('strictQuery', false) // need this to clear warnings.

const mongoDB = process.env.ATLAS_URI
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

mongoose.connect(mongoDB)
  .then(() => {console.log('Connected to DB')},
  err => {console.log(err, 'Error connecting to DB')})

app.listen(PORT, ()=> console.log('listening on port ', PORT))