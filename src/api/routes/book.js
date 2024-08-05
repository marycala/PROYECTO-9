const { insertManyBooks, getAllBooks } = require('../controllers/book')

const booksRouter = require('express').Router()

booksRouter.post('/scrappin', insertManyBooks)
booksRouter.get('/', getAllBooks)

module.exports = booksRouter
