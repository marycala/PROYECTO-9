require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const booksRouter = require('./src/api/routes/book')

const app = express()
connectDB()

app.use('/api/v1/books', booksRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
