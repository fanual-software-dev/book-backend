
const express = require('express')
const Router = express.Router()
const { GET_ALL_BOOKS, GET_SINGLE_BOOK, CREATE_A_BOOK, DELETE_A_BOOK, UPDATE_A_BOOK } = require('../api/booksController')

// Get all books route

Router.get('/',GET_ALL_BOOKS)

// Get single book route

Router.get('/:id',GET_SINGLE_BOOK)

// create a book route

Router.post('/',CREATE_A_BOOK)

// update a book route

Router.patch('/:id',UPDATE_A_BOOK)

// delete a book route

Router.delete('/:id',DELETE_A_BOOK)


module.exports = Router

