const Book = require('../models/book')
const books = require('../../../books.json')

const insertManyBooks = async (req, res, next) => {
  try {
    await Book.insertMany(books)
    return res.status(201).json('All books updated to BBDD')
  } catch (error) {
    console.log(error)
    return res.status(400).json
  }
}

const getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.find()
    return res.status(200).json(allBooks)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { insertManyBooks, getAllBooks }
