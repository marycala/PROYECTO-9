const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connect to BBDD✅')
  } catch (error) {
    console.log('Not connected to BBDD💥')
  }
}

module.exports = { connectDB }
