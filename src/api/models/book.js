const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    valoration: { type: Number, required: true },
    stock: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'books'
  }
)

const Book = mongoose.model('books', bookSchema, 'books')
module.exports = Book
